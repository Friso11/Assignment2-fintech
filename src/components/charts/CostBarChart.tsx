import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PortfolioAsset } from '../../types/portfolio';

interface CostBarChartProps {
  data: PortfolioAsset[];
}

const CostBarChart: React.FC<CostBarChartProps> = ({ data }) => {
  // Prepare data for the chart
  const chartData = data.map(item => ({
    name: item.asset,
    cost: item.estimatedCost,
    costPercent: item.costPercent,
    amount: item.amount,
  }));

  // Sort by cost (highest first)
  chartData.sort((a, b) => b.cost - a.cost);

  // Take top 10 for readability
  const topItems = chartData.slice(0, 10);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topItems}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `€${value}`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`€${value.toFixed(2)}`, 'Annual Fee']}
            labelFormatter={(label) => `Asset: ${label}`}
            contentStyle={{ backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}
          />
          <Bar dataKey="cost" name="Annual Fee">
            {topItems.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.costPercent > 1 ? '#FF5630' : entry.costPercent > 0.5 ? '#FFAB00' : '#36B37E'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostBarChart;