
import type { LMSContentItem, Institute, Subject, Chapter, Topic } from '@/types/lmsContent'

export const mockInstitutes: Institute[] = [
  { id: '1', name: 'Cambridge International School' },
  { id: '2', name: 'Oxford Academy' },
  { id: '3', name: 'Royal Public School' },
  { id: '4', name: 'Elite Learning Center' }
]

export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', instituteId: '1' },
  { id: '2', name: 'Physics', instituteId: '1' },
  { id: '3', name: 'Chemistry', instituteId: '1' },
  { id: '4', name: 'Biology', instituteId: '2' },
  { id: '5', name: 'English', instituteId: '2' },
  { id: '6', name: 'History', instituteId: '3' },
  { id: '7', name: 'Geography', instituteId: '3' },
  { id: '8', name: 'Computer Science', instituteId: '4' }
]

export const mockChapters: Chapter[] = [
  { id: '1', name: 'Algebra Fundamentals', subjectId: '1' },
  { id: '2', name: 'Geometry Basics', subjectId: '1' },
  { id: '3', name: 'Calculus Introduction', subjectId: '1' },
  { id: '4', name: 'Mechanics', subjectId: '2' },
  { id: '5', name: 'Thermodynamics', subjectId: '2' },
  { id: '6', name: 'Organic Chemistry', subjectId: '3' },
  { id: '7', name: 'Inorganic Chemistry', subjectId: '3' },
  { id: '8', name: 'Cell Biology', subjectId: '4' },
  { id: '9', name: 'Grammar Essentials', subjectId: '5' },
  { id: '10', name: 'Literature Analysis', subjectId: '5' }
]

export const mockTopics: Topic[] = [
  { id: '1', name: 'Linear Equations', chapterId: '1' },
  { id: '2', name: 'Quadratic Functions', chapterId: '1' },
  { id: '3', name: 'Triangle Properties', chapterId: '2' },
  { id: '4', name: 'Circle Theorems', chapterId: '2' },
  { id: '5', name: 'Derivatives', chapterId: '3' },
  { id: '6', name: 'Integrals', chapterId: '3' },
  { id: '7', name: 'Newton\'s Laws', chapterId: '4' },
  { id: '8', name: 'Motion Equations', chapterId: '4' },
  { id: '9', name: 'Heat Transfer', chapterId: '5' },
  { id: '10', name: 'Gas Laws', chapterId: '5' },
  { id: '11', name: 'Alkanes and Alkenes', chapterId: '6' },
  { id: '12', name: 'Functional Groups', chapterId: '6' },
  { id: '13', name: 'Periodic Table', chapterId: '7' },
  { id: '14', name: 'Chemical Bonding', chapterId: '7' },
  { id: '15', name: 'Cell Structure', chapterId: '8' },
  { id: '16', name: 'Cell Division', chapterId: '8' }
]

export const mockLMSContent: LMSContentItem[] = [
  {
    id: '1',
    title: 'Introduction to Linear Equations',
    type: 'video-url',
    institute: 'Cambridge International School',
    subject: 'Mathematics',
    chapter: 'Algebra Fundamentals',
    topic: 'Linear Equations',
    content: 'https://www.youtube.com/watch?v=example1',
    url: 'https://www.youtube.com/watch?v=example1',
    description: 'Basic introduction to solving linear equations with examples',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'Prof. Smith'
  },
  {
    id: '2',
    title: 'Quadratic Functions Study Guide',
    type: 'pdf',
    institute: 'Cambridge International School',
    subject: 'Mathematics',
    chapter: 'Algebra Fundamentals',
    topic: 'Quadratic Functions',
    content: 'Comprehensive study guide covering quadratic functions, their graphs, and applications.',
    url: '/documents/quadratic-functions-guide.pdf',
    description: 'Complete guide with practice problems and solutions',
    createdAt: '2024-01-14T09:30:00Z',
    updatedAt: '2024-01-14T09:30:00Z',
    createdBy: 'Prof. Johnson'
  },
  {
    id: '3',
    title: 'Triangle Properties Interactive Demo',
    type: 'iframe',
    institute: 'Cambridge International School',
    subject: 'Mathematics',
    chapter: 'Geometry Basics',
    topic: 'Triangle Properties',
    content: '<iframe src="https://www.geogebra.org/geometry" width="100%" height="400px"></iframe>',
    url: 'https://www.geogebra.org/geometry',
    description: 'Interactive geometric demonstration of triangle properties',
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z',
    createdBy: 'Dr. Williams'
  },
  {
    id: '4',
    title: 'Newton\'s Laws Explained',
    type: 'text',
    institute: 'Cambridge International School',
    subject: 'Physics',
    chapter: 'Mechanics',
    topic: 'Newton\'s Laws',
    content: 'Newton\'s three laws of motion form the foundation of classical mechanics. The first law states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
    description: 'Detailed explanation of Newton\'s three laws with examples',
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-12T11:15:00Z',
    createdBy: 'Prof. Davis'
  },
  {
    id: '5',
    title: 'Motion Equations Formula Sheet',
    type: 'image',
    institute: 'Cambridge International School',
    subject: 'Physics',
    chapter: 'Mechanics',
    topic: 'Motion Equations',
    content: 'Formula sheet containing all kinematic equations for motion',
    url: '/images/motion-equations-formula-sheet.png',
    description: 'Quick reference sheet for motion equations',
    createdAt: '2024-01-11T16:45:00Z',
    updatedAt: '2024-01-11T16:45:00Z',
    createdBy: 'Prof. Brown'
  },
  {
    id: '6',
    title: 'Cell Structure Diagram',
    type: 'file',
    institute: 'Oxford Academy',
    subject: 'Biology',
    chapter: 'Cell Biology',
    topic: 'Cell Structure',
    content: 'Detailed diagram showing plant and animal cell structures',
    url: '/files/cell-structure-diagram.ppt',
    description: 'PowerPoint presentation with detailed cell diagrams',
    createdAt: '2024-01-10T13:30:00Z',
    updatedAt: '2024-01-10T13:30:00Z',
    createdBy: 'Dr. Miller'
  },
  {
    id: '7',
    title: 'Grammar Rules and Examples',
    type: 'pdf',
    institute: 'Oxford Academy',
    subject: 'English',
    chapter: 'Grammar Essentials',
    topic: 'Parts of Speech',
    content: 'Comprehensive guide to English grammar rules with practical examples',
    url: '/documents/grammar-guide.pdf',
    description: 'Essential grammar rules for English language learners',
    createdAt: '2024-01-09T08:20:00Z',
    updatedAt: '2024-01-09T08:20:00Z',
    createdBy: 'Prof. Taylor'
  },
  {
    id: '8',
    title: 'Organic Chemistry Reactions Video',
    type: 'video-url',
    institute: 'Cambridge International School',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    topic: 'Alkanes and Alkenes',
    content: 'https://www.youtube.com/watch?v=example8',
    url: 'https://www.youtube.com/watch?v=example8',
    description: 'Visual demonstration of organic chemistry reactions',
    createdAt: '2024-01-08T12:10:00Z',
    updatedAt: '2024-01-08T12:10:00Z',
    createdBy: 'Dr. Anderson'
  }
]
