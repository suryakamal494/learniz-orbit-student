
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { QuestionAnalysis } from '@/types/batchReport'

interface QuestionAnalysisChartProps {
  questionAnalysis: QuestionAnalysis[]
}

const COLORS = {
  correct: '#22c55e',
  wrong: '#ef4444',
  skipped: '#d97706'
}

export function QuestionAnalysisChart({ questionAnalysis }: QuestionAnalysisChartProps) {
  const chartConfig = {
    correct: {
      label: "Correct",
      color: COLORS.correct,
    },
    wrong: {
      label: "Wrong",
      color: COLORS.wrong,
    },
    skipped: {
      label: "Skipped",
      color: COLORS.skipped,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question-wise Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {questionAnalysis.map((question) => {
            const data = [
              { name: 'correct', value: question.correctCount, fill: COLORS.correct },
              { name: 'wrong', value: question.wrongCount, fill: COLORS.wrong },
              { name: 'skipped', value: question.skippedCount, fill: COLORS.skipped }
            ]

            return (
              <div key={question.questionId} className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">
                    Question {question.questionNumber}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {question.questionText}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-48">
                    <ChartContainer config={chartConfig}>
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-sm">Correct</span>
                      </div>
                      <div className="text-sm font-medium">
                        {question.correctCount} ({question.correctPercentage.toFixed(1)}%)
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className="text-sm">Wrong</span>
                      </div>
                      <div className="text-sm font-medium">
                        {question.wrongCount} ({((question.wrongCount / question.totalStudents) * 100).toFixed(1)}%)
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-600 rounded"></div>
                        <span className="text-sm">Skipped</span>
                      </div>
                      <div className="text-sm font-medium">
                        {question.skippedCount} ({((question.skippedCount / question.totalStudents) * 100).toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
