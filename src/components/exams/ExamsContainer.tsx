
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ExamChapterCard } from './ExamChapterCard'
import { ExamFilters } from './ExamFilters'
import { Target, Trophy, BookOpen } from 'lucide-react'
import type { ExamSection, Exam } from '@/types/exams'

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
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    difficulty: 'all'
  })

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const filterExams = (exams: Exam[]) => {
    return exams.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           exam.description.toLowerCase().includes(filters.search.toLowerCase())
      const matchesStatus = filters.status === 'all' || exam.status === filters.status
      const matchesDifficulty = filters.difficulty === 'all' || exam.difficulty === filters.difficulty
      
      return matchesSearch && matchesStatus && matchesDifficulty
    })
  }

  const filteredChapters = data.chapters.map(chapter => ({
    ...chapter,
    exams: filterExams(chapter.exams)
  })).filter(chapter => chapter.exams.length > 0)

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className={`${subjectColor.bg} ${subjectColor.border} border-2`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className={`h-5 w-5 ${subjectColor.primary}`} />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium">{data.overallProgress}%</span>
              </div>
              <Progress value={data.overallProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${subjectColor.bg} ${subjectColor.border} border-2`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className={`h-5 w-5 ${subjectColor.primary}`} />
              Total Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${subjectColor.primary}`}>{data.totalExams}</div>
            <p className="text-sm text-muted-foreground">Available Tests</p>
          </CardContent>
        </Card>

        <Card className={`${subjectColor.bg} ${subjectColor.border} border-2 sm:col-span-2 lg:col-span-1`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className={`h-5 w-5 ${subjectColor.primary}`} />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${subjectColor.primary}`}>
              {data.completedExams}/{data.totalExams}
            </div>
            <p className="text-sm text-muted-foreground">Tests Finished</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ExamFilters 
        filters={filters}
        onFiltersChange={setFilters}
        subjectColor={subjectColor}
      />

      {/* Chapters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Chapter-wise Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredChapters.length > 0 ? (
              filteredChapters.map((chapter) => (
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
                <p className="text-muted-foreground">No exams found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
