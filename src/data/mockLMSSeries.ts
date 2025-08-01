
import { LMSSeries } from '@/types/lmsSeries'

export const mockLMSSeries: LMSSeries[] = [
  {
    id: '1',
    title: 'Physics Fundamentals Series',
    institute: 'Delhi Public School',
    subject: 'Physics',
    chapter: 'Motion in a Straight Line',
    topic: 'Uniform Motion',
    subtopic: 'Speed and Velocity',
    totalItems: 15,
    type: 'content-series',
    description: 'Comprehensive series covering basic physics concepts',
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'Dr. Smith',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    title: 'Mathematics Video Series',
    institute: 'Delhi Public School',
    subject: 'Mathematics',
    chapter: 'Algebra',
    topic: 'Linear Equations',
    subtopic: 'Two Variables',
    totalItems: 25,
    type: 'video-series',
    description: 'Step-by-step video explanations for algebra concepts',
    createdAt: '2024-01-10T09:15:00Z',
    createdBy: 'Prof. Johnson',
    updatedAt: '2024-01-18T11:30:00Z'
  },
  {
    id: '3',
    title: 'Chemistry Lab Series',
    institute: 'Ryan International',
    subject: 'Chemistry',
    chapter: 'Acids and Bases',
    topic: 'pH Scale',
    totalItems: 8,
    type: 'assignment-series',
    description: 'Practical chemistry experiments and assignments',
    createdAt: '2024-01-12T16:20:00Z',
    createdBy: 'Dr. Patel',
    updatedAt: '2024-01-22T10:15:00Z'
  },
  {
    id: '4',
    title: 'Biology Quiz Series',
    institute: 'Ryan International',
    subject: 'Biology',
    chapter: 'Cell Structure',
    topic: 'Cell Organelles',
    subtopic: 'Mitochondria Functions',
    totalItems: 12,
    type: 'quiz-series',
    description: 'Interactive quizzes on cell biology',
    createdAt: '2024-01-08T13:45:00Z',
    createdBy: 'Ms. Anderson',
    updatedAt: '2024-01-19T15:20:00Z'
  },
  {
    id: '5',
    title: 'English Literature Exam Series',
    institute: 'St. Mary\'s School',
    subject: 'English',
    chapter: 'Poetry Analysis',
    topic: 'Romantic Poetry',
    totalItems: 20,
    type: 'exam-series',
    description: 'Comprehensive exam preparation for literature',
    createdAt: '2024-01-05T08:30:00Z',
    createdBy: 'Prof. Williams',
    updatedAt: '2024-01-25T12:10:00Z'
  },
  {
    id: '6',
    title: 'History Documentary Series',
    institute: 'St. Mary\'s School',
    subject: 'History',
    chapter: 'World War II',
    topic: 'European Theatre',
    subtopic: 'D-Day Operations',
    totalItems: 18,
    type: 'video-series',
    description: 'Historical documentaries and analysis',
    createdAt: '2024-01-14T11:00:00Z',
    createdBy: 'Dr. Brown',
    updatedAt: '2024-01-21T09:45:00Z'
  }
]

export const mockSubtopics = [
  { id: '1', name: 'Speed and Velocity', topicId: '1' },
  { id: '2', name: 'Acceleration', topicId: '1' },
  { id: '3', name: 'Two Variables', topicId: '2' },
  { id: '4', name: 'Single Variable', topicId: '2' },
  { id: '5', name: 'Mitochondria Functions', topicId: '3' },
  { id: '6', name: 'Nucleus Structure', topicId: '3' },
  { id: '7', name: 'D-Day Operations', topicId: '4' },
  { id: '8', name: 'Pacific Theatre', topicId: '4' }
]
