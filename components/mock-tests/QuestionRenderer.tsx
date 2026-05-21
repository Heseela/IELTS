'use client';

import React, { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Question, Option } from '@/types';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  options?: Option[];
  userAnswer?: string;
  onAnswer: (answer: string) => void;
  showExplanation?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  options = [],
  userAnswer = '',
  onAnswer,
  showExplanation = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const renderQuestionByType = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {options.map((option, idx) => (
              <label
                key={option.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  userAnswer === option.option_text
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.option_text}
                  checked={userAnswer === option.option_text}
                  onChange={(e) => onAnswer(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300">
                  {String.fromCharCode(65 + idx)}. {option.option_text}
                </span>
              </label>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="flex gap-4">
            {['True', 'False', 'Not Given'].map((option) => (
              <label
                key={option}
                className={`flex items-center p-3 px-6 border rounded-lg cursor-pointer transition-all ${
                  userAnswer === option
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswer(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'fill_blank':
        return (
          <Input
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => onAnswer(e.target.value)}
            className="text-lg"
          />
        );

      case 'short_answer':
        return (
          <TextArea
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => onAnswer(e.target.value)}
            rows={4}
          />
        );

      case 'essay':
        return (
          <TextArea
            placeholder="Write your essay here..."
            value={userAnswer}
            onChange={(e) => onAnswer(e.target.value)}
            rows={12}
            className="font-mono"
          />
        );

      case 'matching':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Match the items in List A with List B. Type the corresponding letter.
            </p>
            <Input
              placeholder="Your answer (e.g., 1-A, 2-B, 3-C)"
              value={userAnswer}
              onChange={(e) => onAnswer(e.target.value)}
            />
          </div>
        );

      default:
        return (
          <Input
            placeholder="Your answer"
            value={userAnswer}
            onChange={(e) => onAnswer(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Audio Player for Listening Questions */}
      {question.audio_url && (
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Audio Recording</p>
                  <p className="text-xs text-gray-500">Listen carefully to answer the question</p>
                </div>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Passage for Reading Questions */}
      {question.passage_text && (
        <Card>
          <CardBody className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Reading Passage</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{question.passage_text}</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Question Text */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Question
        </h4>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {question.question_text}
        </p>
      </div>

      {/* Answer Area */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Your Answer
        </h4>
        {renderQuestionByType()}
      </div>

      {/* Explanation */}
      {showExplanation && userAnswer && (
        <Card className="border-l-4 border-l-primary-500">
          <CardBody className="p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Explanation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{question.explanation}</p>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm">
                <span className="font-semibold text-green-600">Correct Answer:</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{question.correct_answer}</span>
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};