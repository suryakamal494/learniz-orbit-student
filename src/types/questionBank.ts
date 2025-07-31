
export interface QuestionBankSubject {
  id: string
  institute: string
  subject: string
  code: string
  questionCount: number
  lastUpdated: string
}

export interface Question {
  id: string
  question: string
  type: 'single' | 'multiple' | 'fillInBlanks'
  options: string[]
  correctAnswer: number | number[]
  explanation: string
  hint?: string
  marks: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  chapter: string
  topic: string
  hasImage: boolean
  createdAt: string
}

export interface QuestionBankFilters {
  questionBankType: string
  chapter: string
  topic: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuestionFormData extends QuestionBankFilters {
  question: string
  type: 'single' | 'multiple' | 'fillInBlanks'
  options: string[]
  correctAnswer: number
  explanation: string
  hint: string
  marks: number
  numberOfOptions: number
}
