
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { mockAnalysisData } from '@/data/mockAnalysis'

const COLORS = {
  correct: '#10B981', // green
  wrong: '#EF4444', // red
  notAnswered: '#6B7280' // gray
}

export function SubjectPieCharts() {
  const data = mockAnalysisData.marksAnalysis

  const chartConfig = {
    correct: { label: 'Correct', color: COLORS.correct },
    wrong: { label: 'Wrong', color: COLORS.wrong },
    notAnswered: { label: 'Not Answered', color: COLORS.notAnswered }
  }

  const generateChartData = (subject: any) => [
    { name: 'Correct', value: subject.correct, count: subject.correct },
    { name: 'Wrong', value: subject.wrong, count: subject.wrong },
    { name: 'Not Answered', value: subject.notAnswered, count: subject.notAnswered }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Subject-wise Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.map((subject) => (
            <div key={subject.subjectId} className="space-y-4">
              <h3 className="text-center font-semibold text-sm">{subject.subjectName}</h3>
              <ChartContainer config={chartConfig} className="h-48">
                <PieChart>
                  <Pie
                    data={generateChartData(subject)}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {generateChartData(subject).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={Object.values(COLORS)[index]} 
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Count: {data.count}
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ChartContainer>
              <div className="flex justify-center">
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Correct: {subject.correct}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Wrong: {subject.wrong}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span>Not Answered: {subject.notAnswered}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
