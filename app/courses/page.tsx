'use client';

import React, { useState } from 'react';
import { CourseCard } from '@/components/courses/CourseCard';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Grid3x3, List, TrendingUp, Clock, Award } from 'lucide-react';
import { mockCourses } from '@/data/mockData';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const courseTypes = ['all', 'listening', 'reading', 'writing', 'speaking', 'academic', 'general'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  const categoryStats = {
    total: mockCourses.length,
    completed: 4,
    inProgress: 3,
    averageProgress: 65,
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">IELTS Courses</h1>
          <p className="text-gray-300">Comprehensive courses to master every section of the IELTS exam</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-100">{categoryStats.total}</p>
                </div>
                <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-gray-100">{categoryStats.completed}</p>
                </div>
                <div className="w-10 h-10 bg-success-900 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-success-600" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">In Progress</p>
                  <p className="text-2xl font-bold text-gray-100">{categoryStats.inProgress}</p>
                </div>
                <div className="w-10 h-10 bg-secondary-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary-600" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Progress</p>
                  <p className="text-2xl font-bold text-gray-100">{categoryStats.averageProgress}%</p>
                </div>
                <div className="w-10 h-10 bg-warning-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-warning-600" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="mb-8">
          <CardBody className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon={Search}
                  placeholder="Search courses by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {courseTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {filteredCourses.length > 0 ? (
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}