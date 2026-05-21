'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Play, Pause, Volume2, VolumeX, Download, CheckCircle, XCircle, Headphones, Clock, Award } from 'lucide-react';

interface ListeningQuestion {
  id: number;
  type: 'mcq' | 'fill_blank' | 'matching';
  text: string;
  options?: string[];
  correctAnswer: string;
  audioUrl: string;
  transcript: string;
}

const mockQuestions: ListeningQuestion[] = [
  {
    id: 1,
    type: 'mcq',
    text: 'What is the main topic of the lecture?',
    options: ['Climate Change', 'Renewable Energy', 'Ocean Conservation', 'Urban Planning'],
    correctAnswer: 'Ocean Conservation',
    audioUrl: '/audio/lecture1.mp3',
    transcript: 'The speaker discusses the importance of protecting our oceans...',
  },
  {
    id: 2,
    type: 'fill_blank',
    text: 'The speaker mentions that _______ is the biggest threat to marine life.',
    correctAnswer: 'plastic pollution',
    audioUrl: '/audio/lecture2.mp3',
    transcript: 'Plastic pollution has become the biggest threat to marine ecosystems...',
  },
];

export default function ListeningPracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);
  
  const question = mockQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === mockQuestions.length - 1;
  
  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer });
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
      setSubmitted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    mockQuestions.forEach(q => {
      if (answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase()) {
        correct++;
      }
    });
    setScore((correct / mockQuestions.length) * 100);
  };
  
  const getScoreBand = () => {
    if (score >= 90) return { band: 9, feedback: 'Excellent! You have mastered listening skills.' };
    if (score >= 80) return { band: 8, feedback: 'Very good! Keep practicing to reach band 9.' };
    if (score >= 70) return { band: 7, feedback: 'Good job! Focus on improving your accuracy.' };
    if (score >= 60) return { band: 6, feedback: 'Fair attempt. Practice more to improve.' };
    return { band: 5, feedback: 'Need more practice. Review the transcript and try again.' };
  };
  
  if (submitted) {
    const { band, feedback } = getScoreBand();
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom max-w-3xl">
          <Card>
            <CardBody className="p-8 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Practice Complete!</h2>
              <div className="text-6xl font-bold gradient-text mb-4">{Math.round(score)}%</div>
              <div className="text-2xl font-semibold text-gray-300 mb-2">Band Score: {band}</div>
              <p className="text-gray-400 mb-6">{feedback}</p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Practice Again
                </Button>
                <Button variant="outline">View Detailed Report</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-100">Listening Practice</h1>
            <div className="flex items-center space-x-2">
              <Headphones className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-linear-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Audio Player */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-linear-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <div>
                  <p className="text-sm font-semibold text-gray-300">Audio Recording</p>
                  <p className="text-xs text-gray-400">Listen carefully to answer the question</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <Button size="sm" variant="outline" onClick={() => setShowTranscript(true)}>
                  View Transcript
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Question */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">{question.text}</h3>
            
            {question.type === 'mcq' && (
              <div className="space-y-3">
                {question.options?.map((option, idx) => (
                  <label key={idx} className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-300">{option}</span>
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
            <p className="text-gray-300 leading-relaxed">{question.transcript}</p>
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => setShowTranscript(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}