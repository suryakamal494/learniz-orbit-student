
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { X, Save, Calculator, Trophy, BookOpen, Clock, Trash2 } from 'lucide-react'
import type { Question } from '@/types/questionBank'

interface SelectedQuestion extends Question {
  addedAt: Date
}

interface SelectedQuestionsPanelProps {
  selectedQuestions: SelectedQuestion[]
  totalMarks: number
  onRemoveQuestion: (questionId: string) => void
  onUpdateExam: () => void
  isLoading: boolean
}

export const SelectedQuestionsPanel: React.FC<SelectedQuestionsPanelProps> = ({
  selectedQuestions,
  totalMarks,
  onRemoveQuestion,
  onUpdateExam,
  isLoading
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

  const truncateText = (text: string, maxLength: number = 80) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const difficultyStats = {
    easy: selectedQuestions.filter(q => q.difficulty === 'easy').length,
    medium: selectedQuestions.filter(q => q.difficulty === 'medium').length,
    hard: selectedQuestions.filter(q => q.difficulty === 'hard').length,
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sticky Header */}
      <div className="flex-shrink-0 p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Selected Questions</h3>
            <Badge variant="secondary" className="text-xs">
              {selectedQuestions.length}
            </Badge>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="space-y-3">
          {/* Total Marks */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Total Marks</span>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 font-bold">
              {totalMarks}
            </Badge>
          </div>

          {/* Difficulty Distribution */}
          {selectedQuestions.length > 0 && (
            <div className="p-3 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty Distribution</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-green-700">{difficultyStats.easy}</div>
                  <div className="text-gray-600">Easy</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-yellow-700">{difficultyStats.medium}</div>
                  <div className="text-gray-600">Medium</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-700">{difficultyStats.hard}</div>
                  <div className="text-gray-600">Hard</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {selectedQuestions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-400 mb-2">No questions selected</h4>
              <p className="text-gray-500 text-sm">
                Add questions from the browser to build your exam
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedQuestions.map((question, index) => (
                <Card key={question.id} className="border border-border/50 hover:border-border transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {/* Question Number */}
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium text-gray-900 leading-tight">
                          {truncateText(question.questionContent.text, 100)}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {question.chapter}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(question.difficulty)}`}
                          >
                            {question.difficulty}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Trophy className="h-3 w-3" />
                            <span>{question.marks} marks</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Added {question.addedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveQuestion(question.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-red-600 p-1 h-auto"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Sticky Footer with Update Button */}
      <div className="flex-shrink-0 p-4 border-t bg-white">
        {selectedQuestions.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <Button
              onClick={onUpdateExam}
              disabled={selectedQuestions.length === 0 || isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Updating Exam...' : `Update Exam (${selectedQuestions.length} questions)`}
            </Button>
          </div>
        )}
        
        {selectedQuestions.length > 0 && (
          <div className="mt-3 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectedQuestions.forEach(q => onRemoveQuestion(q.id))}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
