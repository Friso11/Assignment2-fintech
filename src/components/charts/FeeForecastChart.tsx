import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FeeForecastChartProps {
  initialAmount: number;
  currentFeePercent: number;
  optimizedFeePercent: number;
  years?: number;
  growthRate?: number;
}

const FeeForecastChart: React.FC<FeeForecastChartProps> = ({
  initialAmount,
  currentFeePercent,
  optimizedFeePercent,
  years = 30,
  growthRate = 0.07 // 7% annual growth
}) => {
  // Generate data for both scenarios - current fees vs optimized fees
  const data = [];
  
  let currentValue = initialAmount;
  let optimizedValue = initialAmount;
  
  for (let year = 0; year <= years; year++) {
    data.push({
      year,
      current: Math.round(currentValue),
      optimized: Math.round(optimizedValue),
      difference: Math.round(optimizedValue - currentValue),
    });
    
    // Calculate next year values
    currentValue = currentValue * (1 + growthRate - currentFeePercent);
    optimizedValue = optimizedValue * (1 + growthRate - optimizedFeePercent);
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} 
          />
          <YAxis 
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} 
            domain={[0, 'auto']}
          />
          <Tooltip 
            formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="current" 
            name="Current Fees" 
            stroke="#FF5630" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="optimized" 
            name="Optimized Fees" 
            stroke="#36B37E" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-end mt-2">
        <div className="bg-gray-50 px-3 py-2 rounded-md">
          <span className="text-sm font-medium text-success">Final difference: </span>
          <span className="text-sm font-bold">€{data[data.length - 1].difference.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FeeForecastChart;