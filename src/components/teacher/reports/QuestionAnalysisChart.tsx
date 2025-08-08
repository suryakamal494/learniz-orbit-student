
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Question-wise Performance Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Detailed breakdown showing how students performed on each question
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {questionAnalysis.map((question) => {
            const data = [
              { name: 'correct', value: question.correctCount, fill: COLORS.correct },
              { name: 'wrong', value: question.wrongCount, fill: COLORS.wrong },
              { name: 'skipped', value: question.skippedCount, fill: COLORS.skipped }
            ].filter(item => item.value > 0) // Only show segments with values

            return (
              <div key={question.questionId} className="border rounded-lg p-6 bg-gray-50">
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">
                    Question {question.questionNumber}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {question.questionText}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Donut Chart */}
                  <div className="h-64 flex items-center justify-center">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0]
                              const value = typeof data.value === 'number' ? data.value : 0
                              const percentage = ((value / question.totalStudents) * 100).toFixed(1)
                              return (
                                <div className="bg-white p-3 border rounded shadow-lg">
                                  <p className="font-medium capitalize">{data.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {value} students ({percentage}%)
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  
                  {/* Statistics */}
                  <div className="space-y-4 flex flex-col justify-center">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">Correct</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {question.correctCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              {question.correctPercentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium">Wrong</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">
                              {question.wrongCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              {((question.wrongCount / question.totalStudents) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                            <span className="text-sm font-medium">Skipped</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-amber-600">
                              {question.skippedCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              {((question.skippedCount / question.totalStudents) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {question.totalStudents}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Students
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
