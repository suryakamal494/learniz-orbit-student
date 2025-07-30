
import { LMSData } from '@/types/lms'

export const mockLMSData: LMSData = {
  overallProgress: 65,
  chapters: [
    {
      id: '1',
      title: 'Introduction to Fundamentals',
      description: 'Basic concepts and foundational knowledge',
      progress: 100,
      status: 'completed',
      estimatedTime: '2 hours',
      totalItems: 5,
      completedItems: 5,
      topics: [
        {
          id: '1-1',
          title: 'Getting Started',
          description: 'Introduction to the subject',
          estimatedTime: '30 min',
          difficulty: 'easy',
          completed: true,
          contentItems: [
            {
              id: '1-1-1',
              title: 'Welcome Video',
              type: 'youtube',
              url: 'https://youtube.com/watch?v=example',
              duration: '10 min',
              completed: true
            },
            {
              id: '1-1-2',
              title: 'Course Overview',
              type: 'pdf',
              url: '/course-overview.pdf',
              size: '2.5 MB',
              pages: 12,
              completed: true
            }
          ]
        },
        {
          id: '1-2',
          title: 'Basic Concepts',
          description: 'Core principles and definitions',
          estimatedTime: '45 min',
          difficulty: 'easy',
          completed: true,
          contentItems: [
            {
              id: '1-2-1',
              title: 'Fundamental Principles',
              type: 'reading',
              description: 'Essential concepts you need to know',
              completed: true
            },
            {
              id: '1-2-2',
              title: 'Quick Quiz',
              type: 'quiz',
              description: 'Test your understanding',
              completed: true
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Advanced Topics',
      description: 'In-depth exploration of complex subjects',
      progress: 60,
      status: 'current',
      estimatedTime: '3 hours',
      totalItems: 8,
      completedItems: 5,
      topics: [
        {
          id: '2-1',
          title: 'Complex Theories',
          description: 'Advanced theoretical frameworks',
          estimatedTime: '1 hour',
          difficulty: 'hard',
          completed: true,
          contentItems: [
            {
              id: '2-1-1',
              title: 'Theory Explanation',
              type: 'video',
              duration: '25 min',
              completed: true
            },
            {
              id: '2-1-2',
              title: 'Research Papers',
              type: 'pdf-collection',
              size: '15 MB',
              pages: 45,
              completed: true
            }
          ]
        },
        {
          id: '2-2',
          title: 'Practical Applications',
          description: 'Real-world examples and case studies',
          estimatedTime: '1.5 hours',
          difficulty: 'medium',
          completed: false,
          contentItems: [
            {
              id: '2-2-1',
              title: 'Case Study Videos',
              type: 'video-playlist',
              duration: '45 min',
              completed: false
            },
            {
              id: '2-2-2',
              title: 'Practice Exercises',
              type: 'quiz',
              description: 'Apply what you have learned',
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Specialized Applications',
      description: 'Industry-specific implementations',
      progress: 0,
      status: 'locked',
      estimatedTime: '2.5 hours',
      totalItems: 6,
      completedItems: 0,
      topics: [
        {
          id: '3-1',
          title: 'Industry Standards',
          description: 'Current best practices and standards',
          estimatedTime: '1 hour',
          difficulty: 'medium',
          completed: false,
          contentItems: [
            {
              id: '3-1-1',
              title: 'Standards Overview',
              type: 'reading',
              description: 'Overview of industry standards',
              completed: false
            }
          ]
        }
      ]
    }
  ]
}
