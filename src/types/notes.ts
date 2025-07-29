
export interface Note {
  id: string
  title: string
  fileName: string
  fileUrl: string
  fileSize: string
  uploadedAt: string
  fileType: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx'
}

export interface NotesChapter {
  id: string
  title: string
  description?: string
  notes: Note[]
}

export interface NotesData {
  subjectId: string
  subjectName: string
  chapters: NotesChapter[]
}
