'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Award, BarChart, Play, FileText, TrendingUp } from 'lucide-react';
import { MockTest } from '@/types';

interface TestCardProps {
  test: MockTest & { attempts?: number; bestScore?: number; averageBand?: number };
  onStart: (test: any) => void;
  onViewDetails?: (test: any) => void;
}

export const TestCard: React.FC<TestCardProps> = ({ test, onStart, onViewDetails }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card hover className="h-full">
      <div className={`h-1 rounded-t-xl ${test.type === 'academic' ? 'bg-primary-500' : 'bg-secondary-500'}`}></div>
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              test.type === 'academic' 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                : 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300'
            }`}>
              {test.type.toUpperCase()}
            </span>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-2">{test.title}</h3>
          </div>
          {test.bestScore && test.bestScore > 0 && (
            <div className="text-right">
              <div className="text-sm text-gray-500">Best Score</div>
              <div className={`text-xl font-bold ${getScoreColor(test.bestScore)}`}>
                {test.bestScore.toFixed(1)}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{test.duration} min</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Award className="w-4 h-4 mr-1" />
            <span>{test.total_marks} marks</span>
          </div>
          {test.attempts && test.attempts > 0 && (
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <FileText className="w-4 h-4 mr-1" />
              <span>{test.attempts} attempts</span>
            </div>
          )}
        </div>
        
        {test.attempts && test.attempts > 0 && test.averageBand && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Average Band: {test.averageBand.toFixed(1)}</span>
              <span>Target: 7.5</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(test.averageBand / 9) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={() => onStart(test)}
          >
            <Play className="w-4 h-4 mr-2" />
            {test.attempts && test.attempts > 0 ? 'Retake Test' : 'Start Test'}
          </Button>
          {onViewDetails && (
            <Button 
              variant="outline" 
              onClick={() => onViewDetails(test)}
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};