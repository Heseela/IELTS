import React, { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Volume2, Star, CheckCircle, BookOpen } from 'lucide-react';
import { Vocabulary } from '@/types';

interface WordCardProps {
  word: Vocabulary;
}

export const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMastered, setIsMastered] = useState(false);
  
  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };
  
  return (
    <Card hover>
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{word.word}</h3>
              <button 
                onClick={speakWord}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Volume2 className="w-4 h-4 text-primary-500" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{word.meaning}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            word.level === 'basic' ? 'bg-success-100 text-success-700' :
            word.level === 'intermediate' ? 'bg-warning-100 text-warning-700' :
            'bg-primary-100 text-primary-700'
          }`}>
            {word.level}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{word.example}"</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-semibold">Synonym:</span> {word.synonym}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Added to your list</span>
          </div>
          <Button
            size="sm"
            variant={isMastered ? 'outline' : 'primary'}
            onClick={() => setIsMastered(!isMastered)}
          >
            {isMastered ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Mastered
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-1" />
                Mark Mastered
              </>
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};