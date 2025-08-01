
import React, { useState } from 'react'
import { TeacherLayout } from '@/components/teacher/layout/TeacherLayout'
import { TeacherDataWrapper } from '@/components/teacher/ui/TeacherDataWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  FileText,
  File,
  Image,
  Eye,
  Edit,
  Calendar,
  User,
  FolderOpen
} from 'lucide-react'
import { mockNotesData } from '@/data/mockNotesManagement'
import type { NotesItem, NotesFilters } from '@/types/notesManagement'

const NotesManagementPage: React.FC = () => {
  const [notesData] = useState<NotesItem[]>(mockNotesData)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)
  const [filters, setFilters] = useState<NotesFilters>({
    search: '',
    subject: '',
    chapter: '',
    topic: '',
    fileType: '',
    dateRange: {}
  })
  const [previewNote, setPreviewNote] = useState<NotesItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredNotes = notesData.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         note.fileName.toLowerCase().includes(filters.search.toLowerCase())
    const matchesSubject = !filters.subject || note.subject === filters.subject
    const matchesChapter = !filters.chapter || note.chapter === filters.chapter
    const matchesTopic = !filters.topic || note.topic === filters.topic
    const matchesFileType = !filters.fileType || note.fileType === filters.fileType

    return matchesSearch && matchesSubject && matchesChapter && matchesTopic && matchesFileType
  })

  const getFileIcon = (fileType: string) => {
    const iconClasses = "h-5 w-5"
    switch (fileType) {
      case 'pdf':
        return <FileText className={`${iconClasses} text-red-500`} />
      case 'doc':
      case 'docx':
        return <File className={`${iconClasses} text-blue-500`} />
      case 'ppt':
      case 'pptx':
        return <File className={`${iconClasses} text-orange-500`} />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className={`${iconClasses} text-green-500`} />
      default:
        return <File className={`${iconClasses} text-gray-500`} />
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-red-100 text-red-800'
      case 'doc':
      case 'docx':
        return 'bg-blue-100 text-blue-800'
      case 'ppt':
      case 'pptx':
        return 'bg-orange-100 text-orange-800'
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handlePreview = (note: NotesItem) => {
    setPreviewNote(note)
    setIsPreviewOpen(true)
  }

  const handleEdit = (note: NotesItem) => {
    console.log('Edit note:', note)
    // TODO: Navigate to edit page
  }

  const subjects = Array.from(new Set(notesData.map(note => note.subject)))
  const chapters = Array.from(new Set(notesData.filter(note => !filters.subject || note.subject === filters.subject).map(note => note.chapter)))
  const topics = Array.from(new Set(notesData.filter(note => (!filters.subject || note.subject === filters.subject) && (!filters.chapter || note.chapter === filters.chapter)).map(note => note.topic).filter(Boolean)))

  return (
    <TeacherLayout>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Notes Management</h1>
              <p className="text-muted-foreground">Manage and organize your educational notes</p>
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Upload Notes
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.subject || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value === 'all' ? '' : value, chapter: '', topic: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.chapter || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, chapter: value === 'all' ? '' : value, topic: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chapters</SelectItem>
                  {chapters.map(chapter => (
                    <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.topic || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, topic: value === 'all' ? '' : value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.fileType || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, fileType: value === 'all' ? '' : value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">DOC</SelectItem>
                  <SelectItem value="docx">DOCX</SelectItem>
                  <SelectItem value="ppt">PPT</SelectItem>
                  <SelectItem value="pptx">PPTX</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notes Grid */}
        <TeacherDataWrapper
          data={filteredNotes}
          loading={loading}
          error={error}
          emptyTitle="No Notes Found"
          emptyDescription="No notes match your current filters. Try adjusting your search criteria."
          emptyIcon={<FolderOpen className="text-4xl text-muted-foreground" />}
        >
          {(notes) => (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Card key={note.id} className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getFileIcon(note.fileType)}
                          <Badge className={getFileTypeColor(note.fileType)}>
                            {note.fileType.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {note.fileSize}
                        </div>
                      </div>

                      {/* Title and Description */}
                      <div>
                        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">
                          {note.title}
                        </h3>
                        {note.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {note.description}
                          </p>
                        )}
                      </div>

                      {/* Subject/Chapter/Topic */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {note.subject}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {note.chapter}
                        </Badge>
                        {note.topic && (
                          <Badge variant="outline" className="text-xs">
                            {note.topic}
                          </Badge>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>{note.createdBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(note.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreview(note)}
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(note)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TeacherDataWrapper>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {previewNote && getFileIcon(previewNote.fileType)}
                {previewNote?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-auto">
              {previewNote && (
                <div className="space-y-4">
                  {/* File info */}
                  <div className="flex flex-wrap gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium">File:</span> {previewNote.fileName}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Size:</span> {previewNote.fileSize}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Type:</span> {previewNote.fileType.toUpperCase()}
                    </div>
                  </div>

                  {/* Content preview */}
                  <div className="min-h-96 flex items-center justify-center bg-muted/10 rounded-lg">
                    {previewNote.fileType === 'pdf' ? (
                      <iframe
                        src={previewNote.fileUrl}
                        className="w-full h-96 border-0"
                        title={previewNote.title}
                      />
                    ) : previewNote.fileType.includes('image') || ['jpg', 'jpeg', 'png'].includes(previewNote.fileType) ? (
                      <img
                        src={previewNote.fileUrl}
                        alt={previewNote.title}
                        className="max-w-full max-h-96 object-contain"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <File className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">Preview not available for this file type</p>
                        <Button asChild>
                          <a href={previewNote.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download File
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  )
}

export default NotesManagementPage
