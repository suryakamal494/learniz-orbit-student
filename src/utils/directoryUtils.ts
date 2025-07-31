
import { DirectoryNode, DirectoryHierarchy } from '@/types/directory'
import { mockQuestionBankSubjects } from '@/data/mockQuestionBank'

// Mock hierarchical data structure
export const mockDirectoryData: DirectoryHierarchy = {
  subjects: [
    {
      id: 'math',
      name: 'Mathematics',
      type: 'subject',
      questionCount: 2450,
      children: [
        {
          id: 'math-algebra',
          name: 'Algebra',
          type: 'chapter',
          questionCount: 680,
          parentId: 'math',
          children: [
            {
              id: 'math-algebra-linear',
              name: 'Linear Equations',
              type: 'topic',
              questionCount: 245,
              parentId: 'math-algebra',
              children: [
                {
                  id: 'math-algebra-linear-basic',
                  name: 'Basic Linear Equations',
                  type: 'subtopic',
                  questionCount: 120,
                  parentId: 'math-algebra-linear'
                },
                {
                  id: 'math-algebra-linear-complex',
                  name: 'Complex Linear Systems',
                  type: 'subtopic',
                  questionCount: 125,
                  parentId: 'math-algebra-linear'
                }
              ]
            },
            {
              id: 'math-algebra-quadratic',
              name: 'Quadratic Equations',
              type: 'topic',
              questionCount: 435,
              parentId: 'math-algebra',
              children: [
                {
                  id: 'math-algebra-quadratic-standard',
                  name: 'Standard Form',
                  type: 'subtopic',
                  questionCount: 215,
                  parentId: 'math-algebra-quadratic'
                },
                {
                  id: 'math-algebra-quadratic-factoring',
                  name: 'Factoring Methods',
                  type: 'subtopic',
                  questionCount: 220,
                  parentId: 'math-algebra-quadratic'
                }
              ]
            }
          ]
        },
        {
          id: 'math-geometry',
          name: 'Geometry',
          type: 'chapter',
          questionCount: 890,
          parentId: 'math',
          children: [
            {
              id: 'math-geometry-triangles',
              name: 'Triangles',
              type: 'topic',
              questionCount: 320,
              parentId: 'math-geometry',
              children: [
                {
                  id: 'math-geometry-triangles-basic',
                  name: 'Basic Properties',
                  type: 'subtopic',
                  questionCount: 160,
                  parentId: 'math-geometry-triangles'
                },
                {
                  id: 'math-geometry-triangles-similarity',
                  name: 'Similarity & Congruence',
                  type: 'subtopic',
                  questionCount: 160,
                  parentId: 'math-geometry-triangles'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'physics',
      name: 'Physics',
      type: 'subject',
      questionCount: 1850,
      children: [
        {
          id: 'physics-mechanics',
          name: 'Mechanics',
          type: 'chapter',
          questionCount: 750,
          parentId: 'physics',
          children: [
            {
              id: 'physics-mechanics-motion',
              name: 'Motion in One Dimension',
              type: 'topic',
              questionCount: 280,
              parentId: 'physics-mechanics',
              children: [
                {
                  id: 'physics-mechanics-motion-uniform',
                  name: 'Uniform Motion',
                  type: 'subtopic',
                  questionCount: 140,
                  parentId: 'physics-mechanics-motion'
                },
                {
                  id: 'physics-mechanics-motion-accelerated',
                  name: 'Accelerated Motion',
                  type: 'subtopic',
                  questionCount: 140,
                  parentId: 'physics-mechanics-motion'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      type: 'subject',
      questionCount: 1620,
      children: [
        {
          id: 'chemistry-organic',
          name: 'Organic Chemistry',
          type: 'chapter',
          questionCount: 890,
          parentId: 'chemistry',
          children: [
            {
              id: 'chemistry-organic-hydrocarbons',
              name: 'Hydrocarbons',
              type: 'topic',
              questionCount: 450,
              parentId: 'chemistry-organic',
              children: [
                {
                  id: 'chemistry-organic-hydrocarbons-alkanes',
                  name: 'Alkanes',
                  type: 'subtopic',
                  questionCount: 225,
                  parentId: 'chemistry-organic-hydrocarbons'
                },
                {
                  id: 'chemistry-organic-hydrocarbons-alkenes',
                  name: 'Alkenes',
                  type: 'subtopic',
                  questionCount: 225,
                  parentId: 'chemistry-organic-hydrocarbons'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  totalQuestions: 5920
}

export const getNodeIcon = (type: DirectoryNode['type'], isExpanded: boolean) => {
  if (type === 'subtopic') return '📄'
  return isExpanded ? '🔽' : '▶️'
}

export const getIndentLevel = (type: DirectoryNode['type']) => {
  switch (type) {
    case 'subject': return 0
    case 'chapter': return 1
    case 'topic': return 2
    case 'subtopic': return 3
    default: return 0
  }
}
