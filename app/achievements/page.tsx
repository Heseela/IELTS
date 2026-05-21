'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, Star, Trophy, Target, Zap, BookOpen, Mic, PenTool, Headphones, Lock, CheckCircle, TrendingUp } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  earned: boolean;
  earnedDate?: Date;
  category: 'study' | 'practice' | 'test' | 'milestone';
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: <BookOpen className="w-8 h-8" />,
    points: 50,
    earned: true,
    earnedDate: new Date('2024-02-01'),
    category: 'study',
  },
  {
    id: 2,
    title: 'Practice Makes Perfect',
    description: 'Complete 10 practice sessions',
    icon: <Target className="w-8 h-8" />,
    points: 100,
    earned: true,
    earnedDate: new Date('2024-02-15'),
    category: 'practice',
  },
  {
    id: 3,
    title: 'Listening Master',
    description: 'Score 8.0+ in listening section',
    icon: <Headphones className="w-8 h-8" />,
    points: 150,
    earned: false,
    category: 'test',
  },
  {
    id: 4,
    title: 'Reading Champion',
    description: 'Complete all reading lessons',
    icon: <BookOpen className="w-8 h-8" />,
    points: 150,
    earned: false,
    category: 'study',
  },
  {
    id: 5,
    title: 'Writing Pro',
    description: 'Submit 5 writing tasks',
    icon: <PenTool className="w-8 h-8" />,
    points: 100,
    earned: true,
    earnedDate: new Date('2024-03-01'),
    category: 'practice',
  },
  {
    id: 6,
    title: 'Speaking Star',
    description: 'Record 10 speaking answers',
    icon: <Mic className="w-8 h-8" />,
    points: 100,
    earned: false,
    category: 'practice',
  },
  {
    id: 7,
    title: 'Quiz Master',
    description: 'Score 90%+ on any mock test',
    icon: <Trophy className="w-8 h-8" />,
    points: 200,
    earned: false,
    category: 'test',
  },
  {
    id: 8,
    title: '7-Day Streak',
    description: 'Study for 7 consecutive days',
    icon: <Zap className="w-8 h-8" />,
    points: 75,
    earned: true,
    earnedDate: new Date('2024-03-10'),
    category: 'milestone',
  },
  {
    id: 9,
    title: 'Vocabulary Guru',
    description: 'Learn 100 new words',
    icon: <Award className="w-8 h-8" />,
    points: 120,
    earned: false,
    category: 'study',
  },
  {
    id: 10,
    title: 'Band 7 Achiever',
    description: 'Achieve band 7 or higher',
    icon: <Star className="w-8 h-8" />,
    points: 300,
    earned: false,
    category: 'milestone',
  },
];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<number | null>(null);
  
  const categories = ['all', 'study', 'practice', 'test', 'milestone'];
  
  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );
  
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const nextAchievements = achievements.filter(a => !a.earned).slice(0, 3);
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Achievements</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your progress and earn badges</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody className="p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-100">{earnedCount}</div>
              <div className="text-sm text-gray-500">Achievements Earned</div>
              <div className="mt-2 text-xs text-gray-400">out of {achievements.length}</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-secondary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-100">{totalPoints}</div>
              <div className="text-sm text-gray-500">Total Points Earned</div>
              <div className="mt-2 text-xs text-gray-400">Keep collecting more!</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-6 text-center">
              <div className="w-12 h-12 bg-success-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
              <div className="text-3xl font-bold text-success-600">{Math.round((earnedCount / achievements.length) * 100)}%</div>
              <div className="text-sm text-gray-500">Completion Rate</div>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-success-500 h-1.5 rounded-full"
                  style={{ width: `${(earnedCount / achievements.length) * 100}%` }}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Next Achievements */}
        {nextAchievements.length > 0 && (
          <Card className="mb-8 gradient-bg">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Next Achievements to Unlock</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {nextAchievements.map((achievement) => (
                  <div key={achievement.id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-white">{achievement.icon}</div>
                      <h4 className="font-semibold text-white">{achievement.title}</h4>
                    </div>
                    <p className="text-white/80 text-sm mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">{achievement.points} points</span>
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              hover={!achievement.earned}
              className={`transition-all ${achievement.earned ? 'border-success-500 border' : 'opacity-75'}`}
            >
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    achievement.earned 
                      ? 'gradient-bg text-white' 
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="w-6 h-6 text-success-500" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-100 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  {achievement.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{achievement.points} points</span>
                  {achievement.earned && achievement.earnedDate && (
                    <span className="text-xs text-gray-400">
                      Earned {achievement.earnedDate.toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                {!achievement.earned && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      fullWidth
                      onClick={() => setShowDetails(achievement.id)}
                    >
                      View Requirements
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
        
        {/* Achievement Details Modal would go here */}
      </div>
    </div>
  );
}