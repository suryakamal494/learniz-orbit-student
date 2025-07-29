
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen } from 'lucide-react'
import { mockAnalysisData } from '@/data/mockAnalysis'

export function HistoryAnalysis() {
  const data = mockAnalysisData.history

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Study History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Total Exams</TableHead>
                  <TableHead className="text-center">Average Score</TableHead>
                  <TableHead className="text-center">Time Spent</TableHead>
                  <TableHead>Subjects Studied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((day, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(day.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {day.totalExams}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={getScoreColor(day.averageScore)}>
                        {day.averageScore.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{formatTime(day.timeSpent)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {day.subjectsStudied.map((subject, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {subject}
                          </Badge>
                        ))}
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
