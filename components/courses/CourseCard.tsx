import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play, Clock, BookOpen, Users, Star } from 'lucide-react';
import { Course } from '@/types';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  viewMode?: 'grid' | 'list';
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, viewMode = 'grid' }) => {
  const progress = Math.floor(Math.random() * 100);
  const rating = (Math.random() * 2 + 3).toFixed(1);
  const students = Math.floor(Math.random() * 5000) + 1000;
  
  if (viewMode === 'list') {
    return (
      <Card hover>
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full md:w-48 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-primary-900 text-primary-300 rounded-full text-xs font-semibold">
                  {course.type.toUpperCase()}
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-semibold text-gray-300">{rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({students.toLocaleString()} students)</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">{course.title}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>12 hours</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>8 lessons</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{students.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-300">{progress}% Complete</div>
                    <div className="w-32 bg-gray-700 rounded-full h-1.5">
                      <div className="bg-linear-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button size="sm" variant="primary">
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <Card hover>
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <CardBody className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
            {course.type.toUpperCase()}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-100 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>12 hours</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>8 lessons</span>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div className="bg-linear-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <Link href={`/courses/${course.id}`}>
          <Button variant="primary" fullWidth>
            <Play className="w-4 h-4 mr-2" />
            Continue Course
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};