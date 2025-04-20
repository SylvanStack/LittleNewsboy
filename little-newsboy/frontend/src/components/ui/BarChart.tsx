import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from 'recharts'

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface BarChartProps {
  data: DataPoint[];
  bars: {
    dataKey: string;
    name: string;
    color: string;
    showLabel?: boolean;
  }[];
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  layout?: 'horizontal' | 'vertical';
  stackId?: string;
}

const BarChart = ({
  data,
  bars,
  xAxisDataKey = 'name',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  layout = 'horizontal',
  stackId
}: BarChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-60 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-gray-500">暂无数据</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          
          <XAxis 
            dataKey={xAxisDataKey} 
            tick={{ fontSize: 12 }}
            type={layout === 'horizontal' ? 'category' : 'number'}
          />
          
          <YAxis 
            tick={{ fontSize: 12 }}
            type={layout === 'horizontal' ? 'number' : 'category'}
          />
          
          {showTooltip && <Tooltip />}
          
          {showLegend && <Legend />}
          
          {bars.map((bar) => (
            <Bar 
              key={bar.dataKey}
              dataKey={bar.dataKey} 
              name={bar.name}
              fill={bar.color}
              stackId={stackId}
            >
              {bar.showLabel && (
                <LabelList 
                  dataKey={bar.dataKey} 
                  position={layout === 'horizontal' ? 'top' : 'right'} 
                  style={{ fontSize: 11 }}
                  formatter={(value: number) => value}
                />
              )}
            </Bar>
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart; 