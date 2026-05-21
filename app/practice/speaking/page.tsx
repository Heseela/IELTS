'use client';

import React, { useState, useRef } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff, Play, Square, Download, Clock, Volume2, Loader2, CheckCircle } from 'lucide-react';

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

const speakingQuestions: SpeakingQuestion[] = [
  {
    id: 1,
    part: 1,
    text: "Tell me about your hometown.",
    description: "Where is it located? What is it known for? Do you like living there?",
    speakingTime: 60,
  },
  {
    id: 2,
    part: 2,
    text: "Describe a memorable trip you have taken.",
    description: "You should say:",
    cueCard: "• Where you went\n• Who you went with\n• What you did\n• And explain why it was memorable",
    preparationTime: 60,
    speakingTime: 120,
  },
  {
    id: 3,
    part: 3,
    text: "Let's talk about travel and tourism.",
    description: "How has tourism changed in recent years? What are the environmental impacts of tourism?",
    speakingTime: 180,
    followUpQuestions: [
      "Do you think travel broadens the mind?",
      "What are the advantages and disadvantages of domestic versus international travel?",
      "How will technology affect travel in the future?"
    ],
  },
];

export default function SpeakingPracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);
  const [speakingTimeLeft, setSpeakingTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const question = speakingQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === speakingQuestions.length - 1;
  
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
        
        // Stop all tracks
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
  
  const playRecording = () => {
    if (recordedAudio && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const handleSubmit = async () => {
    setIsTranscribing(true);
    // Simulate AI transcription and analysis
    setTimeout(() => {
      setTranscript("This is a simulated transcript of your speaking response. In a real implementation, this would use speech recognition to transcribe your audio and provide detailed feedback on fluency, pronunciation, grammar, and vocabulary.");
      setIsTranscribing(false);
      setSubmitted(true);
    }, 3000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getFeedback = () => {
    const feedback = {
      fluency: Math.floor(Math.random() * 30) + 70,
      pronunciation: Math.floor(Math.random() * 30) + 70,
      grammar: Math.floor(Math.random() * 30) + 70,
      vocabulary: Math.floor(Math.random() * 30) + 70,
      coherence: Math.floor(Math.random() * 30) + 70,
      estimatedBand: (Math.random() * 3 + 5.5).toFixed(1),
      suggestions: [
        "Try to reduce hesitations and use more connecting words",
        "Work on pronouncing 'th' sounds more clearly",
        "Use more varied sentence structures",
        "Incorporate some idiomatic language",
      ],
    };
    return feedback;
  };
  
  if (submitted) {
    const feedback = getFeedback();
    const averageScore = (feedback.fluency + feedback.pronunciation + feedback.grammar + feedback.vocabulary + feedback.coherence) / 5;
    
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Speaking Feedback</CardTitle>
              <CardDescription>AI-powered analysis of your speaking response</CardDescription>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Score Overview */}
              <div className="gradient-bg rounded-xl p-6 text-white text-center">
                <div className="text-5xl font-bold mb-2">{feedback.estimatedBand}</div>
                <div className="text-sm opacity-90">Estimated Band Score</div>
              </div>
              
              {/* Scores Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-3 bg-gray-800 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary-600">{feedback.fluency}%</div>
                  <div className="text-xs text-gray-400">Fluency</div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg text-center">
                  <div className="text-xl font-bold text-secondary-600">{feedback.pronunciation}%</div>
                  <div className="text-xs text-gray-400">Pronunciation</div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg text-center">
                  <div className="text-xl font-bold text-success-600">{feedback.grammar}%</div>
                  <div className="text-xs text-gray-400">Grammar</div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg text-center">
                  <div className="text-xl font-bold text-warning-600">{feedback.vocabulary}%</div>
                  <div className="text-xs text-gray-400">Vocabulary</div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg text-center">
                  <div className="text-xl font-bold text-danger-600">{feedback.coherence}%</div>
                  <div className="text-xs text-gray-400">Coherence</div>
                </div>
              </div>
              
              {/* Transcript */}
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-3">Transcript</h3>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-300 leading-relaxed">{transcript}</p>
                </div>
              </div>
              
              {/* Suggestions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-3">Suggestions for Improvement</h3>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Volume2 className="w-5 h-5 text-primary-500 mt-0.5" />
                      <span className="text-gray-300">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Actions */}
              <div className="flex gap-4 justify-end pt-4">
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Record Again
                </Button>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  Practice Another Question
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
  
  if (isPreparing) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-linear-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Clock className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Prepare Your Answer</h2>
          <p className="text-gray-400 mb-4">You have {formatTime(prepTimeLeft)} to prepare</p>
          <div className="w-48 h-2 bg-gray-700 rounded-full mx-auto">
            <div 
              className="bg-linear-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(prepTimeLeft / (question.preparationTime || 1)) * 100}%` }}
            />
          </div>
          {question.cueCard && (
            <Card className="mt-8 max-w-md">
              <CardBody>
                <h3 className="font-semibold text-gray-100 mb-3">Cue Card</h3>
                <pre className="text-gray-300 whitespace-pre-wrap font-sans">
                  {question.cueCard}
                </pre>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    );
  }
  
  if (isRecording) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 bg-danger-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Mic className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-danger-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Recording Your Answer</h2>
          <p className="text-gray-400 mb-4">Speaking time remaining: {formatTime(speakingTimeLeft)}</p>
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto">
            <div 
              className="bg-danger-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(speakingTimeLeft / question.speakingTime) * 100}%` }}
            />
          </div>
          <Button 
            variant="danger" 
            className="mt-6"
            onClick={stopRecording}
          >
            <Square className="w-4 h-4 mr-2" />
            Stop Recording
          </Button>
        </div>
      </div>
    );
  }
  
  if (recordedAudio) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom max-w-2xl">
          <Card>
            <CardBody className="p-8 text-center">
              <div className="w-24 h-24 bg-success-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-success-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Recording Complete!</h2>
              
              {/* Audio Player */}
              <div className="mb-6">
                <audio ref={audioRef} src={recordedAudio} onEnded={() => setIsPlaying(false)} className="hidden" />
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="primary" onClick={playRecording} disabled={isPlaying}>
                    <Play className="w-4 h-4 mr-2" />
                    Play Recording
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
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
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <Card>
          <CardBody className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-primary-900 text-primary-300 rounded-full text-sm font-semibold">
                  Part {question.part}
                </span>
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {speakingQuestions.length}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                {question.text}
              </h2>
              
              {question.description && (
                <p className="text-gray-300 mb-4">
                  {question.description}
                </p>
              )}
              
              {question.cueCard && (
                <div className="p-4 bg-gray-800 rounded-lg mb-4">
                  <pre className="text-gray-300 whitespace-pre-wrap font-sans">
                    {question.cueCard}
                  </pre>
                </div>
              )}
              
              {question.followUpQuestions && (
                <div className="space-y-2">
                  <p className="font-semibold text-gray-100">Follow-up questions:</p>
                  <ul className="list-disc list-inside text-gray-300">
                    {question.followUpQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
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
                onClick={() => setCurrentQuestion(Math.min(speakingQuestions.length - 1, currentQuestion + 1))}
                disabled={isLastQuestion}
              >
                Next
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}