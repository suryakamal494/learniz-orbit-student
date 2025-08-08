
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { StudentExamResult, QuestionAnalysis } from '@/types/batchReport'
import { cn } from '@/lib/utils'

interface StudentPerformanceMatrixProps {
  studentResults: StudentExamResult[]
  questionAnalysis: QuestionAnalysis[]
}

export function StudentPerformanceMatrix({ studentResults, questionAnalysis }: StudentPerformanceMatrixProps) {
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null)

  const getStatusColor = (status: 'correct' | 'wrong' | 'skipped') => {
    switch (status) {
      case 'correct':
        return 'bg-green-500'
      case 'wrong':
        return 'bg-red-500'
      case 'skipped':
        return 'bg-amber-600'
      default:
        return 'bg-gray-300'
    }
  }

  const getStatusText = (status: 'correct' | 'wrong' | 'skipped') => {
    switch (status) {
      case 'correct':
        return 'C'
      case 'wrong':
        return 'W'
      case 'skipped':
        return 'S'
      default:
        return '-'
    }
  }

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Student Performance Matrix</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Wrong</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-600 rounded"></div>
              <span>Skipped</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted font-medium text-left min-w-[100px]">
                    Question #
                  </th>
                  {studentResults.map((student) => (
                    <th
                      key={student.studentId}
                      className="border p-2 bg-muted font-medium text-center min-w-[120px] text-sm"
                    >
                      {student.studentName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {questionAnalysis.map((question) => (
                  <tr key={question.questionId}>
                    <td
                      className={cn(
                        "border p-2 font-medium text-center cursor-pointer transition-colors",
                        hoveredQuestion === question.questionNumber
                          ? "bg-blue-100"
                          : "bg-gray-50"
                      )}
                      onMouseEnter={() => setHoveredQuestion(question.questionNumber)}
                      onMouseLeave={() => setHoveredQuestion(null)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>Q{question.questionNumber}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md p-4">
                          <p className="font-medium mb-2">Question {question.questionNumber}:</p>
                          <p className="text-sm">{question.questionText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    {studentResults.map((student) => {
                      const answer = student.answers.find(
                        (a) => a.questionNumber === question.questionNumber
                      )
                      return (
                        <td key={student.studentId} className="border p-1">
                          <div
                            className={cn(
                              "w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold mx-auto",
                              answer ? getStatusColor(answer.status) : "bg-gray-300"
                            )}
                          >
                            {answer ? getStatusText(answer.status) : '-'}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
