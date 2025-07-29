
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Clock } from 'lucide-react'
import { MarksTable } from './MarksTable'
import { SubjectPieCharts } from './SubjectPieCharts'
import { TimeTable } from './TimeTable'
import { TimeBarCharts } from './TimeBarCharts'

export function BySubjectAnalysis() {
  const [activeSubTab, setActiveSubTab] = useState('marks')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Subject-wise Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="marks" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Marks
              </TabsTrigger>
              <TabsTrigger value="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marks" className="mt-6 space-y-6">
              <MarksTable />
              <SubjectPieCharts />
            </TabsContent>

            <TabsContent value="time" className="mt-6 space-y-6">
              <TimeTable />
              <TimeBarCharts />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
