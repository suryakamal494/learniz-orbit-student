
export interface DirectoryNode {
  id: string
  name: string
  type: 'subject' | 'chapter' | 'topic' | 'subtopic'
  questionCount: number
  children?: DirectoryNode[]
  parentId?: string
  isExpanded?: boolean
}

export interface DirectoryHierarchy {
  subjects: DirectoryNode[]
  totalQuestions: number
}
