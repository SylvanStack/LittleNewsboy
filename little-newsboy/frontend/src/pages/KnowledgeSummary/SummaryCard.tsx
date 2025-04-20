import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag, Typography, Dropdown, Menu, Space } from 'antd';
import { EllipsisOutlined, StarFilled, StarOutlined, InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import { Summary } from '../../types/summary';
import { SourceType, SourceTypeLabels } from '../../types/source';

const { Title, Text, Paragraph } = Typography;

interface SummaryCardProps {
  summary: Summary;
  onToggleArchive: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onDelete: (id: string) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  summary, 
  onToggleArchive, 
  onToggleImportant, 
  onDelete 
}) => {
  // 计算摘要创建日期的友好显示
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 构建下拉菜单
  const menu = (
    <Menu>
      <Menu.Item 
        key="toggle-archive" 
        icon={<InboxOutlined />}
        onClick={() => onToggleArchive(summary.id)}
      >
        {summary.is_archived ? '取消归档' : '归档'}
      </Menu.Item>
      <Menu.Item 
        key="toggle-important" 
        icon={summary.is_important ? <StarFilled /> : <StarOutlined />}
        onClick={() => onToggleImportant(summary.id)}
      >
        {summary.is_important ? '取消重要标记' : '标记为重要'}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item 
        key="delete" 
        icon={<DeleteOutlined />} 
        danger
        onClick={() => {
          if (window.confirm('确定要删除这个摘要吗？此操作不可恢复。')) {
            onDelete(summary.id);
          }
        }}
      >
        删除
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Card
      className={`h-full ${summary.is_archived ? 'bg-gray-50' : ''}`}
      actions={[
        summary.is_important ? 
          <StarFilled key="important" className="text-yellow-500" onClick={() => onToggleImportant(summary.id)} /> : 
          <StarOutlined key="not-important" onClick={() => onToggleImportant(summary.id)} />,
        <Dropdown key="more" overlay={menu} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      ]}
    >
      <Link to={`/knowledge-summary/${summary.id}`} className="no-underline text-inherit">
        <Title level={5} ellipsis={{ rows: 2 }} className="mb-2">
          {summary.is_archived && <InboxOutlined className="mr-1 text-gray-400" />}
          {summary.title}
        </Title>
        
        <Paragraph ellipsis={{ rows: 3 }} className="text-gray-600 mb-3">
          {summary.content}
        </Paragraph>
        
        <div className="mb-2">
          {summary.sources.slice(0, 2).map(source => (
            <Tag key={source.id} color="blue">
              {SourceTypeLabels[source.type as SourceType]}: {source.name}
            </Tag>
          ))}
          {summary.sources.length > 2 && (
            <Tag>+{summary.sources.length - 2}</Tag>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {summary.tags.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {summary.tags.length > 3 && (
            <Tag>+{summary.tags.length - 3}</Tag>
          )}
        </div>
        
        <Text type="secondary" className="text-xs">
          创建于 {getFormattedDate(summary.created_at)}
        </Text>
      </Link>
    </Card>
  );
};

export default SummaryCard; 