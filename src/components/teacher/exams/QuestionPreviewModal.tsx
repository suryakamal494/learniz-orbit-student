
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'
import type { QuestionFormData } from '@/types/questionBank'

interface QuestionPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  questionData: QuestionFormData
}

const QuestionPreviewModal: React.FC<QuestionPreviewModalProps> = ({
  isOpen,
  onClose,
  questionData
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Question Preview</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Question Metadata */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{questionData.chapter}</Badge>
            <Badge variant="outline">{questionData.topic}</Badge>
            <Badge className={getDifficultyColor(questionData.difficulty)}>
              {questionData.difficulty.charAt(0).toUpperCase() + questionData.difficulty.slice(1)}
            </Badge>
            <Badge variant="outline">{questionData.marks} marks</Badge>
          </div>

          {/* Question Content */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Question:</h3>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: questionData.questionContent.text || 'No question text provided' }}
                  />
                </div>

                {/* Options */}
                {questionData.options && questionData.options.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Options:</h4>
                    <div className="space-y-2">
                      {questionData.options.map((option, index) => (
                        <div 
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded-lg border ${
                            questionData.correctAnswer === index 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          {questionData.correctAnswer === index ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <span className="font-medium mr-2">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <span>{option.text || `Option ${index + 1}`}</span>
                            {questionData.correctAnswer === index && (
                              <Badge className="ml-2 bg-green-600 text-white">Correct</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation */}
                {questionData.explanationContent?.text && (
                  <div>
                    <h4 className="font-medium mb-3">Explanation:</h4>
                    <div 
                      className="prose prose-sm max-w-none p-4 bg-blue-50 rounded-lg"
                      dangerouslySetInnerHTML={{ __html: questionData.explanationContent.text }}
                    />
                  </div>
                )}

                {/* Hint */}
                {questionData.hint && (
                  <div>
                    <h4 className="font-medium mb-3">Hint:</h4>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-700">{questionData.hint}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuestionPreviewModal
