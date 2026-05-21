'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BookOpen, Clock, AlertCircle, CheckCircle, Search, Highlighter, ZoomIn } from 'lucide-react';

interface ReadingQuestion {
  id: number;
  type: 'mcq' | 'true_false' | 'matching' | 'fill_blank';
  text: string;
  options?: string[];
  correctAnswer: string;
}

interface ReadingPassage {
  id: number;
  title: string;
  passage: string;
  questions: ReadingQuestion[];
  timeLimit: number;
}

const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    title: "The Impact of Climate Change on Marine Life",
    passage: `Climate change is having a profound impact on marine ecosystems around the world. Rising ocean temperatures are causing coral bleaching, which threatens the survival of countless species that depend on coral reefs for habitat and food. Additionally, ocean acidification, caused by increased absorption of carbon dioxide, is making it difficult for shellfish and other organisms to build their skeletons and shells.

    Scientists have observed significant changes in migration patterns of marine species as they seek cooler waters. This disruption affects the entire food chain, from plankton to large predators. Furthermore, rising sea levels are destroying coastal habitats, including mangrove forests and salt marshes, which serve as crucial nursery grounds for many fish species.

    The economic implications are equally concerning. The fishing industry, which supports millions of livelihoods worldwide, is facing unprecedented challenges as fish stocks decline and shift location. Tourism-dependent coastal communities are also suffering as coral reefs, a major attraction for divers and snorkelers, continue to deteriorate.`,
    questions: [
      {
        id: 1,
        type: 'true_false',
        text: 'Ocean acidification helps shellfish build stronger shells.',
        correctAnswer: 'False'
      },
      {
        id: 2,
        type: 'mcq',
        text: 'According to the passage, what is causing coral bleaching?',
        options: ['Ocean acidification', 'Rising sea levels', 'Rising ocean temperatures', 'Changes in migration patterns'],
        correctAnswer: 'Rising ocean temperatures'
      },
      {
        id: 3,
        type: 'fill_blank',
        text: 'The fishing industry supports millions of _______ worldwide.',
        correctAnswer: 'livelihoods'
      }
    ],
    timeLimit: 20
  },
  {
    id: 2,
    title: "The Future of Renewable Energy",
    passage: `Renewable energy technologies have advanced dramatically in recent years. Solar power has become increasingly cost-effective, with photovoltaic cell efficiency reaching record highs. Wind energy has also seen remarkable growth, with offshore wind farms now capable of powering millions of homes.

    Despite these advances, challenges remain. Energy storage continues to be a significant hurdle, as renewable sources are intermittent by nature. However, new battery technologies and pumped hydro storage solutions are showing promise. Grid infrastructure also requires substantial upgrades to handle distributed generation from renewable sources.

    Government policies play a crucial role in accelerating the transition to renewable energy. Subsidies, tax incentives, and carbon pricing mechanisms have proven effective in many countries. International cooperation is also essential, as climate change is a global problem requiring coordinated action.`,
    questions: [
      {
        id: 4,
        type: 'true_false',
        text: 'Solar power has become less cost-effective in recent years.',
        correctAnswer: 'False'
      },
      {
        id: 5,
        type: 'mcq',
        text: 'What is described as a significant challenge for renewable energy?',
        options: ['Government policies', 'Energy storage', 'International cooperation', 'Wind farm locations'],
        correctAnswer: 'Energy storage'
      },
      {
        id: 6,
        type: 'fill_blank',
        text: 'Grid infrastructure needs substantial _______ to handle renewable energy.',
        correctAnswer: 'upgrades'
      }
    ],
    timeLimit: 20
  }
];

export default function ReadingPracticePage() {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(readingPassages[0].timeLimit * 60);
  const [isTiming, setIsTiming] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  
  const passage = readingPassages[currentPassageIndex];
  const isLastPassage = currentPassageIndex === readingPassages.length - 1;
  
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
    setSubmitted(true);
  };
  
  const handleNextPassage = () => {
    if (isLastPassage) {
      handleSubmit();
    } else {
      setCurrentPassageIndex(currentPassageIndex + 1);
      setTimeLeft(readingPassages[currentPassageIndex + 1].timeLimit * 60);
      setIsTiming(true);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    readingPassages.forEach(passage => {
      passage.questions.forEach(question => {
        if (answers[question.id]?.toLowerCase() === question.correctAnswer.toLowerCase()) {
          correct++;
        }
      });
    });
    const totalQuestions = readingPassages.reduce((sum, p) => sum + p.questions.length, 0);
    return (correct / totalQuestions) * 100;
  };
  
  const getScoreBand = (score: number) => {
    if (score >= 90) return { band: 9, feedback: 'Excellent! You have exceptional reading comprehension skills.' };
    if (score >= 80) return { band: 8, feedback: 'Very good! You demonstrate strong reading abilities.' };
    if (score >= 70) return { band: 7, feedback: 'Good job! Focus on skimming and scanning techniques.' };
    if (score >= 60) return { band: 6, feedback: 'Fair attempt. Practice more with timed readings.' };
    return { band: 5, feedback: 'Need more practice. Work on vocabulary and reading speed.' };
  };
  
  const handleTextHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setHighlightedText(selection.toString());
      setShowHighlight(true);
      setTimeout(() => setShowHighlight(false), 3000);
    }
  };
  
  if (submitted) {
    const score = calculateScore();
    const { band, feedback } = getScoreBand(score);
    const totalQuestions = readingPassages.reduce((sum, p) => sum + p.questions.length, 0);
    const correctCount = readingPassages.reduce((sum, p) => 
      sum + p.questions.filter(q => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase()).length, 0);
    
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom max-w-3xl">
          <Card>
            <CardBody className="p-8 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Reading Practice Complete!</h2>
              <div className="text-6xl font-bold gradient-text mb-4">{Math.round(score)}%</div>
              <div className="text-2xl font-semibold text-gray-300 mb-2">Band Score: {band}</div>
              <p className="text-gray-400 mb-4">
                You answered {correctCount} out of {totalQuestions} questions correctly.
              </p>
              <p className="text-gray-400 mb-6">{feedback}</p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Practice Again
                </Button>
                <Button variant="outline">View Detailed Answers</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
  
  if (!isTiming) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom max-w-4xl">
          <Card>
            <CardBody className="p-8 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">{passage.title}</h2>
              <p className="text-gray-400 mb-6">
                You will have {passage.timeLimit} minutes to read the passage and answer {passage.questions.length} questions.
              </p>
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{passage.questions.length}</div>
                  <div className="text-sm text-gray-500">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">{passage.timeLimit}</div>
                  <div className="text-sm text-gray-500">Minutes</div>
                </div>
              </div>
              <Button variant="primary" size="lg" onClick={handleStart}>
                Start Reading
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">{passage.title}</h1>
            <p className="text-sm text-gray-400">Passage {currentPassageIndex + 1} of {readingPassages.length}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-500" />
              <span className={`text-xl font-bold ${timeLeft < 60 ? 'text-danger-500' : 'text-gray-300'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-warning-500" />
              <span className="text-sm text-gray-400">
                {Object.keys(answers).length} / {passage.questions.length} answered
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Reading Passage */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reading Passage</CardTitle>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleTextHighlight}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Highlighter className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="prose-invert max-w-none">
                {passage.passage.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              {showHighlight && (
                <div className="mt-4 p-3 bg-primary-950 rounded-lg animate-fade-in">
                  <p className="text-sm text-primary-300">
                    <strong>Highlighted:</strong> {highlightedText}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
          
          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Answer all questions based on the passage</CardDescription>
            </CardHeader>
            <CardBody className="space-y-6">
              {passage.questions.map((question, idx) => (
                <div key={question.id} className="pb-4 border-b border-gray-700 last:border-0">
                  <p className="font-semibold text-gray-100 mb-3">
                    {idx + 1}. {question.text}
                  </p>
                  
                  {question.type === 'true_false' && (
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`q${question.id}`}
                          value="True"
                          checked={answers[question.id] === 'True'}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="mr-2"
                        />
                        <span>True</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`q${question.id}`}
                          value="False"
                          checked={answers[question.id] === 'False'}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="mr-2"
                        />
                        <span>False</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`q${question.id}`}
                          value="Not Given"
                          checked={answers[question.id] === 'Not Given'}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="mr-2"
                        />
                        <span>Not Given</span>
                      </label>
                    </div>
                  )}
                  
                  {question.type === 'mcq' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => (
                        <label key={optIdx} className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name={`q${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleAnswer(question.id, e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'fill_blank' && (
                    <Input
                      placeholder="Type your answer..."
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPassageIndex(Math.max(0, currentPassageIndex - 1))}
                  disabled={currentPassageIndex === 0}
                >
                  Previous Passage
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextPassage}
                >
                  {isLastPassage ? 'Submit All' : 'Next Passage'}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}