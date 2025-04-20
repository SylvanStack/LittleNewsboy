import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Input, Select, Tag, Modal, Form, message, Popconfirm } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { sourceAPI } from '../../services/api';

const { Option } = Select;

interface Source {
  id: string;
  name: string;
  type: string;
  url: string;
  update_frequency: string;
  priority: string;
  status: string;
  filters?: Record<string, any>;
  credentials?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

const SourceTypeMap = {
  github: 'Github',
  arxiv: 'Arxiv',
  blog: '博客',
  community: '社区',
  news: '新闻',
};

const UpdateFrequencyMap = {
  realtime: '实时',
  daily: '每天',
  weekly: '每周',
};

const PriorityMap = {
  high: '高',
  medium: '中',
  low: '低',
};

const StatusMap = {
  active: '活跃',
  paused: '暂停',
};

const SourceManagement: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editingSource, setEditingSource] = useState<Source | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    search: '',
    type: undefined,
    status: undefined,
  });

  const fetchSources = async () => {
    setLoading(true);
    try {
      const { current, pageSize } = pagination;
      const { search, type, status } = filters;
      
      const params: Record<string, any> = {
        skip: (current - 1) * pageSize,
        limit: pageSize,
      };
      
      if (search) params.search = search;
      if (type) params.source_type = type;
      if (status) params.status = status;
      
      const response = await sourceAPI.getSources(params);
      
      setSources(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('获取信息源失败:', error);
      message.error('获取信息源失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, [pagination.current, pagination.pageSize, filters]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleSearch = (value: string) => {
    setPagination({ ...pagination, current: 1 });
    setFilters({ ...filters, search: value });
  };

  const handleTypeFilter = (value: string | undefined) => {
    setPagination({ ...pagination, current: 1 });
    setFilters({ ...filters, type: value });
  };

  const handleStatusFilter = (value: string | undefined) => {
    setPagination({ ...pagination, current: 1 });
    setFilters({ ...filters, status: value });
  };

  const handleAdd = () => {
    setEditingSource(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record: Source) => {
    setEditingSource(record);
    form.setFieldsValue({
      name: record.name,
      type: record.type,
      url: record.url,
      update_frequency: record.update_frequency,
      priority: record.priority,
      status: record.status,
      filters: record.filters ? JSON.stringify(record.filters) : undefined,
      credentials: record.credentials ? JSON.stringify(record.credentials) : undefined,
    });
    setVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await sourceAPI.deleteSource(id);
      message.success('信息源删除成功');
      fetchSources();
    } catch (error) {
      console.error('删除信息源失败:', error);
      message.error('删除信息源失败');
    }
  };

  const handleRefreshSource = async (id: string) => {
    try {
      await sourceAPI.refreshSource(id);
      message.success('信息源刷新请求已发送');
    } catch (error) {
      console.error('刷新信息源失败:', error);
      message.error('刷新信息源失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // 处理JSON字符串转换
      if (values.filters) {
        try {
          values.filters = JSON.parse(values.filters);
        } catch (e) {
          message.error('过滤器格式无效');
          return;
        }
      }
      
      if (values.credentials) {
        try {
          values.credentials = JSON.parse(values.credentials);
        } catch (e) {
          message.error('凭证格式无效');
          return;
        }
      }
      
      if (editingSource) {
        // 更新
        await sourceAPI.updateSource(editingSource.id, values);
        message.success('信息源更新成功');
      } else {
        // 创建
        await sourceAPI.createSource(values);
        message.success('信息源创建成功');
      }
      
      setVisible(false);
      fetchSources();
    } catch (error) {
      console.error('保存信息源失败:', error);
      message.error('保存信息源失败');
    }
  };

  const getStatusTag = (status: string) => {
    const colorMap: Record<string, string> = {
      active: 'green',
      paused: 'orange',
    };
    
    return (
      <Tag color={colorMap[status] || 'default'}>
        {StatusMap[status as keyof typeof StatusMap] || status}
      </Tag>
    );
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => SourceTypeMap[text as keyof typeof SourceTypeMap] || text,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: '更新频率',
      dataIndex: 'update_frequency',
      key: 'update_frequency',
      render: (text: string) => UpdateFrequencyMap[text as keyof typeof UpdateFrequencyMap] || text,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => PriorityMap[text as keyof typeof PriorityMap] || text,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => getStatusTag(text),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Source) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={() => handleRefreshSource(record.id)}
            title="刷新信息源"
          />
          <Popconfirm
            title="确定要删除这个信息源吗?"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>信息源管理</div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
        >
          添加信息源
        </Button>
      </div>
      
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
          <Input 
            placeholder="搜索信息源" 
            prefix={<SearchOutlined />} 
            style={{ width: 200 }}
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select
            placeholder="信息源类型"
            style={{ width: 120 }}
            allowClear
            value={filters.type}
            onChange={handleTypeFilter}
          >
            {Object.entries(SourceTypeMap).map(([key, value]) => (
              <Option key={key} value={key}>{value}</Option>
            ))}
          </Select>
          <Select
            placeholder="状态"
            style={{ width: 120 }}
            allowClear
            value={filters.status}
            onChange={handleStatusFilter}
          >
            {Object.entries(StatusMap).map(([key, value]) => (
              <Option key={key} value={key}>{value}</Option>
            ))}
          </Select>
        </div>
        
        <Table
          columns={columns}
          dataSource={sources}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 个信息源`,
          }}
          onChange={handleTableChange}
        />
      </Card>
      
      <Modal
        title={editingSource ? '编辑信息源' : '添加信息源'}
        open={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
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
              {Object.entries(SourceTypeMap).map(([key, value]) => (
                <Option key={key} value={key}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="url"
            label="URL"
            rules={[
              { required: true, message: '请输入URL' },
              { 
                pattern: /^(https?:\/\/)/, 
                message: 'URL必须以http://或https://开头' 
              }
            ]}
          >
            <Input placeholder="请输入URL" />
          </Form.Item>
          
          <Form.Item
            name="update_frequency"
            label="更新频率"
            rules={[{ required: true, message: '请选择更新频率' }]}
          >
            <Select placeholder="请选择更新频率">
              {Object.entries(UpdateFrequencyMap).map(([key, value]) => (
                <Option key={key} value={key}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="请选择优先级">
              {Object.entries(PriorityMap).map(([key, value]) => (
                <Option key={key} value={key}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              {Object.entries(StatusMap).map(([key, value]) => (
                <Option key={key} value={key}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="filters"
            label="过滤器 (JSON格式)"
          >
            <Input.TextArea 
              placeholder='{"key": "value"}'
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          
          <Form.Item
            name="credentials"
            label="凭证 (JSON格式)"
          >
            <Input.TextArea 
              placeholder='{"username": "user", "password": "pwd"}'
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SourceManagement; 