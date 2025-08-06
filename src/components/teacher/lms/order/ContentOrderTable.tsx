
import React, { useState } from 'react'
import { Eye, GripVertical, FileText, Video, Image, Globe } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { ContentPreviewModal } from '@/components/teacher/lms/update/ContentPreviewModal'
import { LMSContentItem } from '@/types/lmsContent'
import { ExamData } from '@/types/exam'

interface ContentItemWithOrder extends LMSContentItem {
  order: number
  assignedQuizId?: string
}

interface ContentOrderTableProps {
  contentItems: ContentItemWithOrder[]
  availableExams: ExamData[]
  onReorder: (dragIndex: number, hoverIndex: number) => void
  onQuizAssignment: (contentId: string, quizId: string | undefined) => void
}

export const ContentOrderTable: React.FC<ContentOrderTableProps> = ({
  contentItems,
  availableExams,
  onReorder,
  onQuizAssignment
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [previewItem, setPreviewItem] = useState<LMSContentItem | null>(null)

  const getTypeIcon = (type: string) => {
    const iconProps = "h-4 w-4"
    switch (type) {
      case 'video-url':
        return <Video className={`${iconProps} text-blue-600`} />
      case 'pdf':
        return <FileText className={`${iconProps} text-red-600`} />
      case 'image':
        return <Image className={`${iconProps} text-green-600`} />
      case 'iframe':
        return <Globe className={`${iconProps} text-purple-600`} />
      default:
        return <FileText className={`${iconProps} text-gray-600`} />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video-url':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pdf':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'image':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'iframe':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const canPreview = (type: string) => {
    return ['video-url', 'pdf', 'image'].includes(type)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedItem !== null && draggedItem !== dropIndex) {
      onReorder(draggedItem, dropIndex)
    }
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <>
      <div className="space-y-4">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-24">Preview</TableHead>
                  <TableHead className="w-32">Type</TableHead>
                  <TableHead className="w-48">Quiz Assignment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentItems.map((item, index) => (
                  <TableRow
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`
                      cursor-move transition-all duration-200
                      ${draggedItem === index ? 'opacity-50 scale-95' : ''}
                      ${draggedItem !== null && draggedItem !== index ? 'hover:bg-blue-50' : ''}
                      hover:bg-gray-50
                    `}
                  >
                    <TableCell>
                      <GripVertical className="h-5 w-5 text-gray-400" />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {item.order}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        {item.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {item.description.length > 60 
                              ? `${item.description.substring(0, 60)}...`
                              : item.description
                            }
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {canPreview(item.type) ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPreviewItem(item)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <Badge className={getTypeBadgeColor(item.type)}>
                          {item.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.assignedQuizId || 'no-quiz'}
                        onValueChange={(value) => 
                          onQuizAssignment(item.id, value === 'no-quiz' ? undefined : value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Assign Quiz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-quiz">No Quiz</SelectItem>
                          {availableExams.map(exam => (
                            <SelectItem key={exam.id} value={exam.id}>
                              {exam.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {contentItems.map((item, index) => (
            <Card
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                p-4 cursor-move transition-all duration-200
                ${draggedItem === index ? 'opacity-50 scale-95' : ''}
                ${draggedItem !== null && draggedItem !== index ? 'hover:bg-blue-50' : ''}
              `}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <Badge variant="outline" className="font-mono">
                      {item.order}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {canPreview(item.type) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewItem(item)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description.length > 100 
                        ? `${item.description.substring(0, 100)}...`
                        : item.description
                      }
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <Badge className={getTypeBadgeColor(item.type)}>
                      {item.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Quiz Assignment
                  </label>
                  <Select
                    value={item.assignedQuizId || 'no-quiz'}
                    onValueChange={(value) => 
                      onQuizAssignment(item.id, value === 'no-quiz' ? undefined : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Assign Quiz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-quiz">No Quiz</SelectItem>
                      {availableExams.map(exam => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <ContentPreviewModal
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
          content={previewItem}
        />
      )}
    </>
  )
}
