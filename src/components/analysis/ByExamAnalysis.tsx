
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Trophy } from 'lucide-react'
import { mockAnalysisData } from '@/data/mockAnalysis'

export function ByExamAnalysis() {
  const data = mockAnalysisData.examAnalysis

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800'
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Exam-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Exam Title</TableHead>
                  <TableHead className="min-w-[120px]">Subject</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Percentage</TableHead>
                  <TableHead className="text-center">Correct</TableHead>
                  <TableHead className="text-center">Wrong</TableHead>
                  <TableHead className="text-center">Not Answered</TableHead>
                  <TableHead className="text-center">Time Taken</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((exam) => (
                  <TableRow key={exam.examId} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{exam.examTitle}</TableCell>
                    <TableCell className="font-medium text-muted-foreground">
                      {exam.subjectName}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {exam.score}/{exam.totalMarks}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={getPercentageColor(exam.percentage)}>
                        {exam.percentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {exam.correct}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {exam.wrong}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        {exam.notAnswered}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{exam.timeTaken}min</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{formatDate(exam.completionDate)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
