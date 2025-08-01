
import type { NotesItem } from '@/types/notesManagement'

export const mockNotesData: NotesItem[] = [
  {
    id: 'notes-1',
    title: 'Introduction to Calculus - Fundamentals',
    fileName: 'calculus_fundamentals.pdf',
    fileUrl: 'https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf',
    fileType: 'pdf',
    fileSize: '2.3 MB',
    uploadedAt: '2024-01-15T10:30:00Z',
    subject: 'Mathematics',
    chapter: 'Calculus',
    topic: 'Fundamentals',
    description: 'Basic concepts and definitions of calculus',
    createdBy: 'Dr. Smith',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: 'notes-2',
    title: 'Physics - Mechanics Notes',
    fileName: 'mechanics_notes.pdf',
    fileUrl: '#',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    uploadedAt: '2024-01-16T09:15:00Z',
    subject: 'Physics',
    chapter: 'Mechanics',
    topic: 'Motion',
    description: 'Comprehensive notes on classical mechanics',
    createdBy: 'Prof. Johnson',
    updatedAt: '2024-01-18T11:30:00Z'
  },
  {
    id: 'notes-3',
    title: 'Chemistry Lab Experiments',
    fileName: 'chemistry_experiments.docx',
    fileUrl: '#',
    fileType: 'docx',
    fileSize: '956 KB',
    uploadedAt: '2024-01-17T14:20:00Z',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    topic: 'Lab Work',
    description: 'Laboratory experiments and procedures',
    createdBy: 'Dr. Patel',
    updatedAt: '2024-01-22T10:15:00Z'
  },
  {
    id: 'notes-4',
    title: 'Biology Cell Structure Diagrams',
    fileName: 'cell_diagrams.png',
    fileUrl: '#',
    fileType: 'png',
    fileSize: '3.2 MB',
    uploadedAt: '2024-01-18T13:45:00Z',
    subject: 'Biology',
    chapter: 'Cell Biology',
    topic: 'Cell Structure',
    description: 'Detailed diagrams of cell components',
    createdBy: 'Ms. Anderson',
    updatedAt: '2024-01-19T15:20:00Z'
  },
  {
    id: 'notes-5',
    title: 'Literature Analysis Guide',
    fileName: 'literature_analysis.pptx',
    fileUrl: '#',
    fileType: 'pptx',
    fileSize: '4.5 MB',
    uploadedAt: '2024-01-19T08:30:00Z',
    subject: 'English',
    chapter: 'Literary Analysis',
    topic: 'Poetry',
    description: 'Guide for analyzing literary works',
    createdBy: 'Prof. Williams',
    updatedAt: '2024-01-25T12:10:00Z'
  }
]
