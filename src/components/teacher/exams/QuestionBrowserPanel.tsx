
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Eye, BookOpen, Clock, Trophy, Search } from 'lucide-react'
import type { Question } from '@/types/questionBank'
import type { QuestionFilters } from '@/pages/teacher/exams/UpdateQuestionsPage'
import { QuestionPreviewModal } from '@/components/teacher/exams/QuestionPreviewModal'

interface QuestionBrowserPanelProps {
  questions: Question[]
  onAddQuestion: (question: Question) => void
  filters: QuestionFilters
}

export const QuestionBrowserPanel: React.FC<QuestionBrowserPanelProps> = ({
  questions,
  onAddQuestion,
  filters
}) => {
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'single':
        return 'Single Choice'
      case 'multiple':
        return 'Multiple Choice'
      case 'fillInBlanks':
        return 'Fill in Blanks'
      default:
        return type
    }
  }

  const truncateText = (text: string, maxLength: number = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const handlePreviewQuestion = (question: Question) => {
    setPreviewQuestion(question)
    setShowPreview(true)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewQuestion(null)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Question Browser</h3>
            <Badge variant="outline" className="text-xs">
              {questions.length} available
            </Badge>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No questions found</h4>
              <p className="text-gray-600">
                {Object.values(filters).some(value => value && value !== '') 
                  ? 'Try adjusting your filters to see more questions.'
                  : 'No questions are available at the moment.'
                }
              </p>
            </div>
          ) : (
            questions.map((question) => (
              <Card key={question.id} className="hover:shadow-md transition-all duration-200 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Question Content */}
                    <div className="flex-1 space-y-3">
                      {/* Question Text */}
                      <div>
                        <p className="font-medium text-gray-900 leading-relaxed">
                          {truncateText(question.questionContent.text)}
                        </p>
                      </div>

                      {/* Metadata Tags */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {question.chapter}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.topic}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs border ${getDifficultyColor(question.difficulty)}`}
                        >
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(question.type)}
                        </Badge>
                      </div>

                      {/* Question Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          <span>{question.marks} marks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Added {new Date(question.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreviewQuestion(question)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => onAddQuestion(question)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Question Preview Modal */}
      {previewQuestion && (
        <QuestionPreviewModal
          isOpen={showPreview}
          onClose={handleClosePreview}
          questionData={{
            questionContent: previewQuestion.questionContent,
            type: previewQuestion.type,
            options: previewQuestion.options,
            correctAnswer: Array.isArray(previewQuestion.correctAnswer) 
              ? previewQuestion.correctAnswer[0] 
              : previewQuestion.correctAnswer,
            explanationContent: previewQuestion.explanationContent,
            hint: previewQuestion.hint || '',
            marks: previewQuestion.marks,
            difficulty: previewQuestion.difficulty,
            category: previewQuestion.category,
            chapter: previewQuestion.chapter,
            topic: previewQuestion.topic,
            questionBankType: previewQuestion.category,
            numberOfOptions: previewQuestion.options.length
          }}
        />
      )}
    </div>
  )
}
