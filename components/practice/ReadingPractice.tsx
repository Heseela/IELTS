'use client';

import React, { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Clock, BookOpen, Highlighter, ZoomIn } from 'lucide-react';

interface ReadingQuestion {
  id: number;
  type: 'mcq' | 'true_false' | 'fill_blank' | 'matching';
  text: string;
  options?: string[];
  correctAnswer: string;
}

interface ReadingPracticeProps {
  title: string;
  passage: string;
  questions: ReadingQuestion[];
  timeLimit: number;
  onComplete?: (score: number) => void;
}

export const ReadingPractice: React.FC<ReadingPracticeProps> = ({
  title,
  passage,
  questions,
  timeLimit,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [isTiming, setIsTiming] = useState(false);
  const [score, setScore] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');
  
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
  
  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };
  
  const handleSubmit = () => {
    setIsTiming(false);
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correct++;
      }
    });
    const finalScore = (correct / questions.length) * 100;
    setScore(finalScore);
    setSubmitted(true);
    if (onComplete) onComplete(finalScore);
  };
  
  const handleTextHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setHighlightedText(selection.toString());
      setTimeout(() => setHighlightedText(''), 3000);
    }
  };
  
  if (!isTiming && !submitted) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You will have {timeLimit} minutes to read the passage and answer {questions.length} questions.
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{questions.length}</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">{timeLimit}</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
          </div>
          <Button variant="primary" size="lg" onClick={handleStart}>
            Start Reading
          </Button>
        </CardBody>
      </Card>
    );
  }
  
  if (submitted) {
    const getFeedback = () => {
      if (score >= 90) return { band: 9, message: 'Excellent! Outstanding reading comprehension.' };
      if (score >= 75) return { band: 8, message: 'Very good! Strong reading skills.' };
      if (score >= 60) return { band: 7, message: 'Good job! Focus on skimming techniques.' };
      if (score >= 50) return { band: 6, message: 'Fair attempt. Practice timed reading.' };
      return { band: 5, message: 'Need more practice. Build vocabulary and reading speed.' };
    };
    
    const feedback = getFeedback();
    const correctCount = questions.filter(q => 
      answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
    ).length;
    
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Reading Practice Complete!</h2>
          <div className="text-5xl font-bold gradient-text mb-2">{Math.round(score)}%</div>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Band Score: {feedback.band}</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You answered {correctCount} out of {questions.length} questions correctly.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{feedback.message}</p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Practice Again
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Review Answers
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary-500" />
            <span className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleTextHighlight} className="p-2 hover:bg-gray-100 rounded-lg">
              <Highlighter className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reading Passage */}
        <Card>
          <CardBody className="p-6 max-h-[600px] overflow-y-auto">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Reading Passage</h3>
              {passage.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            {highlightedText && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg animate-fade-in">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Highlighted:</strong> {highlightedText}
                </p>
              </div>
            )}
          </CardBody>
        </Card>
        
        {/* Questions */}
        <Card>
          <CardBody className="p-6 max-h-[600px] overflow-y-auto">
            <div className="space-y-6">
              {questions.map((question, idx) => (
                <div key={question.id} className="pb-4 border-b border-gray-200 last:border-0">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {idx + 1}. {question.text}
                  </p>
                  
                  {question.type === 'mcq' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => (
                        <label key={optIdx} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name={`q${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'true_false' && (
                    <div className="flex gap-4">
                      {['True', 'False', 'Not Given'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={`q${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            className="mr-2"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'fill_blank' && (
                    <Input
                      placeholder="Type your answer"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
              
              <Button variant="primary" className="w-full mt-4" onClick={handleSubmit}>
                Submit Answers
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};