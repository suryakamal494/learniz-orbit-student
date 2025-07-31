
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Eye, BookOpen, Target, Award } from 'lucide-react'
import type { Question } from '@/types/questionBank'

interface QuestionListPanelProps {
  questions: Question[]
  selectedQuestionIds: string[]
  onAddQuestion: (question: Question) => void
  onPreviewQuestion: (question: Question) => void
}

export function QuestionListPanel({
  questions,
  selectedQuestionIds,
  onAddQuestion,
  onPreviewQuestion
}: QuestionListPanelProps) {
  
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

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Available Questions ({questions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No questions match your current filters</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {questions.map((question) => {
                const isSelected = selectedQuestionIds.includes(question.id)
                
                return (
                  <div
                    key={question.id}
                    className={`border rounded-lg p-4 transition-all ${
                      isSelected 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Question Preview */}
                        <div className="mb-3">
                          <div
                            className="text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                            onClick={() => onPreviewQuestion(question)}
                            dangerouslySetInnerHTML={{
                              __html: truncateText(question.questionContent.text || question.questionContent.html)
                            }}
                          />
                        </div>

                        {/* Question Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            variant="outline"
                            className={getDifficultyColor(question.difficulty)}
                          >
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          </Badge>
                          <Badge variant="outline">{question.category}</Badge>
                          <Badge variant="outline">{question.marks} marks</Badge>
                        </div>

                        {/* Chapter/Topic Info */}
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {question.chapter}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {question.topic}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onPreviewQuestion(question)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onAddQuestion(question)}
                          disabled={isSelected}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          {isSelected ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
