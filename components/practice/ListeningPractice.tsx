'use client';

import React, { useState, useRef } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Play, Pause, Volume2, VolumeX, Download, Headphones, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ListeningQuestion {
  id: number;
  text: string;
  type: 'mcq' | 'fill_blank';
  options?: string[];
  correctAnswer: string;
  audioUrl: string;
  transcript: string;
}

interface ListeningPracticeProps {
  questions: ListeningQuestion[];
  title: string;
  onComplete?: (score: number) => void;
}

export const ListeningPractice: React.FC<ListeningPracticeProps> = ({
  questions,
  title,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer });
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
      setSubmitted(true);
      if (onComplete) onComplete(score);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correct++;
      }
    });
    const finalScore = (correct / questions.length) * 100;
    setScore(finalScore);
  };
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  if (submitted) {
    const getFeedback = () => {
      if (score >= 90) return { band: 9, message: 'Excellent! You have mastered listening skills.' };
      if (score >= 75) return { band: 8, message: 'Very good! Keep practicing.' };
      if (score >= 60) return { band: 7, message: 'Good job! Focus on improving accuracy.' };
      if (score >= 50) return { band: 6, message: 'Fair attempt. Review the transcript.' };
      return { band: 5, message: 'Need more practice. Try again.' };
    };
    
    const feedback = getFeedback();
    
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Headphones className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Practice Complete!</h2>
          <div className="text-5xl font-bold gradient-text mb-2">{Math.round(score)}%</div>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Band Score: {feedback.band}</div>
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
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
          <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary-500" />
          <span className="text-sm font-semibold">Listen carefully</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>
      
      {/* Audio Player */}
      <Card>
        <CardBody className="p-6">
          <audio ref={audioRef} src={question.audioUrl} onEnded={() => setIsPlaying(false)} />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Audio Recording</p>
                <p className="text-xs text-gray-500">Listen to the audio and answer the question</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Volume2 className="w-5 h-5" />
              </button>
              <Button size="sm" variant="outline" onClick={() => setShowTranscript(true)}>
                View Transcript
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Question */}
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {question.text}
          </h3>
          
          {question.type === 'mcq' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                    answers[question.id] === option
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {question.type === 'fill_blank' && (
            <Input
              placeholder="Type your answer here..."
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}
        </CardBody>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button 
          variant="primary" 
          onClick={handleNext}
          disabled={!answers[question.id]}
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </Button>
      </div>
      
      {/* Transcript Modal */}
      <Modal isOpen={showTranscript} onClose={() => setShowTranscript(false)} title="Audio Transcript" size="lg">
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{question.transcript}</p>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setShowTranscript(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};