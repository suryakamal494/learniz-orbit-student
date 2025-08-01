
export type LMSContentType = 'text' | 'file' | 'pdf' | 'image' | 'video-url' | 'iframe'

export interface LMSContentItem {
  id: string
  title: string
  type: LMSContentType
  institute: string
  subject: string
  chapter: string
  topic: string
  content: string
  url?: string
  description?: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface LMSContentFilters {
  institute?: string
  contentType?: LMSContentType
  subject?: string
  chapter?: string
  topic?: string
  search?: string
}

export interface Institute {
  id: string
  name: string
}

export interface Subject {
  id: string
  name: string
  instituteId: string
}

export interface Chapter {
  id: string
  name: string
  subjectId: string
}

export interface Topic {
  id: string
  name: string
  chapterId: string
}
