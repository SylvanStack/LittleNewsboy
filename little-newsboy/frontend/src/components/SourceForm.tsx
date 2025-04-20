import React from 'react';
import { Form, Input, Select, Button, Space, Card, message } from 'antd';
import { GlobalOutlined, FilterOutlined, KeyOutlined } from '@ant-design/icons';
import { SourceType, UpdateFrequency, Priority, Status, ISourceCreate, ISourceUpdate } from '../types/source';

const { Option } = Select;
const { TextArea } = Input;

interface SourceFormProps {
  initialValues?: ISourceCreate | ISourceUpdate;
  onSubmit: (values: ISourceCreate | ISourceUpdate) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

const SourceForm: React.FC<SourceFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
  isEdit = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: ISourceCreate | ISourceUpdate) => {
    try {
      await onSubmit(values);
      message.success(isEdit ? '信息源更新成功！' : '信息源添加成功！');
      form.resetFields();
    } catch (error) {
      message.error('操作失败，请稍后重试。');
      console.error(error);
    }
  };

  return (
    <Card title={isEdit ? '编辑信息源' : '添加信息源'} bordered={false}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入信息源名称' }]}
        >
          <Input placeholder="请输入信息源名称" />
        </Form.Item>

        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: '请选择信息源类型' }]}
        >
          <Select placeholder="请选择信息源类型">
            <Option value={SourceType.WEBSITE}>网站</Option>
            <Option value={SourceType.RSS}>RSS</Option>
            <Option value={SourceType.API}>API</Option>
            <Option value={SourceType.SOCIAL_MEDIA}>社交媒体</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="url"
          label="URL"
          rules={[
            { required: true, message: '请输入信息源URL' },
            { type: 'url', message: '请输入有效的URL地址' }
          ]}
        >
          <Input 
            prefix={<GlobalOutlined />} 
            placeholder="https://example.com" 
          />
        </Form.Item>

        <Form.Item
          name="update_frequency"
          label="更新频率"
          rules={[{ required: true, message: '请选择更新频率' }]}
        >
          <Select placeholder="请选择更新频率">
            <Option value={UpdateFrequency.REALTIME}>实时</Option>
            <Option value={UpdateFrequency.HOURLY}>每小时</Option>
            <Option value={UpdateFrequency.DAILY}>每天</Option>
            <Option value={UpdateFrequency.WEEKLY}>每周</Option>
            <Option value={UpdateFrequency.MONTHLY}>每月</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label="优先级"
          rules={[{ required: true, message: '请选择优先级' }]}
        >
          <Select placeholder="请选择优先级">
            <Option value={Priority.HIGH}>高</Option>
            <Option value={Priority.MEDIUM}>中</Option>
            <Option value={Priority.LOW}>低</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择状态' }]}
        >
          <Select placeholder="请选择状态">
            <Option value={Status.ACTIVE}>活跃</Option>
            <Option value={Status.INACTIVE}>不活跃</Option>
            <Option value={Status.ERROR}>错误</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="filters"
          label="过滤条件"
        >
          <TextArea 
            rows={4} 
            placeholder="请输入过滤条件（JSON格式）" 
            prefix={<FilterOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="credentials"
          label="凭证信息"
        >
          <TextArea 
            rows={4} 
            placeholder="请输入凭证信息（JSON格式）" 
            prefix={<KeyOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? '更新' : '添加'}
            </Button>
            <Button onClick={onCancel}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SourceForm; 