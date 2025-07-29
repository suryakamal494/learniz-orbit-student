
export interface ContentItem {
  id: string
  title: string
  type: 'youtube' | 'pdf' | 'quiz' | 'reading' | 'video-playlist' | 'pdf-collection'
  url?: string
  duration?: string
  size?: string
  pages?: number
  description?: string
  completed?: boolean
}

export interface Topic {
  id: string
  title: string
  description?: string
  contentItems: ContentItem[]
  estimatedTime?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  completed?: boolean
}

export interface Chapter {
  id: string
  title: string
  description?: string
  topics: Topic[]
  progress: number
  status: 'completed' | 'current' | 'locked'
  estimatedTime?: string
  totalItems?: number
  completedItems?: number
}

export interface LMSData {
  chapters: Chapter[]
  overallProgress: number
}
