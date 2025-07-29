
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamChapterCard } from './ExamChapterCard'
import type { ExamSection } from '@/types/exams'

interface ExamsContainerProps {
  data: ExamSection
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
}

export const ExamsContainer: React.FC<ExamsContainerProps> = ({ data, subjectColor }) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Chapters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Chapter-wise Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.chapters.length > 0 ? (
              data.chapters.map((chapter) => (
                <ExamChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  isExpanded={expandedChapters.includes(chapter.id)}
                  subjectColor={subjectColor}
                  onToggle={() => toggleChapter(chapter.id)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No exams available for this subject.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
