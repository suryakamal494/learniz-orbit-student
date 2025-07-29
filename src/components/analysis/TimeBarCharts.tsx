
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { mockAnalysisData } from '@/data/mockAnalysis'

export function TimeBarCharts() {
  const data = mockAnalysisData.timeAnalysis

  const chartConfig = {
    spentOnCorrect: { label: 'Time on Correct', color: '#10B981' },
    spentOnWrong: { label: 'Time on Wrong', color: '#EF4444' }
  }

  const chartData = data.map(subject => ({
    subject: subject.subjectName,
    spentOnCorrect: Math.round(subject.spentOnCorrect / 60), // convert to minutes
    spentOnWrong: Math.round(subject.spentOnWrong / 60)
  }))

  return (
    <Card className="w-full max-w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Time Distribution Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Time spent on correct vs wrong answers (in minutes)</p>
      </CardHeader>
      <CardContent className="w-full max-w-full overflow-hidden">
        <div className="w-full h-80 max-w-full overflow-hidden">
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Time (minutes)', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium mb-2">{label}</p>
                          {payload.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-sm" 
                                style={{ backgroundColor: entry.color }}
                              ></div>
                              <span className="text-sm">
                                {entry.name}: {entry.value} min
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="spentOnCorrect" 
                  fill={chartConfig.spentOnCorrect.color}
                  name="Time on Correct"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="spentOnWrong" 
                  fill={chartConfig.spentOnWrong.color}
                  name="Time on Wrong"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
