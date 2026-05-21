import {
    User, Plan, Subscription, Course, Lesson, Question, Option,
    MockTest, MockTestQuestion, TestAttempt, UserAnswer, ListeningRecording,
    ReadingPractice, WritingSubmission, SpeakingRecording, Vocabulary,
    UserVocabulary, Payment, Notification, TeacherReview, LiveClass,
    ClassEnrollment, DashboardStats
  } from '@/types';
  
  // Users
  export const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      password: 'hashed_password',
      role: 'student',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff',
      phone: '+1 234 567 8900',
      country: 'United States',
      created_at: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      password: 'hashed_password',
      role: 'teacher',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=d946ef&color=fff',
      phone: '+1 234 567 8901',
      country: 'Canada',
      created_at: new Date('2024-01-10'),
    },
  ];
  
  // Plans
  export const mockPlans: Plan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      duration: 30,
      features: ['5 Mock Tests', 'Basic Course Access', 'Community Support'],
    },
    {
      id: 2,
      name: 'Pro',
      price: 59,
      duration: 90,
      features: ['Unlimited Mock Tests', 'All Courses', 'AI Feedback', 'Live Classes'],
    },
    {
      id: 3,
      name: 'Premium',
      price: 99,
      duration: 180,
      features: ['Everything in Pro', '1-on-1 Tutoring', 'Teacher Review', 'Certificate'],
    },
  ];
  
  // Subscriptions
  export const mockSubscriptions: Subscription[] = [
    {
      id: 1,
      user_id: 1,
      plan_id: 2,
      start_date: new Date('2024-01-15'),
      end_date: new Date('2024-04-15'),
      status: 'active',
      payment_status: 'paid',
    },
  ];
  
  // Courses
  export const mockCourses: Course[] = [
    {
      id: 1,
      title: 'IELTS Listening Mastery',
      description: 'Master the listening section with real test simulations and expert tips',
      type: 'listening',
      thumbnail: '/api/placeholder/400/300',
      created_by: 2,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 2,
      title: 'Reading Strategies for Band 9',
      description: 'Learn effective reading techniques for IELTS Academic and General',
      type: 'reading',
      thumbnail: '/api/placeholder/400/300',
      created_by: 2,
      created_at: new Date('2024-01-02'),
    },
    {
      id: 3,
      title: 'Writing Task 1 & 2 Workshop',
      description: 'Master both writing tasks with templates and band 9 sample essays',
      type: 'writing',
      thumbnail: '/api/placeholder/400/300',
      created_by: 2,
      created_at: new Date('2024-01-03'),
    },
    {
      id: 4,
      title: 'Speaking Confidence Builder',
      description: 'Build confidence for the speaking section with practice sessions',
      type: 'speaking',
      thumbnail: '/api/placeholder/400/300',
      created_by: 2,
      created_at: new Date('2024-01-04'),
    },
  ];
  
  // Lessons
  export const mockLessons: Lesson[] = [
    {
      id: 1,
      course_id: 1,
      title: 'Introduction to Listening Section',
      content: 'Learn about the format and question types in IELTS listening',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 45,
      order_no: 1,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 2,
      course_id: 1,
      title: 'Multiple Choice Questions',
      content: 'Strategies for tackling multiple choice questions effectively',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 50,
      order_no: 2,
      created_at: new Date('2024-01-02'),
    },
    {
      id: 3,
      course_id: 1,
      title: 'Map & Plan Labeling',
      content: 'Learn how to follow directions and label maps accurately',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 55,
      order_no: 3,
      created_at: new Date('2024-01-03'),
    },
    {
      id: 4,
      course_id: 2,
      title: 'Skimming and Scanning Techniques',
      content: 'Master the art of quick reading for IELTS',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 40,
      order_no: 1,
      created_at: new Date('2024-01-04'),
    },
    {
      id: 5,
      course_id: 2,
      title: 'Identifying Main Ideas',
      content: 'Learn to quickly identify main ideas in passages',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 45,
      order_no: 2,
      created_at: new Date('2024-01-05'),
    },
  ];
  
  // Questions
  export const mockQuestions: Question[] = [
    {
      id: 1,
      module: 'listening',
      type: 'mcq',
      difficulty: 'intermediate',
      question_text: 'What is the main purpose of the lecture?',
      audio_url: '/audio/lecture1.mp3',
      correct_answer: 'To discuss climate change impacts',
      explanation: 'The speaker focuses on how climate change affects marine life.',
      created_by: 2,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 2,
      module: 'reading',
      type: 'true_false',
      difficulty: 'intermediate',
      question_text: 'The author believes that technology is harmful to education.',
      passage_text: 'Technology has transformed education in unprecedented ways...',
      correct_answer: 'False',
      explanation: 'The author presents a balanced view of technology in education.',
      created_by: 2,
      created_at: new Date('2024-01-02'),
    },
    {
      id: 3,
      module: 'writing',
      type: 'essay',
      difficulty: 'advanced',
      question_text: 'Some people believe that social media has a negative impact on society. To what extent do you agree or disagree?',
      correct_answer: 'Model essay provided in feedback',
      explanation: 'Structure your essay with introduction, body paragraphs, and conclusion.',
      created_by: 2,
      created_at: new Date('2024-01-03'),
    },
    {
      id: 4,
      module: 'speaking',
      type: 'short_answer',
      difficulty: 'intermediate',
      question_text: 'Describe a memorable trip you have taken.',
      correct_answer: 'Fluency and coherence are key',
      explanation: 'Use descriptive language and organize your thoughts logically.',
      created_by: 2,
      created_at: new Date('2024-01-04'),
    },
  ];
  
  // Options for MCQ questions
  export const mockOptions: Option[] = [
    {
      id: 1,
      question_id: 1,
      option_text: 'To discuss climate change impacts',
      is_correct: true,
    },
    {
      id: 2,
      question_id: 1,
      option_text: 'To promote renewable energy',
      is_correct: false,
    },
    {
      id: 3,
      question_id: 1,
      option_text: 'To criticize government policies',
      is_correct: false,
    },
    {
      id: 4,
      question_id: 1,
      option_text: 'To advertise new products',
      is_correct: false,
    },
  ];
  
  // Mock Tests
  export const mockTests: MockTest[] = [
    {
      id: 1,
      title: 'IELTS Academic Mock Test 1',
      type: 'academic',
      duration: 180,
      total_marks: 40,
      created_by: 2,
      created_at: new Date('2024-01-01'),
    },
    {
      id: 2,
      title: 'IELTS General Mock Test 1',
      type: 'general',
      duration: 180,
      total_marks: 40,
      created_by: 2,
      created_at: new Date('2024-01-02'),
    },
    {
      id: 3,
      title: 'IELTS Academic Mock Test 2',
      type: 'academic',
      duration: 180,
      total_marks: 40,
      created_by: 2,
      created_at: new Date('2024-01-03'),
    },
  ];
  
  // Mock Test Questions
  export const mockTestQuestions: MockTestQuestion[] = [
    {
      id: 1,
      mock_test_id: 1,
      question_id: 1,
      section: 'listening',
      order_no: 1,
    },
    {
      id: 2,
      mock_test_id: 1,
      question_id: 2,
      section: 'reading',
      order_no: 2,
    },
  ];
  
  // Test Attempts
  export const mockAttempts: TestAttempt[] = [
    {
      id: 1,
      user_id: 1,
      mock_test_id: 1,
      score: 35,
      band_score: 7.5,
      started_at: new Date('2024-03-15T10:00:00'),
      submitted_at: new Date('2024-03-15T13:00:00'),
    },
    {
      id: 2,
      user_id: 1,
      mock_test_id: 2,
      score: 38,
      band_score: 8.0,
      started_at: new Date('2024-03-20T14:00:00'),
      submitted_at: new Date('2024-03-20T17:00:00'),
    },
  ];
  
  // Writing Submissions
  export const mockWritingSubmissions: WritingSubmission[] = [
    {
      id: 1,
      user_id: 1,
      question_id: 3,
      task_type: 'task2',
      essay_text: 'In recent years, social media has become an integral part of daily life...',
      word_count: 320,
      grammar_score: 7.5,
      vocabulary_score: 8.0,
      coherence_score: 7.0,
      task_achievement: 7.5,
      estimated_band: 7.5,
      ai_feedback: 'Good structure but work on transitions between paragraphs.',
      submitted_at: new Date('2024-03-18T12:00:00'),
    },
  ];
  
  // Vocabulary
  export const mockVocabulary: Vocabulary[] = [
    {
      id: 1,
      word: 'Analyze',
      meaning: 'To examine in detail',
      example: 'The researcher analyzed the data carefully.',
      synonym: 'Examine',
      level: 'intermediate',
      created_at: new Date('2024-01-01'),
    },
    {
      id: 2,
      word: 'Significant',
      meaning: 'Sufficiently great or important',
      example: 'There was a significant improvement in test scores.',
      synonym: 'Important',
      level: 'intermediate',
      created_at: new Date('2024-01-02'),
    },
    {
      id: 3,
      word: 'Nevertheless',
      meaning: 'In spite of that',
      example: 'The task was difficult; nevertheless, she completed it.',
      synonym: 'However',
      level: 'advanced',
      created_at: new Date('2024-01-03'),
    },
  ];
  
  // Live Classes
  export const mockLiveClasses: LiveClass[] = [
    {
      id: 1,
      title: 'IELTS Listening Tips & Tricks',
      description: 'Join this interactive session to learn proven strategies for the listening section',
      start_time: new Date('2024-03-25T15:00:00'),
      end_time: new Date('2024-03-25T16:30:00'),
      teacher_id: 2,
      created_at: new Date('2024-03-20'),
    },
    {
      id: 2,
      title: 'Writing Task 2 Workshop',
      description: 'Practice writing essays with real-time feedback from expert teachers',
      start_time: new Date('2024-03-27T10:00:00'),
      end_time: new Date('2024-03-27T12:00:00'),
      teacher_id: 2,
      created_at: new Date('2024-03-21'),
    },
  ];
  
  // Notifications
  export const mockNotifications: Notification[] = [
    {
      id: 1,
      user_id: 1,
      title: 'Test Completed',
      message: 'You completed IELTS Academic Mock Test 1 with a score of 7.5',
      is_read: false,
      created_at: new Date('2024-03-15T13:30:00'),
    },
    {
      id: 2,
      user_id: 1,
      title: 'New Live Class Available',
      message: 'Join our Writing Workshop tomorrow at 10 AM',
      is_read: false,
      created_at: new Date('2024-03-26T09:00:00'),
    },
  ];
  
  // Dashboard Stats
  export const dashboardStats: DashboardStats = {
    totalCourses: 4,
    completedLessons: 8,
    mockTestsTaken: 5,
    averageBandScore: 7.2,
    studyStreak: 15,
    totalStudyHours: 48,
    vocabularyLearned: 45,
    writingSubmissions: 3,
    speakingPractices: 6,
  };