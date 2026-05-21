'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardHeader } from '../ui/Card';

const data = [
  { month: 'Jan', score: 6.5 },
  { month: 'Feb', score: 6.8 },
  { month: 'Mar', score: 7.0 },
  { month: 'Apr', score: 7.2 },
  { month: 'May', score: 7.5 },
  { month: 'Jun', score: 7.8 },
];

export const PerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-600">Band Score Progress</h3>
        <p className="text-gray-500 text-sm">Your IELTS band score trend over time</p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis domain={[6, 8]} stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0D4A6E', 
                borderRadius: '8px', 
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              dot={{ fill: '#d946ef', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};