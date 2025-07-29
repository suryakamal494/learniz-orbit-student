
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ExamCard } from './ExamCard'
import { ChevronDown, BookOpen, CheckCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExamChapter } from '@/types/exams'

interface ExamChapterCardProps {
  chapter: ExamChapter
  isExpanded: boolean
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
  onToggle: () => void
}

export const ExamChapterCard: React.FC<ExamChapterCardProps> = ({
  chapter,
  isExpanded,
  subjectColor,
  onToggle
}) => {
  const getStatusColor = (progress: number) => {
    if (progress === 100) return "text-green-600"
    if (progress > 0) return "text-blue-600"
    return "text-muted-foreground"
  }

  const getStatusIcon = (progress: number) => {
    if (progress === 100) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (progress > 0) return <Clock className="h-4 w-4 text-blue-600" />
    return <BookOpen className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <Card className={`${subjectColor.bg} ${subjectColor.border} border-2 transition-all duration-300`}>
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-6 h-auto justify-start text-left hover:bg-transparent"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-start gap-4">
                {getStatusIcon(chapter.progress)}
                <div className="space-y-2">
                  <h3 className={`text-lg font-semibold ${subjectColor.primary}`}>
                    {chapter.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={getStatusColor(chapter.progress)}>
                      {chapter.completedExams}/{chapter.totalExams} completed
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className={getStatusColor(chapter.progress)}>
                      {chapter.progress}% done
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-24">
                  <Progress value={chapter.progress} className="h-2" />
                </div>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-200",
                    isExpanded && "transform rotate-180"
                  )}
                />
              </div>
            </div>
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-6 pb-6">
          <div className="border-t border-border/40 pt-4">
            <div className="grid gap-4">
              {chapter.exams.map((exam) => (
                <ExamCard 
                  key={exam.id} 
                  exam={exam} 
                  subjectColor={subjectColor}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
