import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// 模拟数据
const chartData = [
  { name: '2月', langchain: 70, huggingface: 80, llama: 60 },
  { name: '3月', langchain: 75, huggingface: 76, llama: 65 },
  { name: '4月', langchain: 85, huggingface: 78, llama: 90 },
]

const ProjectHealthChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="langchain" 
            stackId="1"
            stroke="#0284C7" 
            fill="#BAE6FD" 
            name="LangChain"
          />
          <Area 
            type="monotone" 
            dataKey="huggingface" 
            stackId="1"
            stroke="#0369A1" 
            fill="#7DD3FC" 
            name="Hugging Face"
          />
          <Area 
            type="monotone" 
            dataKey="llama" 
            stackId="1"
            stroke="#075985" 
            fill="#38BDF8" 
            name="Llama"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProjectHealthChart 