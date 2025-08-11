
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { QuestionAnalysis } from '@/types/batchReport'
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react'

interface QuestionAnalysisChartProps {
  questionAnalysis: QuestionAnalysis[]
}

const COLORS = {
  correct: '#10b981',
  wrong: '#ef4444',
  skipped: '#f59e0b'
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

  // Calculate overall statistics
  const totalCorrect = questionAnalysis.reduce((sum, q) => sum + q.correctCount, 0)
  const totalWrong = questionAnalysis.reduce((sum, q) => sum + q.wrongCount, 0)
  const totalSkipped = questionAnalysis.reduce((sum, q) => sum + q.skippedCount, 0)
  const totalResponses = totalCorrect + totalWrong + totalSkipped

  const overallStats = [
    { name: 'Correct', value: totalCorrect, percentage: (totalCorrect / totalResponses * 100).toFixed(1) },
    { name: 'Wrong', value: totalWrong, percentage: (totalWrong / totalResponses * 100).toFixed(1) },
    { name: 'Skipped', value: totalSkipped, percentage: (totalSkipped / totalResponses * 100).toFixed(1) }
  ]

  const getDifficultyBadge = (percentage: number) => {
    if (percentage >= 80) return { label: "Easy", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: TrendingUp }
    if (percentage >= 60) return { label: "Medium", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Minus }
    return { label: "Hard", color: "bg-red-100 text-red-800 border-red-200", icon: TrendingDown }
  }

  // Prepare data for bar chart
  const barChartData = questionAnalysis.map(q => ({
    question: `Q${q.questionNumber}`,
    correct: q.correctPercentage,
    wrong: (q.wrongCount / q.totalStudents) * 100,
    skipped: (q.skippedCount / q.totalStudents) * 100
  }))

  return (
    <div className="space-y-8 p-6">
      {/* Overall Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Statistics Pie Chart */}
        <Card className="shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Target className="h-5 w-5 text-blue-600" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={overallStats.map(stat => ({
                        name: stat.name.toLowerCase(),
                        value: stat.value,
                        fill: COLORS[stat.name.toLowerCase() as keyof typeof COLORS]
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {overallStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0]
                          const value = typeof data.value === 'number' ? data.value : 0
                          const total = totalResponses
                          const percentage = ((value / total) * 100).toFixed(1)
                          return (
                            <div className="bg-white p-4 border-2 border-slate-200 rounded-lg shadow-lg">
                              <p className="font-semibold capitalize text-slate-900">{data.name}</p>
                              <p className="text-sm text-slate-600">
                                {value} responses ({percentage}%)
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
              <div className="space-y-4 flex-1">
                {overallStats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm" 
                        style={{ backgroundColor: COLORS[stat.name.toLowerCase() as keyof typeof COLORS] }}
                      ></div>
                      <span className="font-medium text-slate-900">{stat.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Bar Chart */}
        <Card className="shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader>
            <CardTitle className="text-slate-900">Question Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="question" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border-2 border-slate-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-slate-900">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} className="text-sm" style={{ color: entry.color }}>
                                {entry.name}: {Number(entry.value).toFixed(1)}%
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="correct" fill={COLORS.correct} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Question Analysis */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Individual Question Analysis</h3>
          <p className="text-sm text-slate-600">{questionAnalysis.length} questions analyzed</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {questionAnalysis.map((question) => {
            const data = [
              { name: 'correct', value: question.correctCount, fill: COLORS.correct },
              { name: 'wrong', value: question.wrongCount, fill: COLORS.wrong },
              { name: 'skipped', value: question.skippedCount, fill: COLORS.skipped }
            ].filter(item => item.value > 0)

            const difficulty = getDifficultyBadge(question.correctPercentage)
            const DifficultyIcon = difficulty.icon

            return (
              <Card key={question.questionId} className="shadow-md hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-bold text-blue-700 border-blue-200 bg-blue-50">
                          Question {question.questionNumber}
                        </Badge>
                        <Badge className={`${difficulty.color} font-medium`}>
                          <DifficultyIcon className="h-3 w-3 mr-1" />
                          {difficulty.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                        {question.questionText}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Donut Chart */}
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                          <PieChart>
                            <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              innerRadius={35}
                              outerRadius={60}
                              paddingAngle={3}
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
                                    <div className="bg-white p-3 border-2 border-slate-200 rounded-lg shadow-lg">
                                      <p className="font-semibold capitalize text-slate-900">{data.name}</p>
                                      <p className="text-sm text-slate-600">
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
                    </div>
                    
                    {/* Statistics */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm font-medium text-emerald-800">Correct</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-emerald-800">{question.correctCount}</div>
                            <div className="text-xs text-emerald-600">{question.correctPercentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-200">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium text-red-800">Wrong</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-red-800">{question.wrongCount}</div>
                            <div className="text-xs text-red-600">{((question.wrongCount / question.totalStudents) * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-200">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <span className="text-sm font-medium text-amber-800">Skipped</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-amber-800">{question.skippedCount}</div>
                            <div className="text-xs text-amber-600">{((question.skippedCount / question.totalStudents) * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center pt-2 border-t border-slate-200">
                        <div className="text-lg font-bold text-slate-900">{question.totalStudents}</div>
                        <div className="text-xs text-slate-600">Total Students</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
