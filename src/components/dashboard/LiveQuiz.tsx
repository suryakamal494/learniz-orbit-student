
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock } from "lucide-react"
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
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

export const LiveQuiz: React.FC<LiveQuizProps> = ({ data, isLoading = false }) => {
  const navigate = useNavigate()

  const handleTakeQuiz = (quizId: string, subjectId: string) => {
    navigate(`/subject/${subjectId}/live-quiz/${quizId}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="skeleton-premium h-6 w-6 rounded-full"></div>
          <div className="skeleton-premium h-6 w-32 rounded-lg"></div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border-0 shadow-premium">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="skeleton-premium h-4 w-3/4 rounded-lg"></div>
                  <div className="skeleton-premium h-5 w-16 rounded-full"></div>
                  <div className="skeleton-premium h-8 w-full rounded-lg"></div>
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
    <div className="space-y-4 animate-fade-in">
      {/* Standardized Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg text-white shadow-md">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Live Quiz</h2>
          <p className="text-body-sm text-muted-foreground">
            {activeQuizzes.length} active • Join now!
          </p>
        </div>
      </div>

      {/* Standardized Quiz Cards Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {activeQuizzes.map((quiz) => (
          <Card 
            key={quiz.id} 
            className="
              group relative overflow-hidden border-red-100 bg-white/80 backdrop-blur-sm
              hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 hover:border-red-200
            "
          >
            {/* Live indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">LIVE</span>
            </div>

            <CardContent className="p-6 space-y-4">
              {/* Quiz Title */}
              <div className="pr-8">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                  {quiz.title}
                </h3>
              </div>

              {/* Subject Badge and Timer */}
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className={`${getSubjectColor(quiz.subject)} text-xs px-3 py-1 font-medium`}
                >
                  {quiz.subject}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">{formatTimeRemaining(quiz.expiresAt)}</span>
                </div>
              </div>

              {/* Take Quiz Button */}
              <Button 
                onClick={() => handleTakeQuiz(quiz.id, quiz.subjectId)}
                className="
                  w-full h-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
                  text-white font-medium shadow-md hover:shadow-lg text-sm
                  transform hover:scale-[1.02] transition-all duration-300
                "
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
