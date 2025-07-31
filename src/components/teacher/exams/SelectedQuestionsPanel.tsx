
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Trash2, Eye, Save, ListChecks } from 'lucide-react'
import type { Question } from '@/types/questionBank'

interface SelectedQuestionsPanelProps {
  selectedQuestions: Question[]
  totalMarks: number
  onRemoveQuestion: (questionId: string) => void
  onUpdateExam: () => void
  onPreviewQuestion: (question: Question) => void
}

export function SelectedQuestionsPanel({
  selectedQuestions,
  totalMarks,
  onRemoveQuestion,
  onUpdateExam,
  onPreviewQuestion
}: SelectedQuestionsPanelProps) {
  
  console.log('SelectedQuestionsPanel: Component is rendering with', selectedQuestions?.length || 0, 'selected questions')
  console.log('SelectedQuestionsPanel: Total marks:', totalMarks)
  
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

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="h-5 w-5" />
          Selected Questions
        </CardTitle>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Total:</span>
            <Badge variant="outline" className="font-semibold">
              {totalMarks} marks
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {selectedQuestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ListChecks className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No questions selected</p>
            <p className="text-sm">Add questions from the left panel</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Questions Table */}
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">S.No</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead className="w-[80px]">Marks</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedQuestions.map((question, index) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div
                            className="text-sm cursor-pointer hover:text-blue-600"
                            onClick={() => onPreviewQuestion(question)}
                            dangerouslySetInnerHTML={{
                              __html: truncateText(question.questionContent.text || question.questionContent.html)
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={getDifficultyColor(question.difficulty)}
                            >
                              {question.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {question.chapter}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.marks}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onPreviewQuestion(question)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onRemoveQuestion(question.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button
                onClick={onUpdateExam}
                disabled={selectedQuestions.length === 0}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Update Exam ({selectedQuestions.length} questions)
              </Button>
              
              <div className="text-xs text-gray-500 text-center">
                This will replace existing questions in the exam
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
