
import { api } from '@/lib/api'

export interface QuestionBankType {
  id: string
  name: string
}

export interface Chapter {
  id: string
  name: string
  questionBankTypeId: string
}

export interface Topic {
  id: string
  name: string
  chapterId: string
}

export interface QuestionCategory {
  id: string
  name: string
}

export interface DifficultyLevel {
  id: string
  name: string
  value: 'easy' | 'medium' | 'hard'
}

export interface QuestionType {
  id: string
  name: string
  value: 'single' | 'multiple' | 'fillInBlanks'
}

export interface CreateQuestionData {
  questionBankType: string
  chapter: string
  topic: string
  category: string
  difficulty: string
  questionContent: string
  questionType: string
  hint?: string
  marks: number
  explanation: string
  numberOfOptions: number
  options: Array<{
    content: string
    image?: File
  }>
  correctAnswer: number
  questionImage?: File
}

// Mock data for development - replace with real API calls
export const questionBankService = {
  async getQuestionBankTypes(): Promise<QuestionBankType[]> {
    // Mock data - replace with: return api.get('/question-bank-types')
    return [
      { id: '1', name: 'JEE Main' },
      { id: '2', name: 'JEE Advanced' },
      { id: '3', name: 'NEET' },
      { id: '4', name: 'CBSE Class 12' },
      { id: '5', name: 'CBSE Class 11' }
    ]
  },

  async getChapters(questionBankTypeId: string): Promise<Chapter[]> {
    // Mock data - replace with: return api.get(`/chapters?questionBankType=${questionBankTypeId}`)
    const chapters = {
      '1': [
        { id: '1', name: 'Algebra', questionBankTypeId: '1' },
        { id: '2', name: 'Calculus', questionBankTypeId: '1' },
        { id: '3', name: 'Trigonometry', questionBankTypeId: '1' }
      ],
      '2': [
        { id: '4', name: 'Advanced Algebra', questionBankTypeId: '2' },
        { id: '5', name: 'Complex Numbers', questionBankTypeId: '2' }
      ],
      '3': [
        { id: '6', name: 'Human Physiology', questionBankTypeId: '3' },
        { id: '7', name: 'Plant Biology', questionBankTypeId: '3' }
      ]
    }
    return chapters[questionBankTypeId as keyof typeof chapters] || []
  },

  async getTopics(chapterId: string): Promise<Topic[]> {
    // Mock data - replace with: return api.get(`/topics?chapter=${chapterId}`)
    const topics = {
      '1': [
        { id: '1', name: 'Linear Equations', chapterId: '1' },
        { id: '2', name: 'Quadratic Equations', chapterId: '1' }
      ],
      '2': [
        { id: '3', name: 'Derivatives', chapterId: '2' },
        { id: '4', name: 'Integrals', chapterId: '2' }
      ],
      '6': [
        { id: '5', name: 'Respiratory System', chapterId: '6' },
        { id: '6', name: 'Circulatory System', chapterId: '6' }
      ]
    }
    return topics[chapterId as keyof typeof topics] || []
  },

  async getQuestionCategories(): Promise<QuestionCategory[]> {
    // Mock data - replace with: return api.get('/question-categories')
    return [
      { id: '1', name: 'Conceptual' },
      { id: '2', name: 'Application' },
      { id: '3', name: 'Problem Solving' },
      { id: '4', name: 'Critical Thinking' }
    ]
  },

  async getDifficultyLevels(): Promise<DifficultyLevel[]> {
    // Mock data - replace with: return api.get('/difficulty-levels')
    return [
      { id: '1', name: 'Easy', value: 'easy' },
      { id: '2', name: 'Medium', value: 'medium' },
      { id: '3', name: 'Hard', value: 'hard' }
    ]
  },

  async getQuestionTypes(): Promise<QuestionType[]> {
    // Mock data - replace with: return api.get('/question-types')
    return [
      { id: '1', name: 'Single Answer', value: 'single' },
      { id: '2', name: 'Multiple Answer', value: 'multiple' },
      { id: '3', name: 'Fill in the Blanks', value: 'fillInBlanks' }
    ]
  },

  async uploadImage(file: File): Promise<string> {
    // Mock implementation - replace with actual upload
    const formData = new FormData()
    formData.append('image', file)
    // return api.postFormData('/upload-image', formData)
    return URL.createObjectURL(file) // Mock URL
  },

  async createQuestion(data: CreateQuestionData): Promise<any> {
    // Mock implementation - replace with: return api.post('/questions', data)
    console.log('Creating question with data:', data)
    return { id: Date.now().toString(), message: 'Question created successfully' }
  }
}
