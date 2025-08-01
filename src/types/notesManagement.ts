
export interface NotesItem {
  id: string
  title: string
  fileName: string
  fileUrl: string
  fileType: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'jpg' | 'jpeg' | 'png'
  fileSize: string
  uploadedAt: string
  subject: string
  chapter: string
  topic?: string
  description?: string
  createdBy: string
  updatedAt: string
}

export interface NotesFilters {
  search: string
  subject: string
  chapter: string
  topic: string
  fileType: string
  dateRange: {
    from?: string
    to?: string
  }
}
