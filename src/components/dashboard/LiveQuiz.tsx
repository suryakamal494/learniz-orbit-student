
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, AlertCircle, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { LiveQuizData } from '@/types/liveQuiz'

interface LiveQuizProps {
  data?: LiveQuizData
  isLoading?: boolean
}

const getSubjectColor = (subject: string) => {
  switch (subject.toLowerCase()) {
    case "mathematics":
      return "bg-blue-50 border-blue-200 text-blue-700"
    case "physics": 
      return "bg-purple-50 border-purple-200 text-purple-700"
    case "chemistry":
      return "bg-green-50 border-green-200 text-green-700"
    case "biology":
      return "bg-orange-50 border-orange-200 text-orange-700"
    default:
      return "bg-gray-50 border-gray-200 text-gray-700"
  }
}

const formatTimeRemaining = (expiresAt: string) => {
  const now = new Date().getTime()
  const expires = new Date(expiresAt).getTime()
  const remaining = expires - now
  
  if (remaining <= 0) return "Expired"
  
  const minutes = Math.floor(remaining / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s left`
  }
  return `${seconds}s left`
}

export const LiveQuiz: React.FC<LiveQuizProps> = ({ data, isLoading = false }) => {
  const navigate = useNavigate()

  const handleTakeQuiz = (quizId: string, subjectId: string) => {
    // Navigate to the live quiz page
    navigate(`/subject/${subjectId}/live-quiz/${quizId}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="skeleton-premium h-6 w-6 rounded-full"></div>
          <div className="skeleton-premium h-7 w-32 rounded-lg"></div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="border-0 shadow-premium">
              <CardHeader className="pb-3">
                <div className="skeleton-premium h-5 w-3/4 rounded-lg mb-2"></div>
                <div className="skeleton-premium h-4 w-1/2 rounded-lg"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="skeleton-premium h-6 w-16 rounded-full"></div>
                    <div className="skeleton-premium h-6 w-20 rounded-full"></div>
                  </div>
                  <div className="skeleton-premium h-10 w-full rounded-xl"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // If no active quizzes, don't render the section
  if (!data || data.quizzes.length === 0) {
    return null
  }

  const activeQuizzes = data.quizzes.filter(quiz => quiz.isActive)

  if (activeQuizzes.length === 0) {
    return null
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl text-white shadow-lg">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-display-sm font-bold text-foreground">Live Quiz</h2>
          <p className="text-body-sm text-muted-foreground">
            {activeQuizzes.length} active quiz{activeQuizzes.length !== 1 ? 'es' : ''} • Join now!
          </p>
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {activeQuizzes.map((quiz) => (
          <Card 
            key={quiz.id} 
            className="
              group border-0 shadow-lg bg-gradient-to-br from-background via-background to-accent/5
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300
              border border-red-200/50 relative overflow-hidden
            "
          >
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Pulsing live indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-medium text-red-600">LIVE</span>
            </div>

            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg font-bold text-foreground group-hover:text-red-600 transition-colors">
                {quiz.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={`${getSubjectColor(quiz.subject)} border-0 font-medium`}
                >
                  {quiz.subject}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              {/* Quiz Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{quiz.totalQuestions} questions</span>
                </div>
              </div>

              {/* Time remaining */}
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-amber-600">
                  {formatTimeRemaining(quiz.expiresAt)}
                </span>
              </div>

              {/* Description */}
              {quiz.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {quiz.description}
                </p>
              )}

              {/* Take Quiz Button */}
              <Button 
                onClick={() => handleTakeQuiz(quiz.id, quiz.subjectId)}
                className="
                  w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
                  text-white font-semibold shadow-lg hover:shadow-xl
                  transform hover:scale-[1.02] transition-all duration-300
                  group-hover:animate-pulse
                "
                size="lg"
              >
                <Zap className="h-4 w-4 mr-2" />
                Take Quiz Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
