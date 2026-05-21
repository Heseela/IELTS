import React, { useState } from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Volume2, CheckCircle, Star } from 'lucide-react';
import { Vocabulary } from '@/types';

interface VocabularyListProps {
  words: Vocabulary[];
}

export const VocabularyList: React.FC<VocabularyListProps> = ({ words }) => {
  const [masteredWords, setMasteredWords] = useState<number[]>([]);
  
  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };
  
  const toggleMastered = (wordId: number) => {
    if (masteredWords.includes(wordId)) {
      setMasteredWords(masteredWords.filter(id => id !== wordId));
    } else {
      setMasteredWords([...masteredWords, wordId]);
    }
  };
  
  return (
    <Card>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Word</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Meaning</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {words.map((word) => (
                <tr key={word.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-100">{word.word}</span>
                      <button onClick={() => speakWord(word.word)} className="text-primary-500 hover:text-primary-600">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{word.meaning}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 italic">{word.example}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      word.level === 'basic' ? 'bg-success-100 text-success-700' :
                      word.level === 'intermediate' ? 'bg-warning-100 text-warning-700' :
                      'bg-primary-100 text-primary-700'
                    }`}>
                      {word.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      size="sm"
                      variant={masteredWords.includes(word.id) ? 'outline' : 'primary'}
                      onClick={() => toggleMastered(word.id)}
                    >
                      {masteredWords.includes(word.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mastered
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4 mr-1" />
                          Mark
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};