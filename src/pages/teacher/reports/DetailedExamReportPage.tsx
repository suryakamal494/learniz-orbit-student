
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, BookOpen, Target, TrendingUp, Clock } from 'lucide-react'
import { getDetailedExamReport } from '@/data/mockBatchReports'
import { StudentPerformanceMatrix } from '@/components/teacher/reports/StudentPerformanceMatrix'
import { QuestionAnalysisChart } from '@/components/teacher/reports/QuestionAnalysisChart'
import { format } from 'date-fns'

export default function DetailedExamReportPage() {
  const { batchId, examId } = useParams<{ batchId: string; examId: string }>()
  const navigate = useNavigate()

  const reportData = examId ? getDetailedExamReport(examId) : null

  if (!reportData) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/teacher/reports/batch')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
        </div>
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="text-4xl">📊</div>
              <h3 className="text-lg font-medium">Report not found</h3>
              <p className="text-muted-foreground">
                The exam report you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { examReport, studentResults, questionAnalysis } = reportData

  // Calculate additional stats
  const totalMarks = questionAnalysis.length * 5 // Assuming 5 marks per question
  const avgMarks = (examReport.averagePerformance / 100) * totalMarks
  const passedStudents = studentResults.filter(s => s.passed).length

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/teacher/reports/batch')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{examReport.examTitle}</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {examReport.batchName} • {format(new Date(examReport.date), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examReport.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examReport.totalQuestions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Marks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMarks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examReport.averagePerformance.toFixed(1)}%</div>
            <Badge className={examReport.averagePerformance >= 75 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {examReport.averagePerformance >= 75 ? "Good" : "Needs Improvement"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Percentage</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examReport.passPercentage.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">
              {passedStudents}/{examReport.totalStudents} passed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Marks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMarks.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">
              out of {totalMarks}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Performance Matrix */}
      <StudentPerformanceMatrix
        studentResults={studentResults}
        questionAnalysis={questionAnalysis}
      />

      {/* Question Analysis */}
      <QuestionAnalysisChart questionAnalysis={questionAnalysis} />
    </div>
  )
}
