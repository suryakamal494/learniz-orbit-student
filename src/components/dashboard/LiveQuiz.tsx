
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { LiveQuizData } from '@/types/liveQuiz'

interface LiveQuizProps {
  data?: LiveQuizData
  isLoading?: boolean
}

const getSubjectColor = (subject: string) => {
  switch (subject.toLowerCase()) {
    case "mathematics":
      return "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300"
    case "physics": 
      return "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-300"
    case "chemistry":
      return "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/50 dark:border-green-800 dark:text-green-300"
    case "biology":
      return "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/50 dark:border-orange-800 dark:text-orange-300"
    default:
      return "bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-950/50 dark:border-gray-800 dark:text-gray-300"
  }
}

export const LiveQuiz: React.FC<LiveQuizProps> = ({ data, isLoading = false }) => {
  const navigate = useNavigate()

  const handleTakeQuiz = (quizId: string, subjectId: string) => {
    navigate(`/subject/${subjectId}/exam/${quizId}/instructions`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-muted animate-pulse"></div>
          <div className="h-6 w-32 rounded-lg bg-muted animate-pulse"></div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-muted rounded-lg animate-pulse"></div>
                  <div className="h-5 w-16 bg-muted rounded-full animate-pulse"></div>
                  <div className="h-8 w-full bg-muted rounded-lg animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data || data.quizzes.length === 0) {
    return null
  }

  const activeQuizzes = data.quizzes.filter(quiz => quiz.isActive)

  if (activeQuizzes.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg text-white shadow-md flex-shrink-0">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Live Quiz</h2>
          <p className="text-sm text-muted-foreground truncate">
            {activeQuizzes.length} active • Join now!
          </p>
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {activeQuizzes.map((quiz) => (
          <Card 
            key={quiz.id} 
            className="group relative overflow-hidden border border-red-100 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-red-200"
          >
            {/* Live indicator */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 z-10">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">LIVE</span>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Quiz Title */}
              <div className="pr-8 sm:pr-12">
                <h3 className="text-base sm:text-lg font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                  {quiz.title}
                </h3>
              </div>

              {/* Subject Badge */}
              <div className="flex items-center">
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-2 sm:px-3 py-1 font-medium border ${getSubjectColor(quiz.subject)}`}
                >
                  {quiz.subject}
                </Badge>
              </div>

              {/* Take Quiz Button */}
              <Button 
                onClick={() => handleTakeQuiz(quiz.id, quiz.subjectId)}
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium shadow-md hover:shadow-lg text-sm transform hover:scale-[1.02] transition-all duration-300"
                size="sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                Take Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
