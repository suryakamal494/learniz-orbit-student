
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RichContentDisplay } from '@/components/ui/rich-content-display'
import { FileText, Edit, Calendar, User, Tag } from 'lucide-react'
import type { Instruction } from '@/types/instruction'

interface InstructionPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  instruction: Instruction | null
  onEdit?: (instructionId: string) => void
}

const InstructionPreviewModal: React.FC<InstructionPreviewModalProps> = ({
  isOpen,
  onClose,
  instruction,
  onEdit
}) => {
  if (!instruction) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeColor = (type: string) => {
    return type === 'general' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Instruction Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Instruction Header */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              {instruction.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap gap-2">
              <Badge className={getTypeColor(instruction.type)}>
                {instruction.type === 'general' ? 'General' : 'Subject Specific'}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {instruction.subject}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created: {formatDate(instruction.createdAt)}
              </div>
              {instruction.createdAt !== instruction.updatedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Updated: {formatDate(instruction.updatedAt)}
                </div>
              )}
            </div>
          </div>

          {/* Instruction Content */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Instruction Content</h3>
              <div className="prose prose-sm max-w-none">
                <RichContentDisplay 
                  content={instruction.content}
                  className="text-foreground"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t">
            {onEdit && (
              <Button 
                onClick={() => onEdit(instruction.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Instruction
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InstructionPreviewModal
