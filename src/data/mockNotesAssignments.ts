
import { NotesAssignmentItem } from '@/types/batch'

export const mockNotesAssignments: NotesAssignmentItem[] = [
  {
    id: '1',
    institute: 'Learneazy',
    title: 'Newton\'s Laws of Motion',
    notesFor: {
      type: 'Chapter Notes',
      subject: 'Physics',
      chapter: 'Laws of Motion',
      topic: 'Newton\'s Laws'
    },
    fileSize: '2.5 MB',
    uploadDate: '2024-01-15',
    isAssigned: false
  },
  {
    id: '2',
    institute: 'Learneazy',
    title: 'Organic Compounds Classification',
    notesFor: {
      type: 'Topic Notes',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      topic: 'Classification'
    },
    fileSize: '1.8 MB',
    uploadDate: '2024-01-20',
    isAssigned: true
  },
  {
    id: '3',
    institute: 'Learneazy',
    title: 'Limits and Derivatives',
    notesFor: {
      type: 'Chapter Notes',
      subject: 'Mathematics',
      chapter: 'Calculus',
      topic: 'Limits'
    },
    fileSize: '3.2 MB',
    uploadDate: '2024-01-18',
    isAssigned: false
  },
  {
    id: '4',
    institute: 'Learneazy',
    title: 'Cell Structure and Function',
    notesFor: {
      type: 'Chapter Notes',
      subject: 'Biology',
      chapter: 'Cell Biology',
      topic: 'Cell Structure'
    },
    fileSize: '4.1 MB',
    uploadDate: '2024-01-22',
    isAssigned: false
  },
  {
    id: '5',
    institute: 'Learneazy',
    title: 'Wave Optics Theory',
    notesFor: {
      type: 'Topic Notes',
      subject: 'Physics',
      chapter: 'Optics',
      topic: 'Wave Theory'
    },
    fileSize: '2.9 MB',
    uploadDate: '2024-01-25',
    isAssigned: true
  },
  {
    id: '6',
    institute: 'Learneazy',
    title: 'Chemical Bonding Concepts',
    notesFor: {
      type: 'Chapter Notes',
      subject: 'Chemistry',
      chapter: 'Chemical Bonding',
      topic: 'Ionic and Covalent Bonds'
    },
    fileSize: '2.3 MB',
    uploadDate: '2024-01-28',
    isAssigned: false
  }
]
