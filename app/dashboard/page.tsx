'use client';

import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, FileText, Award, TrendingUp, Calendar, Target, Headphones, Mic, PenTool, BookOpen as BookIcon, Clock, Zap } from 'lucide-react';
import { dashboardStats, mockLiveClasses, mockVocabulary } from '@/data/mockData';
import Link from 'next/link';
import { StatsCard } from '@/components/dashboard/StatsCard';

export default function DashboardPage() {
  const stats = [
    { title: 'Courses Enrolled', value: dashboardStats.totalCourses, icon: BookOpen, trend: 12, color: 'primary' as const },
    { title: 'Completed Lessons', value: dashboardStats.completedLessons, icon: FileText, trend: 8, color: 'secondary' as const },
    { title: 'Mock Tests', value: dashboardStats.mockTestsTaken, icon: Target, trend: 15, color: 'success' as const },
    { title: 'Avg Band Score', value: dashboardStats.averageBandScore, icon: Award, trend: 5, color: 'warning' as const },
  ];

  const quickActions = [
    { icon: Headphones, label: 'Listening Practice', href: '/practice/listening', color: 'primary' },
    { icon: BookIcon, label: 'Reading Practice', href: '/practice/reading', color: 'secondary' },
    { icon: PenTool, label: 'Writing Practice', href: '/practice/writing', color: 'primary' },
    { icon: Mic, label: 'Speaking Practice', href: '/practice/speaking', color: 'secondary' },
  ];

  const quickActionColors = {
    primary: 'bg-primary-900/50 text-primary-400',
    secondary: 'bg-secondary-900/50 text-secondary-400',
  };

  const upcomingClasses = mockLiveClasses.slice(0, 2);
  const vocabularyToLearn = mockVocabulary.slice(0, 3);

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'basic':
        return 'bg-green-900/50 text-green-400';
      case 'intermediate':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'advanced':
        return 'bg-primary-900/50 text-primary-400';
      default:
        return 'bg-gray-800 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="w-11/12 mx-auto">
        <div className="gradient-bg rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-white/90 mb-4">You're making great progress. Keep up the momentum!</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5"/>
                  <span className="font-semibold">{dashboardStats.studyStreak}-day study streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{dashboardStats.totalStudyHours} hours of learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Next target: Band 8.0</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 bg-white/10 text-white hover:bg-white/20 border-white/20">
              View Full Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Quick Practice</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <Card hover className="cursor-pointer text-center">
                    <CardBody className="p-4">
                      <div className={`${quickActionColors[action.color as keyof typeof quickActionColors]} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">{action.label}</span>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <PerformanceChart />
          <RecentActivity />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Live Classes</CardTitle>
                <CardDescription>Join interactive sessions with expert teachers</CardDescription>
              </div>
              <Link href="/live-classes">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-900 p-3 rounded-lg">
                        <Calendar className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-100">{classItem.title}</h4>
                        <p className="text-sm text-gray-400">
                          {new Date(classItem.start_time).toLocaleDateString()} at {new Date(classItem.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs text-gray-500">Teacher: Sarah Johnson</p>
                      </div>
                    </div>
                    <Button size="sm" variant="primary">Join</Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vocabulary Builder</CardTitle>
                  <CardDescription>Words to learn today</CardDescription>
                </div>
                <Link href="/vocabulary">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {vocabularyToLearn.map((word) => (
                  <div key={word.id} className="p-4 rounded-lg bg-linear-to-r from-primary-950/50 to-secondary-950/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-100">{word.word}</h4>
                        <p className="text-sm text-gray-300">{word.meaning}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(word.level)}`}>
                        {word.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 italic">"{word.example}"</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Button size="xs" variant="outline">Mastered</Button>
                      <Button size="xs" variant="ghost">Review Later</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}