import { 
  ResponsiveContainer, 
  AreaChart as RechartsAreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts'

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface AreaChartProps {
  data: DataPoint[];
  areas: {
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
    fillOpacity?: number;
  }[];
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  stackId?: string;
}

const AreaChart = ({
  data,
  areas,
  xAxisDataKey = 'name',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  stackId
}: AreaChartProps) => {
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
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          
          <XAxis 
            dataKey={xAxisDataKey} 
            tick={{ fontSize: 12 }}
          />
          
          <YAxis 
            tick={{ fontSize: 12 }}
          />
          
          {showTooltip && <Tooltip />}
          
          {showLegend && <Legend />}
          
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stroke={area.color}
              fill={area.color}
              strokeWidth={area.strokeWidth || 2}
              fillOpacity={area.fillOpacity || 0.3}
              stackId={stackId}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart; 