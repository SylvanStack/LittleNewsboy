import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, Button, message, Spin, Tag, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { summaryAPI, sourceAPI } from '../../services/api';
import { ISource } from '../../types/source';
import { SummaryTemplate, SummaryParameters } from '../../types/summary';

const { Option } = Select;
const { TextArea } = Input;

interface GenerateSummaryModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const GenerateSummaryModal: React.FC<GenerateSummaryModalProps> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [sources, setSources] = useState<ISource[]>([]);
  const [templates, setTemplates] = useState<SummaryTemplate[]>([]);
  const [loadingSources, setLoadingSources] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<SummaryTemplate | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // 加载信息源
  useEffect(() => {
    if (visible) {
      fetchSources();
      fetchTemplates();
    }
  }, [visible]);
  
  // 当选择模板时，更新表单参数
  useEffect(() => {
    if (selectedTemplate) {
      // 填充模板默认参数
      form.setFieldsValue({
        parameters: {
          max_length: selectedTemplate.parameters.max_length || 2000,
          focus_points: selectedTemplate.parameters.focus_points || [],
          format: selectedTemplate.parameters.format || 'markdown',
        },
        tags: selectedTemplate.parameters.tags || []
      });
      
      // 更新标签
      setTags(selectedTemplate.parameters.tags || []);
    }
  }, [selectedTemplate, form]);
  
  // 获取所有信息源
  const fetchSources = async () => {
    setLoadingSources(true);
    try {
      const response = await sourceAPI.getSources();
      setSources(response.data.items);
    } catch (error) {
      console.error('获取信息源失败:', error);
      message.error('获取信息源失败，请稍后重试');
    } finally {
      setLoadingSources(false);
    }
  };
  
  // 获取摘要模板
  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const response = await summaryAPI.getTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error('获取摘要模板失败:', error);
      message.error('获取摘要模板失败，请稍后重试');
    } finally {
      setLoadingTemplates(false);
    }
  };
  
  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      
      // 准备请求数据
      const requestData = {
        source_ids: values.source_ids,
        template_id: values.template_id,
        parameters: {
          ...values.parameters,
          tags: tags
        }
      };
      
      await summaryAPI.generateSummary(requestData);
      message.success('摘要生成任务已提交');
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('生成摘要失败:', error);
      message.error('生成摘要失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };
  
  // 处理模板选择变化
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
  };
  
  // 处理标签相关函数
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  
  return (
    <Modal
      title="生成知识摘要"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={submitting}
          onClick={handleSubmit}
          disabled={loadingSources || loadingTemplates}
        >
          开始生成
        </Button>
      ]}
      width={700}
    >
      <Spin spinning={loadingSources || loadingTemplates}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            parameters: {
              max_length: 2000,
              format: 'markdown'
            }
          }}
        >
          <Form.Item
            name="source_ids"
            label="选择信息源"
            rules={[{ required: true, message: '请选择至少一个信息源' }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择要生成摘要的信息源"
              optionFilterProp="children"
              loading={loadingSources}
              disabled={loadingSources}
            >
              {sources.map(source => (
                <Option key={source.id} value={source.id}>
                  {source.name} ({source.url})
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="template_id"
            label="摘要模板"
          >
            <Select
              placeholder="选择摘要模板（可选）"
              allowClear
              loading={loadingTemplates}
              disabled={loadingTemplates}
              onChange={handleTemplateChange}
            >
              {templates.map(template => (
                <Option key={template.id} value={template.id}>
                  {template.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Divider orientation="left">摘要参数</Divider>
          
          <Form.Item
            label="最大长度"
            name={['parameters', 'max_length']}
            rules={[{ required: true, message: '请输入摘要最大长度' }]}
          >
            <Input type="number" min={100} max={5000} />
          </Form.Item>
          
          <Form.Item
            label="关注点"
            name={['parameters', 'focus_points']}
          >
            <Select mode="tags" placeholder="输入关注点（可选）">
              <Option value="技术细节">技术细节</Option>
              <Option value="商业价值">商业价值</Option>
              <Option value="用户体验">用户体验</Option>
              <Option value="市场趋势">市场趋势</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="输出格式"
            name={['parameters', 'format']}
            rules={[{ required: true, message: '请选择输出格式' }]}
          >
            <Select placeholder="选择摘要输出格式">
              <Option value="markdown">Markdown</Option>
              <Option value="text">纯文本</Option>
              <Option value="html">HTML</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="标签">
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map(tag => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleClose(tag)}
                >
                  {tag}
                </Tag>
              ))}
              {inputVisible ? (
                <Input
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                  autoFocus
                />
              ) : (
                <Tag onClick={showInput} style={{ cursor: 'pointer' }}>
                  <PlusOutlined /> 添加标签
                </Tag>
              )}
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default GenerateSummaryModal; 