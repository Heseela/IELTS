'use client';

import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Award, TrendingUp, Clock, CheckCircle, XCircle, Download, Share2, RotateCcw } from 'lucide-react';
import { TestAttempt, UserAnswer, Question, MockTest } from '@/types';

interface TestResultsProps {
  attempt: TestAttempt;
  mockTest: MockTest;
  userAnswers: UserAnswer[];
  questions: Question[];
  onRetake: () => void;
  onReview: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  attempt,
  mockTest,
  userAnswers,
  questions,
  onRetake,
  onReview,
}) => {
  const correctCount = userAnswers.filter(a => a.is_correct).length;
  const totalMarks = mockTest.total_marks;
  const percentage = (attempt.score / totalMarks) * 100;
  const timeSpent = Math.floor((new Date(attempt.submitted_at).getTime() - new Date(attempt.started_at).getTime()) / 60000);
  
  const getBandDescription = (band: number) => {
    if (band >= 8.5) return { text: 'Expert User', color: 'text-purple-600' };
    if (band >= 7.5) return { text: 'Very Good User', color: 'text-blue-600' };
    if (band >= 6.5) return { text: 'Competent User', color: 'text-green-600' };
    if (band >= 5.5) return { text: 'Modest User', color: 'text-yellow-600' };
    return { text: 'Limited User', color: 'text-red-600' };
  };
  
  const bandInfo = getBandDescription(attempt.band_score);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're ready for the real exam! 🎉";
    if (percentage >= 75) return "Great job! Keep practicing to reach band 8+ 💪";
    if (percentage >= 60) return "Good effort! Focus on your weak areas 📚";
    if (percentage >= 50) return "Fair attempt. Review the questions you missed 📝";
    return "Need more practice. Don't give up! 🌟";
  };
  
  // Calculate section-wise analysis from actual answers
  const sectionAnalysis = {
    listening: { correct: 0, total: 0, percentage: 0 },
    reading: { correct: 0, total: 0, percentage: 0 },
    writing: { correct: 0, total: 0, percentage: 0 },
    speaking: { correct: 0, total: 0, percentage: 0 },
  };
  
  // Group questions by module/section
  userAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.question_id);
    if (question) {
      const section = question.module;
      if (section === 'listening') {
        sectionAnalysis.listening.total++;
        if (answer.is_correct) sectionAnalysis.listening.correct++;
      } else if (section === 'reading') {
        sectionAnalysis.reading.total++;
        if (answer.is_correct) sectionAnalysis.reading.correct++;
      } else if (section === 'writing') {
        sectionAnalysis.writing.total++;
        if (answer.is_correct) sectionAnalysis.writing.correct++;
      } else if (section === 'speaking') {
        sectionAnalysis.speaking.total++;
        if (answer.is_correct) sectionAnalysis.speaking.correct++;
      }
    }
  });
  
  // Calculate percentages
  Object.keys(sectionAnalysis).forEach(section => {
    const data = sectionAnalysis[section as keyof typeof sectionAnalysis];
    if (data.total > 0) {
      data.percentage = Math.round((data.correct / data.total) * 100);
    }
  });
  
  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <Card className="gradient-bg">
        <CardBody className="p-8 text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-4 text-white/90" />
          <div className="text-6xl font-bold mb-2">{attempt.band_score.toFixed(1)}</div>
          <div className="text-xl mb-1">{bandInfo.text}</div>
          <div className="text-white/80 text-sm mb-4">IELTS Band Score</div>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-2xl font-bold">{attempt.score}</div>
              <div className="text-sm text-white/80">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalMarks}</div>
              <div className="text-sm text-white/80">Total Marks</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round(percentage)}%</div>
              <div className="text-sm text-white/80">Percentage</div>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Performance Message */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-start space-x-3">
            {percentage >= 60 ? (
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {getPerformanceMessage()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You answered {correctCount} out of {userAnswers.length} questions correctly.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Test Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="p-4 text-center">
            <Clock className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{timeSpent} min</div>
            <div className="text-sm text-gray-500">Time Spent</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-gray-500">Correct Answers</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary-600">{userAnswers.length - correctCount}</div>
            <div className="text-sm text-gray-500">Incorrect Answers</div>
          </CardBody>
        </Card>
      </div>
      
      {/* Section-wise Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Section-wise Analysis</CardTitle>
          <CardDescription>Breakdown of your performance by section</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          {Object.entries(sectionAnalysis).map(([section, data]) => (
            data.total > 0 && (
              <div key={section}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{section}</span>
                  <span className="text-gray-600 dark:text-gray-400">{data.correct}/{data.total} ({data.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            )
          ))}
        </CardBody>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="primary" onClick={onReview}>
          <CheckCircle className="w-4 h-4 mr-2" />
          Review Answers
        </Button>
        <Button variant="outline" onClick={onRetake}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Test
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
};