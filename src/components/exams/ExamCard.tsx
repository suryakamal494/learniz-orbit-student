
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Clock, 
  Trophy, 
  BookOpen, 
  Play, 
  RotateCcw, 
  Eye,
  AlertCircle,
  CheckCircle2,
  Timer
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />
      case 'in-progress': return <Timer className="h-4 w-4" />
      case 'not-started': return <AlertCircle className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const handleTakeTest = () => {
    navigate(`/subject/${subjectId}/exam/${exam.id}`)
  }

  const handleViewResults = () => {
    navigate(`/subject/${subjectId}/exam/${exam.id}/results`)
  }

  const renderActionButton = () => {
    switch (exam.status) {
      case 'not-started':
        return (
          <Button
            onClick={handleTakeTest}
            className={`bg-gradient-to-r ${subjectColor.gradient} text-white hover:scale-105 transition-all`}
          >
            <Play className="h-4 w-4 mr-2" />
            Take Test
          </Button>
        )
      case 'in-progress':
        return (
          <Button
            onClick={handleTakeTest}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Resume Test
          </Button>
        )
      case 'completed':
        return (
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              onClick={handleViewResults}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Results
            </Button>
            {exam.allowRetake && (
              <Button
                onClick={handleTakeTest}
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Retake
              </Button>
            )}
          </div>
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
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-lg font-semibold text-foreground leading-tight">
                {exam.title}
              </h4>
              <div className="flex gap-2 flex-shrink-0">
                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty}
                </Badge>
                <Badge variant="outline" className={getStatusColor(exam.status)}>
                  {getStatusIcon(exam.status)}
                  <span className="ml-1 capitalize">{exam.status.replace('-', ' ')}</span>
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {exam.description}
            </p>
            
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

            {exam.result && (
              <div className="flex items-center gap-4 text-sm">
                <div className={`font-medium ${
                  exam.result.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  Score: {exam.result.score}/{exam.result.totalMarks} ({exam.result.percentage}%)
                </div>
                <div className="text-muted-foreground">
                  Time: {exam.result.timeTaken} minutes
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-end">
            {renderActionButton()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
