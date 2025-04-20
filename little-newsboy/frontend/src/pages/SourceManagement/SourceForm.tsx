import React, { useState, useEffect } from 'react';
import InputField from '../../components/ui/InputField';
import SelectField from '../../components/ui/SelectField';
import Button from '../../components/ui/Button';

// 信息源类型选项
const sourceTypeOptions = [
  { value: 'WEBSITE', label: '网站' },
  { value: 'RSS', label: 'RSS订阅' },
  { value: 'API', label: 'API接口' },
  { value: 'GITHUB', label: 'GitHub仓库' },
  { value: 'TWITTER', label: 'Twitter' },
  { value: 'PAPER', label: '论文' },
  { value: 'OTHER', label: '其他' },
];

// 状态选项
const statusOptions = [
  { value: 'ACTIVE', label: '活跃' },
  { value: 'PAUSED', label: '暂停' },
  { value: 'PENDING', label: '待处理' },
];

// 优先级选项
const priorityOptions = [
  { value: 'HIGH', label: '高' },
  { value: 'MEDIUM', label: '中' },
  { value: 'LOW', label: '低' },
];

// 更新频率选项
const updateFrequencyOptions = [
  { value: 'HOURLY', label: '每小时' },
  { value: 'DAILY', label: '每天' },
  { value: 'WEEKLY', label: '每周' },
  { value: 'MONTHLY', label: '每月' },
  { value: 'MANUAL', label: '手动' },
];

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
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface SourceFormProps {
  initialData?: Source | null;
  onSubmit: (data: Partial<Source>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const SourceForm: React.FC<SourceFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isLoading = false,
}) => {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    type: 'WEBSITE',
    url: '',
    update_frequency: 'DAILY',
    priority: 'MEDIUM',
    status: 'ACTIVE',
    filters: '',
    credentials: '',
  });
  
  // 表单错误
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 初始化表单数据
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'WEBSITE',
        url: initialData.url || '',
        update_frequency: initialData.update_frequency || 'DAILY',
        priority: initialData.priority || 'MEDIUM',
        status: initialData.status || 'ACTIVE',
        filters: initialData.filters ? JSON.stringify(initialData.filters, null, 2) : '',
        credentials: initialData.credentials ? JSON.stringify(initialData.credentials, null, 2) : '',
      });
    }
  }, [initialData]);
  
  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '名称不能为空';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL不能为空';
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = 'URL必须以http://或https://开头';
    }
    
    if (formData.filters.trim()) {
      try {
        JSON.parse(formData.filters);
      } catch (e) {
        newErrors.filters = '过滤条件必须是有效的JSON格式';
      }
    }
    
    if (formData.credentials.trim()) {
      try {
        JSON.parse(formData.credentials);
      } catch (e) {
        newErrors.credentials = '凭证信息必须是有效的JSON格式';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // 准备提交数据
    const submitData: Partial<Source> = {
      name: formData.name,
      type: formData.type,
      url: formData.url,
      update_frequency: formData.update_frequency,
      priority: formData.priority,
      status: formData.status,
    };
    
    // 处理可选JSON字段
    if (formData.filters.trim()) {
      submitData.filters = JSON.parse(formData.filters);
    }
    
    if (formData.credentials.trim()) {
      submitData.credentials = JSON.parse(formData.credentials);
    }
    
    onSubmit(submitData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="名称"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="信息源名称"
          required
          fullWidth
          error={errors.name}
        />
        
        <SelectField
          label="类型"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={sourceTypeOptions}
          required
          fullWidth
        />
        
        <div className="col-span-1 md:col-span-2">
          <InputField
            label="URL"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
            fullWidth
            error={errors.url}
            helperText="信息源的URL地址，必须以http://或https://开头"
          />
        </div>
        
        <SelectField
          label="更新频率"
          id="update_frequency"
          name="update_frequency"
          value={formData.update_frequency}
          onChange={handleChange}
          options={updateFrequencyOptions}
          fullWidth
        />
        
        <SelectField
          label="优先级"
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorityOptions}
          fullWidth
        />
        
        <SelectField
          label="状态"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
          fullWidth
        />
        
        <div className="col-span-1 md:col-span-2">
          <div className="mb-4">
            <label htmlFor="filters" className="block text-sm font-medium text-gray-700 mb-1">
              过滤条件 (JSON格式，可选)
            </label>
            <textarea
              id="filters"
              name="filters"
              value={formData.filters}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.filters ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='{"keywords": ["AI", "机器学习"], "excludePattern": "广告"}'
            />
            {errors.filters && (
              <p className="mt-1 text-sm text-red-600">{errors.filters}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              可以设置关键词、排除模式等过滤规则，采用JSON格式
            </p>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="mb-4">
            <label htmlFor="credentials" className="block text-sm font-medium text-gray-700 mb-1">
              凭证信息 (JSON格式，可选)
            </label>
            <textarea
              id="credentials"
              name="credentials"
              value={formData.credentials}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.credentials ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='{"apiKey": "your-api-key", "username": "your-username"}'
            />
            {errors.credentials && (
              <p className="mt-1 text-sm text-red-600">{errors.credentials}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              如果信息源需要认证，可以在这里设置API密钥、用户名密码等凭证信息
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          取消
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {initialData ? '保存修改' : '创建信息源'}
        </Button>
      </div>
    </form>
  );
};

export default SourceForm; 