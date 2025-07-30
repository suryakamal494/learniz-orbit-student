
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, FileText, ExternalLink, Calendar } from "lucide-react"
import type { NotesData, Note } from '@/types/notes'

interface NotesContainerProps {
  data: NotesData
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-4 w-4 text-red-600 flex-shrink-0" />
    case 'doc':
    case 'docx':
      return <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
    case 'ppt':
    case 'pptx':
      return <FileText className="h-4 w-4 text-orange-600 flex-shrink-0" />
    default:
      return <FileText className="h-4 w-4 text-gray-600 flex-shrink-0" />
  }
}

const getFileTypeColor = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'doc':
    case 'docx':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'ppt':
    case 'pptx':
      return 'bg-orange-50 text-orange-700 border-orange-200'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

export const NotesContainer: React.FC<NotesContainerProps> = ({ data, subjectColor }) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const openNote = (note: Note) => {
    // Open note in new tab
    window.open(note.fileUrl, '_blank')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Study Notes & Materials</CardTitle>
        <p className="text-sm text-muted-foreground">
          Access chapter-wise notes and study materials for {data.subjectName}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.chapters.map((chapter) => (
            <Collapsible key={chapter.id}>
              <div className={`
                rounded-lg border-2 transition-all duration-300 overflow-hidden
                ${subjectColor.bg} ${subjectColor.border}
              `}>
                <CollapsibleTrigger 
                  className="w-full p-4 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  {/* Mobile Layout */}
                  <div className="block md:hidden">
                    <div className="flex items-start gap-3 mb-2">
                      <FileText className={`h-5 w-5 ${subjectColor.primary} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1 text-left break-words">
                          {chapter.title}
                        </h3>
                        {chapter.description && (
                          <p className="text-sm text-muted-foreground text-left break-words">
                            {chapter.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {expandedChapters.includes(chapter.id) ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="ml-8">
                      <Badge variant="outline" className="text-xs">
                        {chapter.notes.length} notes
                      </Badge>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <FileText className={`h-5 w-5 ${subjectColor.primary}`} />
                      <div>
                        <h3 className="font-semibold text-base mb-1">{chapter.title}</h3>
                        {chapter.description && (
                          <p className="text-sm text-muted-foreground">{chapter.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {chapter.notes.length} notes
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedChapters.includes(chapter.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="animate-accordion-down">
                  <div className="px-4 pb-4">
                    <div className="space-y-3 ml-0 md:ml-8">
                      {chapter.notes.map((note) => (
                        <div 
                          key={note.id}
                          className="bg-white/60 rounded-lg border border-white/80 p-3 md:p-4 hover:bg-white/80 transition-colors group cursor-pointer overflow-hidden"
                          onClick={() => openNote(note)}
                        >
                          {/* Mobile Layout */}
                          <div className="block md:hidden">
                            <div className="flex items-start gap-3 mb-2">
                              {getFileIcon(note.fileType)}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm mb-1 break-words">
                                  {note.title}
                                </h4>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openNote(note)
                                }}
                                className="h-8 w-8 p-0 flex-shrink-0"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 ml-7 flex-wrap">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {note.fileSize}
                              </span>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatDate(note.uploadedAt)}
                                </span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs px-2 py-0.5 ${getFileTypeColor(note.fileType)}`}
                              >
                                {note.fileType.toUpperCase()}
                              </Badge>
                            </div>
                          </div>

                          {/* Desktop Layout */}
                          <div className="hidden md:flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {getFileIcon(note.fileType)}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm mb-1 truncate">
                                  {note.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>{note.fileSize}</span>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(note.uploadedAt)}</span>
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs px-2 py-0.5 ${getFileTypeColor(note.fileType)}`}
                                  >
                                    {note.fileType.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openNote(note)
                                }}
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
