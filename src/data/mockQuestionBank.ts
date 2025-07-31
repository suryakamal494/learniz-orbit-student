
import type { QuestionBankSubject, Question } from '@/types/questionBank'

export const mockQuestionBankSubjects: QuestionBankSubject[] = [
  {
    id: '1',
    institute: 'Science Academy',
    subject: 'Physics',
    code: 'PHY101',
    questionCount: 245,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    institute: 'Mathematics Institute',
    subject: 'Calculus',
    code: 'MATH201',
    questionCount: 189,
    lastUpdated: '2024-01-12'
  },
  {
    id: '3',
    institute: 'Chemistry Lab',
    subject: 'Organic Chemistry',
    code: 'CHEM301',
    questionCount: 156,
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    institute: 'Biology Department',
    subject: 'Cell Biology',
    code: 'BIO201',
    questionCount: 203,
    lastUpdated: '2024-01-08'
  }
]

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the speed of light in vacuum?',
    type: 'single',
    options: ['299,792,458 m/s', '300,000,000 m/s', '186,282 miles/s', '3 × 10^8 m/s'],
    correctAnswer: 0,
    explanation: 'The speed of light in vacuum is exactly 299,792,458 meters per second, which is a fundamental physical constant.',
    hint: 'Think about fundamental physical constants',
    marks: 2,
    difficulty: 'medium',
    category: 'Physics Constants',
    chapter: 'Wave Optics',
    topic: 'Light Properties',
    hasImage: false,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    question: 'Which of the following are vector quantities?',
    type: 'multiple',
    options: ['Velocity', 'Speed', 'Acceleration', 'Distance'],
    correctAnswer: [0, 2],
    explanation: 'Vector quantities have both magnitude and direction. Velocity and acceleration are vectors, while speed and distance are scalars.',
    marks: 3,
    difficulty: 'easy',
    category: 'Mechanics',
    chapter: 'Vectors',
    topic: 'Vector vs Scalar',
    hasImage: false,
    createdAt: '2024-01-14'
  }
]

export const mockFilterOptions = {
  questionBankType: [
    { value: 'neet', label: 'NEET' },
    { value: 'jee', label: 'JEE' },
    { value: 'boards', label: 'Board Exams' }
  ],
  chapters: {
    'neet': [
      { value: 'mechanics', label: 'Mechanics' },
      { value: 'thermodynamics', label: 'Thermodynamics' },
      { value: 'waves', label: 'Waves & Optics' }
    ],
    'jee': [
      { value: 'calculus', label: 'Calculus' },
      { value: 'algebra', label: 'Algebra' },
      { value: 'geometry', label: 'Coordinate Geometry' }
    ]
  },
  topics: {
    'mechanics': [
      { value: 'kinematics', label: 'Kinematics' },
      { value: 'dynamics', label: 'Dynamics' },
      { value: 'circular-motion', label: 'Circular Motion' }
    ],
    'calculus': [
      { value: 'limits', label: 'Limits' },
      { value: 'derivatives', label: 'Derivatives' },
      { value: 'integrals', label: 'Integrals' }
    ]
  },
  categories: [
    { value: 'conceptual', label: 'Conceptual' },
    { value: 'numerical', label: 'Numerical' },
    { value: 'application', label: 'Application' }
  ],
  difficulties: [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]
}
