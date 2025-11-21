import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UsageStats } from '../types';

interface QuotaChartProps {
  stats: UsageStats;
}

const COLORS = ['#ef4444', '#22c55e']; // Red for used, Green for remaining

const QuotaChart: React.FC<QuotaChartProps> = ({ stats }) => {
  const data = [
    { name: 'Used', value: stats.used },
    { name: 'Remaining', value: stats.remaining },
  ];

  const percentage = Math.round((stats.used / stats.dailyLimit) * 100);

  return (
    <div className="h-64 w-full relative bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">Daily Quota Usage</h3>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none z-0">
        <span className="text-4xl font-bold text-slate-800">{percentage}%</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">Consumed</span>
      </div>
      <div className="h-full w-full z-10 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                formatter={(value: number) => [`${value} reqs`, '']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuotaChart;