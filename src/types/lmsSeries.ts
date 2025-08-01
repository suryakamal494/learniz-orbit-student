
export type LMSSeriesType = 'content-series' | 'video-series' | 'assignment-series' | 'quiz-series' | 'exam-series'

export interface LMSSeries {
  id: string
  title: string
  institute: string
  subject: string
  chapter: string
  topic: string
  subtopic?: string
  totalItems: number
  type: LMSSeriesType
  description?: string
  showInHomepage: 'yes' | 'no'
  startDate?: string
  endDate?: string
  createdAt: string
  createdBy: string
  updatedAt: string
}

export interface LMSSeriesFilters {
  institute?: string
  subject?: string
  chapter?: string
  topic?: string
  subtopic?: string
  type?: LMSSeriesType
  search?: string
}

export interface Subtopic {
  id: string
  name: string
  topicId: string
}
