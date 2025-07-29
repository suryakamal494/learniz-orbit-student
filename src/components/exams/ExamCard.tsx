
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Clock, 
  Trophy, 
  BookOpen, 
  Play, 
  Eye
} from 'lucide-react'
import type { Exam } from '@/types/exams'

interface ExamCardProps {
  exam: Exam
  subjectColor: {
    primary: string
    bg: string
    border: string
    gradient: string
  }
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, subjectColor }) => {
  const navigate = useNavigate()
  const { subjectId } = useParams()

  const handleTakeTest = () => {
    navigate(`/subject/${subjectId}/exam/${exam.id}/instructions`)
  }

  const handleViewResults = () => {
    navigate(`/subject/${subjectId}/exam/${exam.id}/results`)
  }

  const renderActionButton = () => {
    switch (exam.status) {
      case 'not-started':
      case 'in-progress':
        return (
          <Button
            onClick={handleTakeTest}
            className={`bg-gradient-to-r ${subjectColor.gradient} text-white hover:scale-105 transition-all`}
          >
            <Play className="h-4 w-4 mr-2" />
            Take Test
          </Button>
        )
      case 'completed':
        return (
          <Button
            onClick={handleViewResults}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Results
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Card className="bg-background/50 border-border/40 hover:bg-background/80 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h4 className="text-lg font-semibold text-foreground leading-tight">
              {exam.title}
            </h4>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{exam.duration} minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{exam.totalMarks} marks</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{exam.totalQuestions} questions</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            {renderActionButton()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
