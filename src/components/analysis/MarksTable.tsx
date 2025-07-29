
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockAnalysisData } from '@/data/mockAnalysis'

export function MarksTable() {
  const data = mockAnalysisData.marksAnalysis

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800'
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Marks Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Subject</TableHead>
                <TableHead className="text-center">Correct</TableHead>
                <TableHead className="text-center">Wrong</TableHead>
                <TableHead className="text-center">Not Answered</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((subject) => (
                <TableRow key={subject.subjectId} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{subject.subjectName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {subject.correct}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {subject.wrong}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                      {subject.notAnswered}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {subject.total}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={getPercentageColor(subject.percentage)}>
                      {subject.percentage.toFixed(1)}%
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
