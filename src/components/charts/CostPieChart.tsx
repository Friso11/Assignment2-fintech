import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PortfolioAsset } from '../../types/portfolio';

interface CostPieChartProps {
  data: PortfolioAsset[];
}

const COLORS = ['#36B37E', '#2C6BED', '#FFAB00', '#FF5630', '#8777D9', '#00B8D9', '#6554C0', '#00C7E6', '#4C9AFF', '#FFBDAD'];

const CostPieChart: React.FC<CostPieChartProps> = ({ data }) => {
  // Group by broker
  const brokerCosts = data.reduce((acc, item) => {
    if (!acc[item.broker]) {
      acc[item.broker] = 0;
    }
    acc[item.broker] += item.estimatedCost;
    return acc;
  }, {} as Record<string, number>);
  
  // Convert to array for the chart
  const chartData = Object.entries(brokerCosts).map(([name, value]) => ({
    name,
    value,
  }));
  
  // Sort by value (highest first)
  chartData.sort((a, b) => b.value - a.value);

  // Custom renderer for the pie chart labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`€${value.toFixed(2)}`, 'Fee']}
            contentStyle={{ backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostPieChart;