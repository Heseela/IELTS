'use client';

import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Clock, Award, TrendingUp, Play, BarChart, FileText, CheckCircle, AlertCircle, BookOpen, Target, Zap } from 'lucide-react';
import { mockTests, mockAttempts } from '@/data/mockData';
import { MockTest } from '@/types';

interface TestWithStats extends MockTest {
  attempts?: number;
  bestScore?: number;
  averageBand?: number;
}

const testsWithStats: TestWithStats[] = mockTests.map(test => {
  const attempts = mockAttempts.filter(a => a.mock_test_id === test.id);
  const scores = attempts.map(a => a.band_score);
  const averageBand = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  
  return {
    ...test,
    attempts: attempts.length,
    bestScore: Math.max(...scores, 0),
    averageBand: averageBand,
  };
});

export default function MockTestsPage() {
  const [selectedTest, setSelectedTest] = useState<TestWithStats | null>(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const totalTestsTaken = mockAttempts.length;
  const averageOverallBand = mockAttempts.reduce((sum, a) => sum + a.band_score, 0) / totalTestsTaken || 0;
  const bestBand = Math.max(...mockAttempts.map(a => a.band_score), 0);
  
  const handleStartTest = (test: TestWithStats) => {
    setSelectedTest(test);
    setShowInstructions(true);
  };
  
  const confirmStart = () => {
    setShowInstructions(false);
    setShowStartModal(true);
    setTimeout(() => {
      setShowStartModal(false);
      alert(`Starting ${selectedTest?.title}...`);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">IELTS Mock Tests</h1>
          <p className="text-gray-300">Simulate the real exam experience with our authentic mock tests</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Tests Taken</p>
                  <p className="text-2xl font-bold text-gray-100">{totalTestsTaken}</p>
                </div>
                <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Average Band</p>
                  <p className="text-2xl font-bold text-gray-100">{averageOverallBand.toFixed(1)}</p>
                </div>
                <div className="w-10 h-10 bg-secondary-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary-600" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Best Band</p>
                  <p className="text-2xl font-bold text-success-600">{bestBand.toFixed(1)}</p>
                </div>
                <div className="w-10 h-10 bg-success-900 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-success-600" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-100">160</p>
                </div>
                <div className="w-10 h-10 bg-warning-900 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-warning-600" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Available Mock Tests</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Recommended
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testsWithStats.map((test) => (
              <Card key={test.id} hover>
                <div className={`h-1 rounded-t-xl ${test.type === 'academic' ? 'bg-primary-500' : 'bg-secondary-500'}`}></div>
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        test.type === 'academic' 
                          ? 'bg-primary-900 text-primary-300' 
                          : 'bg-secondary-900 text-secondary-300'
                      }`}>
                        {test.type.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-gray-100 mt-2">{test.title}</h3>
                    </div>
                    {test.attempts && test.attempts > 0 && (
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Best Score</div>
                        <div className="text-xl font-bold text-primary-600">{test.bestScore?.toFixed(1)}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{test.duration} min</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Award className="w-4 h-4 mr-1" />
                      <span>{test.total_marks} marks</span>
                    </div>
                    {test.attempts && test.attempts > 0 && (
                      <div className="flex items-center text-gray-400">
                        <BarChart className="w-4 h-4 mr-1" />
                        <span>{test.attempts} attempts</span>
                      </div>
                    )}
                  </div>
                  
                  {test.attempts && test.attempts > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Average Band: {test.averageBand?.toFixed(1)}</span>
                        <span>Target: 7.5</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-linear-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full"
                          style={{ width: `${(test.averageBand || 0) / 9 * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant={test.attempts && test.attempts > 0 ? 'primary' : 'outline'} 
                    className="w-full"
                    onClick={() => handleStartTest(test)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {test.attempts && test.attempts > 0 ? 'Retake Test' : 'Start Test'}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Attempts */}
        {mockAttempts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Recent Attempts</h2>
            <div className="space-y-4">
              {mockAttempts.map((attempt) => {
                const test = testsWithStats.find(t => t.id === attempt.mock_test_id);
                return (
                  <Card key={attempt.id}>
                    <CardBody className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              test?.type === 'academic' 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'bg-secondary-100 text-secondary-700'
                            }`}>
                              {test?.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(attempt.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-100">{test?.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Score</p>
                            <p className="text-xl font-bold text-gray-100">
                              {attempt.score}/{test?.total_marks}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Band Score</p>
                            <p className="text-2xl font-bold text-primary-600">{attempt.band_score.toFixed(1)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Time Spent</p>
                            <p className="text-sm font-semibold text-gray-300">
                              {Math.floor((new Date(attempt.submitted_at).getTime() - new Date(attempt.started_at).getTime()) / 60000)} min
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        
        <Modal isOpen={showInstructions} onClose={() => setShowInstructions(false)} title="Test Instructions" size="lg">
          {selectedTest && (
            <div className="space-y-4">
              <div className="p-4 bg-primary-950 rounded-lg">
                <h3 className="font-semibold text-gray-100 mb-2">{selectedTest.title}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-primary-500" />
                    {selectedTest.duration} minutes
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-primary-500" />
                    {selectedTest.total_marks} marks
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-100 mb-2">Important Instructions:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success-500 mr-2 mt-0.5" />
                    <span>The test consists of 4 sections: Listening, Reading, Writing, and Speaking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success-500 mr-2 mt-0.5" />
                    <span>Total duration is {selectedTest.duration} minutes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success-500 mr-2 mt-0.5" />
                    <span>Read each question carefully before answering</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success-500 mr-2 mt-0.5" />
                    <span>You can navigate between sections during the test</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-warning-500 mr-2 mt-0.5" />
                    <span>Ensure you have a stable internet connection</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-warning-500 mr-2 mt-0.5" />
                    <span>Do not refresh the page during the test</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowInstructions(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={confirmStart}>
                  I Understand, Start Test
                </Button>
              </div>
            </div>
          )}
        </Modal>
        
        <Modal isOpen={showStartModal} onClose={() => setShowStartModal(false)} title="Starting Test" size="sm">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Play className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Preparing your test...</h3>
            <p className="text-sm text-gray-500">Please wait while we set up your test environment</p>
          </div>
        </Modal>
      </div>
    </div>
  );
}