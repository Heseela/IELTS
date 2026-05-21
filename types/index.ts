export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'student' | 'admin' | 'teacher';
    avatar: string;
    phone: string;
    country: string;
    created_at: Date;
  }
  
  export interface Plan {
    id: number;
    name: string;
    price: number;
    duration: number; // in days
    features: string[];
  }
  
  export interface Subscription {
    id: number;
    user_id: number;
    plan_id: number;
    start_date: Date;
    end_date: Date;
    status: 'active' | 'expired' | 'cancelled';
    payment_status: 'paid' | 'pending' | 'failed';
  }
  
  // Course Structure
  export interface Course {
    id: number;
    title: string;
    description: string;
    type: 'listening' | 'reading' | 'writing' | 'speaking' | 'academic' | 'general';
    thumbnail: string;
    created_by: number;
    created_at: Date;
  }
  
  export interface Lesson {
    id: number;
    course_id: number;
    title: string;
    content: string;
    video_url: string;
    duration: number;
    order_no: number;
    created_at: Date;
  }
  
  // Question Bank
  export interface Question {
    id: number;
    module: 'listening' | 'reading' | 'writing' | 'speaking';
    type: 'mcq' | 'true_false' | 'matching' | 'fill_blank' | 'essay' | 'short_answer';
    difficulty: 'basic' | 'intermediate' | 'advanced';
    question_text: string;
    audio_url?: string;
    passage_text?: string;
    correct_answer: string;
    explanation: string;
    created_by: number;
    created_at: Date;
  }
  
  export interface Option {
    id: number;
    question_id: number;
    option_text: string;
    is_correct: boolean;
  }
  
  // Mock Test System
  export interface MockTest {
    id: number;
    title: string;
    type: 'academic' | 'general';
    duration: number;
    total_marks: number;
    created_by: number;
    created_at: Date;
  }
  
  export interface MockTestQuestion {
    id: number;
    mock_test_id: number;
    question_id: number;
    section: 'listening' | 'reading' | 'writing' | 'speaking';
    order_no: number;
  }
  
  // Test Attempts
  export interface TestAttempt {
    id: number;
    user_id: number;
    mock_test_id: number;
    score: number;
    band_score: number;
    started_at: Date;
    submitted_at: Date;
  }
  
  export interface UserAnswer {
    id: number;
    attempt_id: number;
    question_id: number;
    answer: string;
    is_correct: boolean;
    marks: number;
  }
  
  // Listening Module
  export interface ListeningRecording {
    id: number;
    user_id: number;
    question_id: number;
    audio_url: string;
    transcript: string;
    score: number;
    feedback: string;
    created_at: Date;
  }
  
  export interface ListeningAnswer {
    id: number;
    recording_id: number;
    question_id: number;
    answer: string;
    is_correct: boolean;
    marks: number;
  }
  
  // Reading Module
  export interface ReadingPractice {
    id: number;
    user_id: number;
    passage_text: string;
    title: string;
    score: number;
    started_at: Date;
    completed_at: Date;
  }
  
  export interface ReadingAnswer {
    id: number;
    reading_practice_id: number;
    question_id: number;
    answer: string;
    is_correct: boolean;
    marks: number;
  }
  
  // Writing Module
  export interface WritingSubmission {
    id: number;
    user_id: number;
    question_id: number;
    task_type: 'task1' | 'task2';
    essay_text: string;
    word_count: number;
    grammar_score: number;
    vocabulary_score: number;
    coherence_score: number;
    task_achievement: number;
    estimated_band: number;
    ai_feedback: string;
    teacher_feedback?: string;
    submitted_at: Date;
  }
  
  // Speaking Module
  export interface SpeakingRecording {
    id: number;
    user_id: number;
    question_id: number;
    part: 1 | 2 | 3;
    audio_url: string;
    transcript: string;
    fluency_score: number;
    pronunciation_score: number;
    grammar_score: number;
    vocabulary_score: number;
    coherence_score: number;
    estimated_band: number;
    feedback: string;
    created_at: Date;
  }
  
  // Vocabulary System
  export interface Vocabulary {
    id: number;
    word: string;
    meaning: string;
    example: string;
    synonym: string;
    level: 'basic' | 'intermediate' | 'advanced';
    created_at: Date;
  }
  
  export interface UserVocabulary {
    id: number;
    user_id: number;
    vocabulary_id: number;
    mastered: boolean;
    revision_count: number;
    added_at: Date;
  }
  
  // Payments
  export interface Payment {
    id: number;
    user_id: number;
    subscription_id: number;
    amount: number;
    payment_method: 'credit_card' | 'paypal' | 'bank_transfer';
    transaction_id: string;
    status: 'completed' | 'pending' | 'failed';
    paid_at: Date;
  }
  
  // Notifications
  export interface Notification {
    id: number;
    user_id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: Date;
  }
  
  // Teacher Reviews
  export interface TeacherReview {
    id: number;
    user_id: number;
    submission_id: number;
    module: 'writing' | 'speaking';
    feedback: string;
    score: number;
    reviewed_at: Date;
  }
  
  // Live Classes
  export interface LiveClass {
    id: number;
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    teacher_id: number;
    created_at: Date;
  }
  
  export interface ClassEnrollment {
    id: number;
    user_id: number;
    class_id: number;
    enrolled_at: Date;
    attended: boolean;
  }
  
  // Dashboard Stats
  export interface DashboardStats {
    totalCourses: number;
    completedLessons: number;
    mockTestsTaken: number;
    averageBandScore: number;
    studyStreak: number;
    totalStudyHours: number;
    vocabularyLearned: number;
    writingSubmissions: number;
    speakingPractices: number;
  }