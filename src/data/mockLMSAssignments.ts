
import { LMSAssignmentItem } from '@/types/batch'

export const mockLMSAssignments: LMSAssignmentItem[] = [
  {
    id: '1',
    title: 'Introduction to Mechanics',
    type: 'video-playlist',
    subject: 'Physics',
    duration: '2h 30m',
    description: 'Complete introduction to classical mechanics with practical examples',
    thumbnailUrl: '/placeholder.svg',
    isAssigned: false
  },
  {
    id: '2',
    title: 'Organic Chemistry Fundamentals',
    type: 'video',
    subject: 'Chemistry',
    duration: '1h 45m',
    description: 'Basic concepts of organic chemistry and molecular structures',
    isAssigned: true
  },
  {
    id: '3',
    title: 'Calculus Practice Problems',
    type: 'pdf',
    subject: 'Mathematics',
    description: 'Comprehensive set of calculus problems with solutions',
    isAssigned: false
  },
  {
    id: '4',
    title: 'Cell Biology Interactive Quiz',
    type: 'quiz',
    subject: 'Biology',
    duration: '30m',
    description: 'Interactive quiz covering cell structure and functions',
    isAssigned: false
  },
  {
    id: '5',
    title: 'Thermodynamics Concepts',
    type: 'reading',
    subject: 'Physics',
    description: 'Detailed reading material on thermodynamics laws and applications',
    isAssigned: true
  },
  {
    id: '6',
    title: 'Periodic Table Mastery',
    type: 'video-playlist',
    subject: 'Chemistry',
    duration: '3h 15m',
    description: 'Complete guide to periodic table trends and properties',
    isAssigned: false
  },
  {
    id: '7',
    title: 'Trigonometry Solved Examples',
    type: 'video',
    subject: 'Mathematics',
    duration: '1h 20m',
    description: 'Step-by-step solutions to complex trigonometry problems',
    isAssigned: false
  },
  {
    id: '8',
    title: 'Genetics Practice Test',
    type: 'quiz',
    subject: 'Biology',
    duration: '45m',
    description: 'Comprehensive test on genetics and heredity concepts',
    isAssigned: true
  }
]
