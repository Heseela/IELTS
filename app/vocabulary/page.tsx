'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { VocabularyList } from '@/components/vocabulary/VocabularyList';
import { WordCard } from '@/components/vocabulary/WordCard';
import { Search, BookOpen, TrendingUp, Award, Sparkles, Filter, Plus } from 'lucide-react';
import { mockVocabulary } from '@/data/mockData';

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards');
  
  const levels = ['all', 'basic', 'intermediate', 'advanced'];
  
  const filteredWords = mockVocabulary.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || word.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });
  
  const stats = {
    total: mockVocabulary.length,
    mastered: 12,
    learning: 25,
    streak: 7,
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Vocabulary Builder</h1>
          <p className="text-gray-300">Expand your IELTS vocabulary with daily practice</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Words</p>
                  <p className="text-2xl font-bold text-gray-100">{stats.total}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary-500" />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Mastered</p>
                  <p className="text-2xl font-bold text-success-600">{stats.mastered}</p>
                </div>
                <Award className="w-8 h-8 text-success-500" />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Learning</p>
                  <p className="text-2xl font-bold text-warning-600">{stats.learning}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-warning-500" />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Day Streak</p>
                  <p className="text-2xl font-bold text-secondary-600">{stats.streak}</p>
                </div>
                <Sparkles className="w-8 h-8 text-secondary-500" />
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardBody className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon={Search}
                  placeholder="Search words by word or meaning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Filter className="w-5 h-5 text-gray-500 self-center" />
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'cards' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                >
                  Cards
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Words Display */}
        {filteredWords.length > 0 ? (
          viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWords.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <VocabularyList words={filteredWords} />
          )
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">No words found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Practice Button */}
        <div className="fixed bottom-8 right-8">
          <Button variant="primary" className="shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Practice Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}