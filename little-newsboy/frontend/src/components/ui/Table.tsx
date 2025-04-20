import React, { ReactNode } from 'react';

// 表格列定义
export interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => any);
  cell?: (data: T) => ReactNode;
  className?: string;
}

// 表格属性
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  noDataMessage?: string;
  rowClassName?: (data: T, index: number) => string;
  onRowClick?: (data: T) => void;
}

function Table<T>({
  data,
  columns,
  isLoading = false,
  noDataMessage = '没有数据',
  rowClassName,
  onRowClick,
}: TableProps<T>) {
  // 获取单元格内容
  const getCellValue = (row: T, column: Column<T>) => {
    const accessor = column.accessor;
    if (typeof accessor === 'function') {
      return accessor(row);
    }
    return row[accessor as keyof T];
  };

  // 渲染加载状态
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse">
          <div className="border-b border-gray-200">
            <div className="px-6 py-3 bg-gray-100 flex">
              {columns.map((column, index) => (
                <div key={index} className="flex-1 h-6 bg-gray-300 rounded mr-2"></div>
              ))}
            </div>
          </div>
          <div>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="border-b border-gray-200 px-6 py-4 flex">
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="flex-1 h-5 bg-gray-200 rounded mr-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 渲染空数据状态
  if (data.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="px-6 py-3 bg-gray-50">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              {columns.map((column, index) => (
                <div key={index} className={`text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}>
                  {column.header}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center py-10 text-gray-500">
          {noDataMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  ${rowClassName ? rowClassName(row, rowIndex) : ''}
                `}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                    {column.cell ? column.cell(row) : getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table; 