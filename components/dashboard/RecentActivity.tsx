import React from 'react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { CheckCircle, Clock, Award, BookOpen } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'test',
    title: 'Completed IELTS Academic Mock Test 1',
    score: 'Band 7.5',
    time: '2 hours ago',
    icon: Award,
    color: 'primary',
  },
  {
    id: 2,
    type: 'lesson',
    title: 'Completed Listening Section Lesson',
    score: null,
    time: 'Yesterday',
    icon: CheckCircle,
    color: 'green',
  },
  {
    id: 3,
    type: 'class',
    title: 'Attended Live Writing Workshop',
    score: null,
    time: '2 days ago',
    icon: BookOpen,
    color: 'secondary',
  },
  {
    id: 4,
    type: 'practice',
    title: 'Practiced Speaking Part 2',
    score: 'Fluency: 7.0',
    time: '3 days ago',
    icon: Clock,
    color: 'orange',
  },
];

export const RecentActivity: React.FC = () => {
  const colors = {
    primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
    secondary: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
  };
  
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-bold text-gray-100">Recent Activity</h3>
        <p className="text-gray-300 text-sm">Your latest achievements and progress</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary-700/10 transition-colors">
                <div className={`${colors[activity.color as keyof typeof colors]} p-2 rounded-lg`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-100">{activity.title}</p>
                  {activity.score && <p className="text-sm text-primary-600 font-medium">{activity.score}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};