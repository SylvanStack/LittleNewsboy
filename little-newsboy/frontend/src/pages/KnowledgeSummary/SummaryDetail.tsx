import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, Tag, Button, Spin, Row, Col, List, Divider, message, Tooltip, Modal, Input } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  StarOutlined, 
  StarFilled,
  InboxOutlined,
  ShareAltOutlined,
  TagsOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { summaryAPI } from '../../services/api';
import { Summary } from '../../types/summary';
import { SourceType, SourceTypeLabels } from '../../types/source';
import ReactMarkdown from 'react-markdown';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface SummaryDetailProps {
  summaryId: string;
}

const SummaryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedKeyPoints, setEditedKeyPoints] = useState<string[]>([]);
  const [editingTag, setEditingTag] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  // 获取摘要详情
  useEffect(() => {
    fetchSummaryDetail();
  }, [id]);
  
  const fetchSummaryDetail = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await summaryAPI.getSummary(id);
      setSummary(response.data);
      setTags(response.data.tags || []);
      setEditedTitle(response.data.title);
      setEditedContent(response.data.content);
      setEditedKeyPoints(response.data.key_points || []);
    } catch (error) {
      console.error('获取摘要详情失败:', error);
      message.error('获取摘要详情失败，请稍后重试');
      navigate('/knowledge-summary');
    } finally {
      setLoading(false);
    }
  };
  
  // 处理返回
  const handleBack = () => {
    navigate('/knowledge-summary');
  };
  
  // 切换编辑模式
  const toggleEditMode = () => {
    if (editMode) {
      // 退出编辑模式，重置为原始数据
      setEditedTitle(summary?.title || '');
      setEditedContent(summary?.content || '');
      setEditedKeyPoints(summary?.key_points || []);
      setTags(summary?.tags || []);
    }
    setEditMode(!editMode);
  };
  
  // 保存编辑
  const saveEdit = async () => {
    if (!summary) return;
    
    try {
      await summaryAPI.updateSummary(summary.id, {
        title: editedTitle,
        content: editedContent,
        key_points: editedKeyPoints,
        tags: tags
      });
      
      message.success('更新成功');
      setEditMode(false);
      fetchSummaryDetail();
    } catch (error) {
      console.error('更新摘要失败:', error);
      message.error('更新摘要失败，请稍后重试');
    }
  };
  
  // 删除摘要
  const handleDelete = async () => {
    if (!summary) return;
    
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个摘要吗？此操作不可恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await summaryAPI.deleteSummary(summary.id);
          message.success('删除成功');
          navigate('/knowledge-summary');
        } catch (error) {
          console.error('删除摘要失败:', error);
          message.error('删除摘要失败，请稍后重试');
        }
      }
    });
  };
  
  // 切换摘要归档状态
  const handleToggleArchive = async () => {
    if (!summary) return;
    
    try {
      await summaryAPI.toggleArchive(summary.id);
      message.success(summary.is_archived ? '已取消归档' : '已归档');
      fetchSummaryDetail();
    } catch (error) {
      console.error('更新摘要归档状态失败:', error);
      message.error('更新摘要归档状态失败，请稍后重试');
    }
  };
  
  // 切换摘要重要标记
  const handleToggleImportant = async () => {
    if (!summary) return;
    
    try {
      await summaryAPI.toggleImportant(summary.id);
      message.success(summary.is_important ? '已取消重要标记' : '已标记为重要');
      fetchSummaryDetail();
    } catch (error) {
      console.error('更新摘要重要标记失败:', error);
      message.error('更新摘要重要标记失败，请稍后重试');
    }
  };
  
  // 复制链接
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => message.success('链接已复制到剪贴板'))
      .catch(() => message.error('复制失败，请手动复制'));
  };
  
  // 添加标签
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const newTags = [...tags, newTag];
      setTags(newTags);
      setNewTag('');
      setEditingTag(false);
    }
  };
  
  // 删除标签
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }
  
  if (!summary) {
    return (
      <div className="text-center py-8">
        <Title level={4}>摘要不存在或已被删除</Title>
        <Button type="primary" onClick={handleBack}>返回列表</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
        >
          返回列表
        </Button>
        
        <div className="flex gap-2">
          <Tooltip title={summary.is_important ? '取消重要标记' : '标记为重要'}>
            <Button 
              icon={summary.is_important ? <StarFilled className="text-yellow-400" /> : <StarOutlined />} 
              onClick={handleToggleImportant}
            />
          </Tooltip>
          
          <Tooltip title={summary.is_archived ? '取消归档' : '归档'}>
            <Button 
              icon={<InboxOutlined />} 
              onClick={handleToggleArchive}
            />
          </Tooltip>
          
          <Tooltip title="分享链接">
            <Button 
              icon={<ShareAltOutlined />} 
              onClick={handleCopyLink}
            />
          </Tooltip>
          
          {editMode ? (
            <>
              <Button onClick={toggleEditMode}>取消</Button>
              <Button type="primary" onClick={saveEdit}>保存</Button>
            </>
          ) : (
            <>
              <Button 
                icon={<EditOutlined />} 
                onClick={toggleEditMode}
              >
                编辑
              </Button>
              
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                onClick={handleDelete}
              >
                删除
              </Button>
            </>
          )}
        </div>
      </div>
      
      <Card className="mb-4">
        {editMode ? (
          <Input
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            className="mb-4 text-xl font-bold"
            placeholder="摘要标题"
          />
        ) : (
          <Title level={3} className="mb-4">
            {summary.is_archived && <InboxOutlined className="mr-2 text-gray-400" />}
            {summary.is_important && <StarFilled className="mr-2 text-yellow-400" />}
            {summary.title}
          </Title>
        )}
        
        <div className="mb-4">
          <Text type="secondary">创建于 {formatDate(summary.created_at)}</Text>
          {summary.created_at !== summary.updated_at && (
            <Text type="secondary" className="ml-4">更新于 {formatDate(summary.updated_at)}</Text>
          )}
        </div>
        
        <div className="mb-4 flex flex-wrap gap-1">
          {editMode ? (
            <>
              {tags.map(tag => (
                <Tag 
                  key={tag} 
                  closable 
                  onClose={() => handleRemoveTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
              {editingTag ? (
                <Input
                  type="text"
                  size="small"
                  style={{ width: 100 }}
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onBlur={handleAddTag}
                  onPressEnter={handleAddTag}
                  autoFocus
                />
              ) : (
                <Tag 
                  onClick={() => setEditingTag(true)} 
                  style={{ cursor: 'pointer' }}
                >
                  <TagsOutlined /> 添加标签
                </Tag>
              )}
            </>
          ) : (
            <>
              {summary.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </>
          )}
        </div>
        
        <Divider orientation="left">信息源</Divider>
        <div className="mb-4">
          {summary.sources.length > 0 ? (
            <List
              size="small"
              dataSource={summary.sources}
              renderItem={source => (
                <List.Item>
                  <div className="flex items-center">
                    <Tag color="blue">{SourceTypeLabels[source.type as SourceType]}</Tag>
                    <span className="mr-2">{source.name}</span>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 flex items-center"
                    >
                      <LinkOutlined className="mr-1" />
                      原文链接
                    </a>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Text type="secondary">无关联信息源</Text>
          )}
        </div>
        
        <Divider orientation="left">摘要内容</Divider>
        {editMode ? (
          <TextArea
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
            rows={10}
            className="mb-4"
            placeholder="摘要内容"
          />
        ) : (
          <div className="mb-4 prose max-w-none">
            <ReactMarkdown>{summary.content}</ReactMarkdown>
          </div>
        )}
        
        <Divider orientation="left">关键要点</Divider>
        {editMode ? (
          <div className="mb-4">
            {editedKeyPoints.map((point, index) => (
              <div key={index} className="mb-2 flex items-center">
                <Input
                  value={point}
                  onChange={e => {
                    const newPoints = [...editedKeyPoints];
                    newPoints[index] = e.target.value;
                    setEditedKeyPoints(newPoints);
                  }}
                  placeholder={`要点 ${index + 1}`}
                  className="mr-2"
                />
                <Button 
                  danger 
                  size="small" 
                  onClick={() => {
                    const newPoints = editedKeyPoints.filter((_, i) => i !== index);
                    setEditedKeyPoints(newPoints);
                  }}
                >
                  删除
                </Button>
              </div>
            ))}
            <Button 
              type="dashed" 
              onClick={() => setEditedKeyPoints([...editedKeyPoints, ''])}
              className="w-full"
            >
              添加要点
            </Button>
          </div>
        ) : (
          <List
            dataSource={summary.key_points}
            renderItem={(point, index) => (
              <List.Item>
                <Text mark>{index + 1}.</Text> {point}
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default SummaryDetail; 