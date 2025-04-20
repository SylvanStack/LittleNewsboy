import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { message, Spin, Card, Tag, Input, Select, Button, Tooltip, Row, Col, Empty, Pagination, Checkbox, Badge, Dropdown, Menu } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined, EllipsisOutlined, StarFilled, StarOutlined, InboxOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { summaryAPI } from '../../services/api';
import { Summary, SummariesPage } from '../../types/summary';
import SummaryCard from './SummaryCard';
import GenerateSummaryModal from './GenerateSummaryModal';

const { Option } = Select;
const { Search } = Input;

const KnowledgeSummary: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [showOnlyImportant, setShowOnlyImportant] = useState<boolean>(false);
  const [generateModalVisible, setGenerateModalVisible] = useState<boolean>(false);
  
  // 获取摘要列表
  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const response = await summaryAPI.getSummaries({
        page: pagination.current,
        page_size: pagination.pageSize,
        sort_field: sortField,
        sort_order: sortOrder,
        search: search || undefined,
        tag: selectedTag || undefined,
        is_archived: showArchived ? true : undefined,
        is_important: showOnlyImportant ? true : undefined,
      });
      
      const data = response.data as SummariesPage;
      setSummaries(data.items);
      setPagination({
        ...pagination,
        total: data.total,
      });
    } catch (error) {
      console.error('获取摘要列表失败:', error);
      message.error('获取摘要列表失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  
  // 监听筛选条件变化，获取数据
  useEffect(() => {
    fetchSummaries();
  }, [pagination.current, pagination.pageSize, sortField, sortOrder, search, selectedTag, showArchived, showOnlyImportant]);
  
  // 处理页码变化
  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize || pagination.pageSize,
    });
  };
  
  // 处理标签选择
  const handleTagSelect = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setPagination({ ...pagination, current: 1 });
  };
  
  // 处理摘要归档切换
  const handleToggleArchive = async (summaryId: string) => {
    try {
      await summaryAPI.toggleArchive(summaryId);
      message.success('操作成功');
      fetchSummaries();
    } catch (error) {
      console.error('更新摘要归档状态失败:', error);
      message.error('更新摘要归档状态失败，请稍后重试');
    }
  };
  
  // 处理摘要重要标记切换
  const handleToggleImportant = async (summaryId: string) => {
    try {
      await summaryAPI.toggleImportant(summaryId);
      message.success('操作成功');
      fetchSummaries();
    } catch (error) {
      console.error('更新摘要重要标记失败:', error);
      message.error('更新摘要重要标记失败，请稍后重试');
    }
  };
  
  // 处理删除摘要
  const handleDeleteSummary = async (summaryId: string) => {
    try {
      await summaryAPI.deleteSummary(summaryId);
      message.success('删除成功');
      fetchSummaries();
    } catch (error) {
      console.error('删除摘要失败:', error);
      message.error('删除摘要失败，请稍后重试');
    }
  };
  
  // 处理搜索
  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination({ ...pagination, current: 1 });
  };
  
  // 处理排序变化
  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setPagination({ ...pagination, current: 1 });
  };
  
  // 生成摘要成功后的回调
  const handleGenerateSuccess = () => {
    setGenerateModalVisible(false);
    message.success('摘要生成任务已提交，处理完成后将显示在列表中');
    fetchSummaries();
  };
  
  // 获取所有标签
  const getAllTags = () => {
    const tags = new Set<string>();
    summaries.forEach(summary => {
      summary.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };
  
  // 渲染筛选工具栏
  const renderToolbar = () => (
    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Search 
          placeholder="搜索摘要..." 
          onSearch={handleSearch} 
          style={{ width: 200 }} 
          allowClear
        />
        
        <Select
          placeholder="排序方式"
          style={{ width: 120 }}
          value={`${sortField}-${sortOrder}`}
          onChange={(value) => {
            const [field, order] = value.split('-');
            setSortField(field);
            setSortOrder(order as 'asc' | 'desc');
            setPagination({ ...pagination, current: 1 });
          }}
        >
          <Option value="created_at-desc">最新创建</Option>
          <Option value="created_at-asc">最早创建</Option>
          <Option value="updated_at-desc">最近更新</Option>
          <Option value="title-asc">标题升序</Option>
          <Option value="title-desc">标题降序</Option>
        </Select>
        
        <Checkbox 
          checked={showOnlyImportant} 
          onChange={(e) => {
            setShowOnlyImportant(e.target.checked);
            setPagination({ ...pagination, current: 1 });
          }}
        >
          只看重要
        </Checkbox>
        
        <Checkbox 
          checked={showArchived} 
          onChange={(e) => {
            setShowArchived(e.target.checked);
            setPagination({ ...pagination, current: 1 });
          }}
        >
          显示已归档
        </Checkbox>
        
        {selectedTag && (
          <Tag 
            color="blue" 
            closable 
            onClose={() => setSelectedTag(null)}
          >
            标签: {selectedTag}
          </Tag>
        )}
      </div>
      
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => setGenerateModalVisible(true)}
      >
        生成摘要
      </Button>
    </div>
  );
  
  // 渲染标签过滤器
  const renderTagFilters = () => {
    const allTags = getAllTags();
    if (allTags.length === 0) return null;
    
    return (
      <div className="mb-4">
        <div className="text-gray-500 mb-1 text-sm">标签筛选:</div>
        <div className="flex flex-wrap gap-1">
          {allTags.map(tag => (
            <Tag
              key={tag}
              color={selectedTag === tag ? 'blue' : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">知识摘要</h1>
        <p className="text-gray-500">查看、生成和管理各种信息源的内容摘要</p>
      </div>
      
      {renderToolbar()}
      {renderTagFilters()}
      
      <Spin spinning={loading}>
        {summaries.length > 0 ? (
          <div>
            <Row gutter={[16, 16]}>
              {summaries.map(summary => (
                <Col xs={24} sm={12} lg={8} xl={6} key={summary.id}>
                  <SummaryCard 
                    summary={summary}
                    onToggleArchive={handleToggleArchive}
                    onToggleImportant={handleToggleImportant}
                    onDelete={handleDeleteSummary}
                  />
                </Col>
              ))}
            </Row>
            
            <div className="mt-4 text-center">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条摘要`}
              />
            </div>
          </div>
        ) : (
          <Empty 
            description={
              <span>
                {search || selectedTag || showArchived || showOnlyImportant 
                  ? "没有符合条件的摘要" 
                  : "还没有创建任何摘要"}
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button 
              type="primary" 
              icon={<PlusCircleOutlined />} 
              onClick={() => setGenerateModalVisible(true)}
            >
              生成首个摘要
            </Button>
          </Empty>
        )}
      </Spin>
      
      <GenerateSummaryModal
        visible={generateModalVisible}
        onCancel={() => setGenerateModalVisible(false)}
        onSuccess={handleGenerateSuccess}
      />
    </div>
  );
};

export default KnowledgeSummary; 