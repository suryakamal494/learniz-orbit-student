
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChart, History } from 'lucide-react'
import { BySubjectAnalysis } from '@/components/analysis/BySubjectAnalysis'
import { ByExamAnalysis } from '@/components/analysis/ByExamAnalysis'
import { HistoryAnalysis } from '@/components/analysis/HistoryAnalysis'

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState('by-subject')

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analysis Dashboard</h1>
          <p className="text-muted-foreground">Track your performance and progress</p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="w-full max-w-full overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="by-subject" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">By Subject</span>
              <span className="sm:hidden">Subject</span>
            </TabsTrigger>
            <TabsTrigger value="by-exam" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">By Exam</span>
              <span className="sm:hidden">Exam</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="by-subject" className="mt-6 w-full max-w-full">
            <BySubjectAnalysis />
          </TabsContent>

          <TabsContent value="by-exam" className="mt-6 w-full max-w-full">
            <ByExamAnalysis />
          </TabsContent>

          <TabsContent value="history" className="mt-6 w-full max-w-full">
            <HistoryAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
