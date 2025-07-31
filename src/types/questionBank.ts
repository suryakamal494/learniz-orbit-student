
export interface QuestionBankSubject {
  id: string
  institute: string
  subject: string
  code: string
  questionCount: number
  lastUpdated: string
}

export interface QuestionContent {
  text: string
  html: string
  hasmath: boolean
  images: string[]
}

export interface QuestionOption {
  text: string
  html: string
  hasmath: boolean
  images: string[]
}

export interface Question {
  id: string
  questionContent: QuestionContent
  type: 'single' | 'multiple' | 'fillInBlanks'
  options: QuestionOption[]
  correctAnswer: number | number[]
  explanationContent: QuestionContent
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
  questionContent: QuestionContent
  type: 'single' | 'multiple' | 'fillInBlanks'
  options: QuestionOption[]
  correctAnswer: number
  explanationContent: QuestionContent
  hint: string
  marks: number
  numberOfOptions: number
}
