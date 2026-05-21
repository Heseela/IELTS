import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colors = {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
    success: 'bg-gradient-to-br from-green-500 to-green-600',
    warning: 'bg-gradient-to-br from-orange-500 to-orange-600',
  };
  
  const getTrendColor = (trendValue: number) => {
    if (trendValue > 0) return 'text-green-400';
    return 'text-red-400';
  };
  
  return (
    <Card hover>
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-100">{value}</h3>
            {trend && (
              <p className={`text-sm mt-2 ${getTrendColor(trend)}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
              </p>
            )}
          </div>
          <div className={`${colors[color]} w-14 h-14 rounded-lg flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};