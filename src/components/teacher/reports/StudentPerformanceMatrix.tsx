
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Student Performance Matrix</CardTitle>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Correct (C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Wrong (W)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-600 rounded"></div>
              <span>Skipped (S)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-max">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-3 bg-gray-100 font-semibold text-left sticky left-0 z-10 min-w-[120px]">
                    Question #
                  </th>
                  {studentResults.map((student) => (
                    <th
                      key={student.studentId}
                      className="border border-gray-300 p-3 bg-gray-100 font-semibold text-center min-w-[140px] text-sm"
                    >
                      <div className="truncate" title={student.studentName}>
                        {student.studentName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {questionAnalysis.map((question) => (
                  <tr key={question.questionId} className="hover:bg-gray-50">
                    <td
                      className={cn(
                        "border border-gray-300 p-3 font-semibold text-center cursor-pointer transition-all duration-200 sticky left-0 z-10 bg-white",
                        hoveredQuestion === question.questionNumber
                          ? "bg-blue-50 shadow-md"
                          : ""
                      )}
                      onMouseEnter={() => setHoveredQuestion(question.questionNumber)}
                      onMouseLeave={() => setHoveredQuestion(null)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center">
                            <span className="text-blue-600 hover:text-blue-800 font-bold">
                              Q{question.questionNumber}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          className="max-w-md p-4 bg-white border-2 border-gray-200 shadow-lg"
                        >
                          <div>
                            <p className="font-bold mb-2 text-gray-800">
                              Question {question.questionNumber}:
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {question.questionText}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    {studentResults.map((student) => {
                      const answer = student.answers.find(
                        (a) => a.questionNumber === question.questionNumber
                      )
                      return (
                        <td key={student.studentId} className="border border-gray-300 p-2">
                          <div className="flex justify-center">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm transition-all duration-200 hover:scale-110",
                                answer ? getStatusColor(answer.status) : "bg-gray-300"
                              )}
                            >
                              {answer ? getStatusText(answer.status) : '-'}
                            </div>
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
