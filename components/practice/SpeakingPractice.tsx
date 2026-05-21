'use client';

import React, { useState, useRef } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Mic, MicOff, Play, Square, Download, Clock, Award, Volume2, Loader2, CheckCircle } from 'lucide-react';

interface SpeakingQuestion {
  id: number;
  part: 1 | 2 | 3;
  text: string;
  description?: string;
  preparationTime?: number;
  speakingTime: number;
  cueCard?: string;
  followUpQuestions?: string[];
}

interface SpeakingPracticeProps {
  questions: SpeakingQuestion[];
  onComplete?: (recording: string, feedback: any) => void;
}

export const SpeakingPractice: React.FC<SpeakingPracticeProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);
  const [speakingTimeLeft, setSpeakingTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPreparing && prepTimeLeft > 0) {
      timer = setInterval(() => {
        setPrepTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPreparing && prepTimeLeft === 0) {
      setIsPreparing(false);
      startRecording();
    }
    
    if (isRecording && speakingTimeLeft > 0) {
      timer = setInterval(() => {
        setSpeakingTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRecording && speakingTimeLeft === 0) {
      stopRecording();
    }
    
    return () => clearInterval(timer);
  }, [isPreparing, prepTimeLeft, isRecording, speakingTimeLeft]);
  
  const startPreparation = () => {
    if (question.preparationTime) {
      setPrepTimeLeft(question.preparationTime);
      setIsPreparing(true);
    } else {
      startRecording();
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setSpeakingTimeLeft(question.speakingTime);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please allow microphone access to practice speaking.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleSubmit = async () => {
    setIsTranscribing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const generatedFeedback = {
        fluency: Math.floor(Math.random() * 30) + 70,
        pronunciation: Math.floor(Math.random() * 30) + 70,
        grammar: Math.floor(Math.random() * 30) + 70,
        vocabulary: Math.floor(Math.random() * 30) + 70,
        coherence: Math.floor(Math.random() * 30) + 70,
        estimatedBand: (Math.random() * 3 + 5.5).toFixed(1),
        transcript: "This is a simulated transcript of your speaking response. The AI analyzes your fluency, pronunciation, grammar, vocabulary, and coherence to provide detailed feedback.",
        suggestions: [
          "Try to reduce hesitations and use more connecting words",
          "Work on pronouncing 'th' sounds more clearly",
          "Use more varied sentence structures",
          "Incorporate some idiomatic language",
        ],
      };
      setFeedback(generatedFeedback);
      setIsTranscribing(false);
      setSubmitted(true);
      if (onComplete) onComplete(recordedAudio || '', generatedFeedback);
    }, 3000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (submitted && feedback) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Speaking Feedback</CardTitle>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="gradient-bg rounded-xl p-6 text-white text-center">
            <div className="text-5xl font-bold mb-2">{feedback.estimatedBand}</div>
            <div className="text-sm opacity-90">Estimated Band Score</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-xl font-bold text-primary-600">{feedback.fluency}%</div>
              <div className="text-xs text-gray-600">Fluency</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-xl font-bold text-secondary-600">{feedback.pronunciation}%</div>
              <div className="text-xs text-gray-600">Pronunciation</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-xl font-bold text-green-600">{feedback.grammar}%</div>
              <div className="text-xs text-gray-600">Grammar</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-xl font-bold text-yellow-600">{feedback.vocabulary}%</div>
              <div className="text-xs text-gray-600">Vocabulary</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-xl font-bold text-purple-600">{feedback.coherence}%</div>
              <div className="text-xs text-gray-600">Coherence</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Transcript</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 leading-relaxed">{feedback.transcript}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggestions for Improvement</h3>
            <ul className="space-y-2">
              {feedback.suggestions.map((suggestion: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <Volume2 className="w-5 h-5 text-primary-500 mt-0.5" />
                  <span className="text-gray-600">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Practice Another Question
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  if (isPreparing) {
    return (
      <div className="text-center py-12">
        <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Clock className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Prepare Your Answer</h2>
        <p className="text-gray-600 mb-4">You have {formatTime(prepTimeLeft)} to prepare</p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(prepTimeLeft / (question.preparationTime || 1)) * 100}%` }}
          />
        </div>
        {question.cueCard && (
          <Card className="mt-8 max-w-md mx-auto">
            <CardBody>
              <h3 className="font-semibold text-gray-800 mb-3">Cue Card</h3>
              <pre className="text-gray-600 whitespace-pre-wrap font-sans">
                {question.cueCard}
              </pre>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
  
  if (isRecording) {
    return (
      <div className="text-center py-12">
        <div className="relative">
          <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Mic className="w-16 h-16 text-white" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recording Your Answer</h2>
        <p className="text-gray-600 mb-4">Speaking time remaining: {formatTime(speakingTimeLeft)}</p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(speakingTimeLeft / question.speakingTime) * 100}%` }}
          />
        </div>
        <Button variant="danger" className="mt-6" onClick={stopRecording}>
          <Square className="w-4 h-4 mr-2" />
          Stop Recording
        </Button>
      </div>
    );
  }
  
  if (recordedAudio) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recording Complete!</h2>
          
          <div className="mb-6">
            <audio controls src={recordedAudio} className="w-full max-w-md mx-auto" />
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => {
              setRecordedAudio(null);
              startRecording();
            }}>
              Record Again
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={isTranscribing}>
              {isTranscribing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Submit for Feedback'
              )}
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardBody className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Part {question.part}
            </span>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{question.text}</h2>
          
          {question.description && (
            <p className="text-gray-600 mb-4">{question.description}</p>
          )}
          
          {question.cueCard && (
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <pre className="text-gray-600 whitespace-pre-wrap font-sans">
                {question.cueCard}
              </pre>
            </div>
          )}
          
          {question.followUpQuestions && (
            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Follow-up questions:</p>
              <ul className="list-disc list-inside text-gray-600">
                {question.followUpQuestions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">Speaking Time: {question.speakingTime} seconds</div>
            <Button variant="primary" size="lg" onClick={startPreparation}>
              <Mic className="w-5 h-5 mr-2" />
              Start Speaking
            </Button>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            disabled={isLastQuestion}
          >
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};