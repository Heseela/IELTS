'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/Input';
import { Clock, AlertCircle, CheckCircle, BarChart, TrendingUp, MessageCircle, PenTool } from 'lucide-react';

interface WritingTask {
  id: number;
  title: string;
  question: string;
  wordLimit: number;
  timeLimit: number;
  sampleAnswer?: string;
}

interface WritingPracticeProps {
  task: WritingTask;
  onSubmit?: (essay: string, feedback: any) => void;
}

export const WritingPractice: React.FC<WritingPracticeProps> = ({ task, onSubmit }) => {
  const [essay, setEssay] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.timeLimit * 60);
  const [isTiming, setIsTiming] = useState(false);
  
  const wordCount = essay.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isWordCountValid = wordCount >= task.wordLimit * 0.8;
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTiming && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTiming) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isTiming, timeLeft]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStart = () => {
    setIsTiming(true);
  };
  
  const handleSubmit = () => {
    setIsTiming(false);
    setSubmitted(true);
    generateFeedback();
  };
  
  const generateFeedback = () => {
    const feedback = {
      grammar: Math.floor(Math.random() * 30) + 70,
      vocabulary: Math.floor(Math.random() * 30) + 70,
      coherence: Math.floor(Math.random() * 30) + 70,
      taskAchievement: Math.floor(Math.random() * 30) + 70,
      estimatedBand: (Math.random() * 3 + 5.5).toFixed(1),
      suggestions: [
        'Consider using more varied sentence structures',
        'Add more specific examples to support your arguments',
        'Improve transitions between paragraphs',
        'Use more academic vocabulary',
        'Check your grammar for subject-verb agreement',
      ],
    };
    if (onSubmit) onSubmit(essay, feedback);
    setShowFeedback(true);
  };
  
  if (!isTiming && !submitted) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <PenTool className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{task.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{task.question}</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{task.wordLimit}</div>
              <div className="text-sm text-gray-500">Word Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">{task.timeLimit}</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
          </div>
          <Button variant="primary" size="lg" onClick={handleStart}>
            Start Writing
          </Button>
        </CardBody>
      </Card>
    );
  }
  
  if (submitted && showFeedback) {
    const feedback = {
      grammar: Math.floor(Math.random() * 30) + 70,
      vocabulary: Math.floor(Math.random() * 30) + 70,
      coherence: Math.floor(Math.random() * 30) + 70,
      taskAchievement: Math.floor(Math.random() * 30) + 70,
      estimatedBand: (Math.random() * 3 + 5.5).toFixed(1),
      suggestions: [
        'Consider using more varied sentence structures',
        'Add more specific examples to support your arguments',
        'Improve transitions between paragraphs',
        'Use more academic vocabulary',
        'Check your grammar for subject-verb agreement',
      ],
    };
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Writing Feedback</CardTitle>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="gradient-bg rounded-xl p-6 text-white text-center">
            <div className="text-5xl font-bold mb-2">{feedback.estimatedBand}</div>
            <div className="text-sm opacity-90">Estimated Band Score</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary-600">{feedback.grammar}%</div>
              <div className="text-sm text-gray-600">Grammar</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-2xl font-bold text-secondary-600">{feedback.vocabulary}%</div>
              <div className="text-sm text-gray-600">Vocabulary</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{feedback.coherence}%</div>
              <div className="text-sm text-gray-600">Coherence</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{feedback.taskAchievement}%</div>
              <div className="text-sm text-gray-600">Task Achievement</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggestions for Improvement</h3>
            <ul className="space-y-2">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <MessageCircle className="w-5 h-5 text-primary-500 mt-0.5" />
                  <span className="text-gray-600">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowFeedback(false)}>
              View My Essay
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Practice Another Task
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  if (submitted) {
    return (
      <Card>
        <CardBody className="p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Essay Submitted!</h2>
          <p className="text-gray-600 mb-6">Your essay has been submitted for evaluation.</p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={() => setShowFeedback(true)}>
              View AI Feedback
            </Button>
            <Button variant="outline">Request Teacher Review</Button>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
          <p className="text-sm text-gray-500">IELTS Writing Task</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary-500" />
            <span className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm ${!isWordCountValid ? 'text-red-500' : 'text-green-500'}`}>
              {wordCount} / {task.wordLimit} words
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle>Question</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700 leading-relaxed">{task.question}</p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">
                ⚠️ Write at least {task.wordLimit} words. You have {task.timeLimit} minutes.
              </p>
            </div>
          </CardBody>
        </Card>
        
        {/* Writing Area */}
        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
          </CardHeader>
          <CardBody>
            <TextArea
              rows={15}
              placeholder="Type your essay here..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              className="font-mono text-sm"
            />
            <div className="flex justify-end mt-4">
              <Button variant="primary" onClick={handleSubmit} disabled={wordCount < task.wordLimit * 0.5}>
                Submit Essay
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Writing Tips</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Structure</p>
                <p className="text-sm text-gray-500">Use clear paragraphs with topic sentences</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <BarChart className="w-5 h-5 text-primary-500 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Examples</p>
                <p className="text-sm text-gray-500">Support arguments with specific examples</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary-500 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Vocabulary</p>
                <p className="text-sm text-gray-500">Use a range of academic vocabulary</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};