
import { NotesData } from '@/types/notes';

export const mockNotesData: NotesData[] = [
  {
    subjectId: '1',
    subjectName: 'Physics',
    chapters: [
      {
        id: '1',
        title: 'Motion in a Straight Line',
        description: 'Fundamentals of linear motion',
        notes: [
          {
            id: '1',
            title: 'Introduction to Motion',
            fileName: 'motion-intro.pdf',
            fileUrl: '#',
            fileSize: '2.5 MB',
            uploadedAt: '2024-01-15T10:30:00Z',
            fileType: 'pdf'
          },
          {
            id: '2',
            title: 'Velocity and Acceleration',
            fileName: 'velocity-acceleration.pdf',
            fileUrl: '#',
            fileSize: '3.2 MB',
            uploadedAt: '2024-01-16T14:20:00Z',
            fileType: 'pdf'
          }
        ]
      },
      {
        id: '2',
        title: 'Electromagnetic Induction',
        description: 'Laws of electromagnetic induction',
        notes: [
          {
            id: '3',
            title: 'Faraday\'s Law',
            fileName: 'faradays-law.pdf',
            fileUrl: '#',
            fileSize: '1.8 MB',
            uploadedAt: '2024-01-18T09:15:00Z',
            fileType: 'pdf'
          }
        ]
      }
    ]
  },
  {
    subjectId: '2',
    subjectName: 'Mathematics',
    chapters: [
      {
        id: '3',
        title: 'Differential Calculus',
        description: 'Introduction to derivatives',
        notes: [
          {
            id: '4',
            title: 'Limits and Derivatives',
            fileName: 'limits-derivatives.pdf',
            fileUrl: '#',
            fileSize: '4.1 MB',
            uploadedAt: '2024-01-12T11:45:00Z',
            fileType: 'pdf'
          },
          {
            id: '5',
            title: 'Applications of Derivatives',
            fileName: 'derivative-applications.pptx',
            fileUrl: '#',
            fileSize: '5.3 MB',
            uploadedAt: '2024-01-14T16:30:00Z',
            fileType: 'pptx'
          }
        ]
      }
    ]
  },
  {
    subjectId: '3',
    subjectName: 'Chemistry',
    chapters: [
      {
        id: '4',
        title: 'Organic Compounds',
        description: 'Structure and properties of organic molecules',
        notes: [
          {
            id: '6',
            title: 'Hydrocarbons',
            fileName: 'hydrocarbons.pdf',
            fileUrl: '#',
            fileSize: '2.9 MB',
            uploadedAt: '2024-01-20T08:20:00Z',
            fileType: 'pdf'
          }
        ]
      }
    ]
  }
];
