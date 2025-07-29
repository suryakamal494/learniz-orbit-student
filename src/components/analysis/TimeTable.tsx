
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockAnalysisData } from '@/data/mockAnalysis'

export function TimeTable() {
  const data = mockAnalysisData.timeAnalysis

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getEfficiencyColor = (spentTime: number, totalTime: number) => {
    const percentage = (spentTime / totalTime) * 100
    if (percentage <= 80) return 'bg-green-100 text-green-800'
    if (percentage <= 95) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Time Analysis Summary</CardTitle>
        <p className="text-sm text-muted-foreground">Time shown in minutes:seconds</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Subject</TableHead>
                <TableHead className="text-center">Spent on Correct</TableHead>
                <TableHead className="text-center">Spent on Wrong</TableHead>
                <TableHead className="text-center">Total Time</TableHead>
                <TableHead className="text-center">Spent Time</TableHead>
                <TableHead className="text-center">Efficiency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((subject) => (
                <TableRow key={subject.subjectId} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{subject.subjectName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {formatTime(subject.spentOnCorrect)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {formatTime(subject.spentOnWrong)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {formatTime(subject.totalTime)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={getEfficiencyColor(subject.spentTime, subject.totalTime)}>
                      {formatTime(subject.spentTime)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={getEfficiencyColor(subject.spentTime, subject.totalTime)}>
                      {((subject.spentTime / subject.totalTime) * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
