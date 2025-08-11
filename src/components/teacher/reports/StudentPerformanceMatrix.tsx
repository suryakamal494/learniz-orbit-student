
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { StudentExamResult, QuestionAnalysis } from '@/types/batchReport'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'

interface StudentPerformanceMatrixProps {
  studentResults: StudentExamResult[]
  questionAnalysis: QuestionAnalysis[]
}

export function StudentPerformanceMatrix({ studentResults, questionAnalysis }: StudentPerformanceMatrixProps) {
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null)
  const [hoveredStudent, setHoveredStudent] = useState<string | null>(null)

  const getStatusColor = (status: 'correct' | 'wrong' | 'skipped') => {
    switch (status) {
      case 'correct':
        return 'bg-emerald-500 shadow-emerald-200'
      case 'wrong':
        return 'bg-red-500 shadow-red-200'
      case 'skipped':
        return 'bg-amber-500 shadow-amber-200'
      default:
        return 'bg-slate-300 shadow-slate-200'
    }
  }

  const getStatusIcon = (status: 'correct' | 'wrong' | 'skipped') => {
    switch (status) {
      case 'correct':
        return '✓'
      case 'wrong':
        return '✗'
      case 'skipped':
        return '–'
      default:
        return '?'
    }
  }

  const getStudentPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-emerald-600 bg-emerald-50"
    if (percentage >= 75) return "text-blue-600 bg-blue-50"
    if (percentage >= 65) return "text-amber-600 bg-amber-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4 p-4">
          {studentResults.map((student) => (
            <Card key={student.studentId} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {student.studentName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStudentPerformanceColor(student.percentage)} border font-medium`}>
                      {student.percentage.toFixed(1)}%
                    </Badge>
                    <Badge variant={student.passed ? "default" : "destructive"} className="text-xs">
                      {student.passed ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {student.answers.map((answer) => (
                    <Tooltip key={answer.questionId}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer",
                            getStatusColor(answer.status)
                          )}
                        >
                          <span className="text-xs">Q{answer.questionNumber}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border-2 border-slate-200 shadow-xl p-3">
                        <div className="space-y-2">
                          <p className="font-semibold text-slate-900">Question {answer.questionNumber}</p>
                          <p className="text-sm text-slate-600">Status: <span className="capitalize font-medium">{answer.status}</span></p>
                          {answer.timeSpent > 0 && (
                            <p className="text-sm text-slate-600">Time: {answer.timeSpent}s</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <table className="w-full border-collapse min-w-max bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                  <th className="border border-slate-300 p-4 bg-slate-100 font-bold text-left sticky left-0 z-20 min-w-[160px] shadow-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-slate-600" />
                      <span className="text-slate-800">Student Name</span>
                    </div>
                  </th>
                  {questionAnalysis.map((question) => (
                    <th
                      key={question.questionId}
                      className={cn(
                        "border border-slate-300 p-3 bg-slate-100 font-bold text-center min-w-[80px] transition-all duration-200 cursor-pointer hover:bg-slate-200",
                        hoveredQuestion === question.questionNumber
                          ? "bg-blue-100 shadow-lg z-10"
                          : ""
                      )}
                      onMouseEnter={() => setHoveredQuestion(question.questionNumber)}
                      onMouseLeave={() => setHoveredQuestion(null)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="space-y-1">
                            <div className="text-blue-700 font-bold text-sm">
                              Q{question.questionNumber}
                            </div>
                            <div className="text-xs text-slate-600">
                              {question.correctPercentage.toFixed(0)}%
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="bottom" 
                          className="max-w-md p-4 bg-white border-2 border-slate-200 shadow-xl"
                        >
                          <div className="space-y-3">
                            <p className="font-bold text-slate-900">
                              Question {question.questionNumber}
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {question.questionText}
                            </p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-emerald-600 font-medium">
                                ✓ {question.correctCount}
                              </span>
                              <span className="text-red-600 font-medium">
                                ✗ {question.wrongCount}
                              </span>
                              <span className="text-amber-600 font-medium">
                                – {question.skippedCount}
                              </span>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </th>
                  ))}
                  <th className="border border-slate-300 p-3 bg-slate-100 font-bold text-center min-w-[100px]">
                    <div className="space-y-1">
                      <div className="text-slate-800 text-sm">Score</div>
                      <div className="text-xs text-slate-600">(%)</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentResults.map((student, studentIndex) => (
                  <tr 
                    key={student.studentId} 
                    className={cn(
                      "hover:bg-slate-50 transition-colors duration-150",
                      studentIndex % 2 === 0 ? "bg-white" : "bg-slate-25",
                      hoveredStudent === student.studentId ? "bg-blue-50 shadow-sm" : ""
                    )}
                    onMouseEnter={() => setHoveredStudent(student.studentId)}
                    onMouseLeave={() => setHoveredStudent(null)}
                  >
                    <td className="border border-slate-300 p-4 font-semibold bg-white sticky left-0 z-10 shadow-sm">
                      <div className="space-y-2">
                        <div className="text-slate-900 font-medium">
                          {student.studentName}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStudentPerformanceColor(student.percentage)} border text-xs font-medium`}>
                            {student.percentage.toFixed(1)}%
                          </Badge>
                          <Badge 
                            variant={student.passed ? "default" : "destructive"} 
                            className="text-xs"
                          >
                            {student.passed ? "Pass" : "Fail"}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    {questionAnalysis.map((question) => {
                      const answer = student.answers.find(
                        (a) => a.questionNumber === question.questionNumber
                      )
                      return (
                        <td key={question.questionId} className="border border-slate-300 p-3">
                          <div className="flex justify-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer",
                                    answer ? getStatusColor(answer.status) : "bg-slate-300"
                                  )}
                                >
                                  {answer ? getStatusIcon(answer.status) : '?'}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-white border-2 border-slate-200 shadow-xl p-3">
                                <div className="space-y-2">
                                  <p className="font-semibold text-slate-900">
                                    {student.studentName} - Q{question.questionNumber}
                                  </p>
                                  {answer ? (
                                    <div className="space-y-1">
                                      <p className="text-sm text-slate-600">
                                        Status: <span className="capitalize font-medium">{answer.status}</span>
                                      </p>
                                      {answer.selectedAnswer && (
                                        <p className="text-sm text-slate-600">
                                          Selected: <span className="font-medium">{answer.selectedAnswer}</span>
                                        </p>
                                      )}
                                      <p className="text-sm text-slate-600">
                                        Correct: <span className="font-medium">{answer.correctAnswer}</span>
                                      </p>
                                      {answer.timeSpent > 0 && (
                                        <p className="text-sm text-slate-600">
                                          Time: <span className="font-medium">{answer.timeSpent}s</span>
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-slate-600">No response recorded</p>
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                      )
                    })}
                    <td className="border border-slate-300 p-3 bg-slate-50">
                      <div className="text-center space-y-1">
                        <div className={cn(
                          "text-lg font-bold",
                          student.passed ? "text-emerald-600" : "text-red-600"
                        )}>
                          {student.percentage.toFixed(1)}%
                        </div>
                        <div className="text-xs text-slate-600">
                          {student.totalScore}/{questionAnalysis.length * 5}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
