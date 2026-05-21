'use client';

import React, { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lesson } from '@/types';
import { Play, Lock, CheckCircle, Clock, Download, Video, FileText, ChevronDown, ChevronUp, Award } from 'lucide-react';

interface LessonListProps {
  lessons: Lesson[];
  courseTitle: string;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, courseTitle }) => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  const toggleLesson = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };
  
  const markAsComplete = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };
  
  const getProgress = () => {
    return (completedLessons.length / lessons.length) * 100;
  };
  
  return (
    <div className="space-y-6">
      {/* Course Progress Header */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{courseTitle}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                {completedLessons.length} of {lessons.length} lessons completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold gradient-text">{Math.round(getProgress())}%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Overall Progress</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="gradient-bg h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </CardBody>
      </Card>
      
      {/* Lessons List */}
      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isExpanded = expandedLesson === lesson.id;
          
          return (
            <Card key={lesson.id} hover={!isCompleted}>
              <CardBody className="p-0">
                {/* Lesson Header */}
                <div 
                  className={`p-5 cursor-pointer transition-colors ${
                    isExpanded ? 'border-b border-gray-200 dark:border-gray-700' : ''
                  }`}
                  onClick={() => toggleLesson(lesson.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Lesson Number */}
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center font-bold
                        ${isCompleted 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Lesson Info */}
                      <div className="flex-1">
                        <h3 className={`font-semibold ${isCompleted ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                          {lesson.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{lesson.duration} min</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Video className="w-3 h-3 mr-1" />
                            <span>Video Lesson</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={isCompleted ? 'outline' : 'primary'}
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsComplete(lesson.id);
                          }}
                        >
                          {isCompleted ? 'Undo' : 'Mark Complete'}
                        </Button>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-5 bg-gray-50 dark:bg-gray-800/50 animate-slide-up">
                    {/* Video Player */}
                    <div className="mb-4">
                      <div className="relative pb-[56.25%] rounded-lg overflow-hidden bg-black">
                        <iframe
                          src={lesson.video_url}
                          title={lesson.title}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    
                    {/* Lesson Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Lesson Description</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {lesson.content}
                      </p>
                    </div>
                    
                    {/* Additional Resources */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Additional Resources
                      </h4>
                      <div className="space-y-2">
                        <button className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Lesson Notes PDF</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Practice Exercises</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Answer Key</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Discussion Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Discussion</h4>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <textarea 
                          placeholder="Ask a question or share your thoughts..."
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm" variant="primary">Post Comment</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
      
      {/* Next Lesson Button */}
      {completedLessons.length < lessons.length && (
        <div className="flex justify-end mt-6">
          <Button variant="primary">
            Continue to Next Lesson
            <Play className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
      
      {/* Completion Certificate */}
      {completedLessons.length === lessons.length && (
        <Card>
          <CardBody className="p-6 text-center">
            <div className="gradient-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You've completed all lessons in this course!
            </p>
            <Button variant="primary">
              Download Certificate
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};