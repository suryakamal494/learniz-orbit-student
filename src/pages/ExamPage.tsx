
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockExamData } from '@/data/mockExams'
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  Circle
} from 'lucide-react'
import type { Exam, ExamQuestion } from '@/types/exams'

const ExamPage = () => {
  const { subjectId, examId } = useParams()
  const navigate = useNavigate()
  
  const [exam, setExam] = useState<Exam | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  useEffect(() => {
    // Find the exam from mock data
    const foundExam = mockExamData.chapters
      .flatMap(chapter => chapter.exams)
      .find(e => e.id === examId)
    
    if (foundExam) {
      setExam(foundExam)
      setTimeRemaining(foundExam.duration * 60) // Convert to seconds
    }
  }, [examId])

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [timeRemaining])

  const handleAutoSubmit = () => {
    // Auto-submit when time runs out
    handleSubmitExam()
  }

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }))
  }

  const handleSubmitExam = () => {
    // Calculate score (simplified logic)
    const totalQuestions = exam?.questions?.length || 0
    const correctAnswers = exam?.questions?.reduce((count, question) => {
      return answers[question.id] === question.correctAnswer ? count + 1 : count
    }, 0) || 0
    
    const score = Math.round((correctAnswers / totalQuestions) * (exam?.totalMarks || 0))
    const percentage = Math.round((score / (exam?.totalMarks || 1)) * 100)
    
    // Navigate to results page with score data
    navigate(`/subject/${subjectId}/exam/${examId}/results`, {
      state: {
        score,
        totalMarks: exam?.totalMarks,
        percentage,
        answers,
        timeTaken: Math.round(((exam?.duration || 0) * 60 - timeRemaining) / 60)
      }
    })
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    const totalQuestions = exam?.questions?.length || 1
    return Math.round((Object.keys(answers).length / totalQuestions) * 100)
  }

  const isAnswered = (questionId: string) => answers.hasOwnProperty(questionId)

  if (!exam || !exam.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-4xl mx-auto p-4">
          <div className="text-center py-8">
            <p>Loading exam...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = exam.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{exam.title}</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {exam.questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{getProgressPercentage()}% completed</span>
              </div>
              <Progress value={getProgressPercentage()} />
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <span className="text-lg">Q{currentQuestion + 1}. {currentQ.question}</span>
              <Badge variant="outline">{currentQ.marks} marks</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQ.id] === index
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-border/60 hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {answers[currentQ.id] === index ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
          {exam.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                index === currentQuestion
                  ? 'border-primary bg-primary text-primary-foreground'
                  : isAnswered(exam.questions[index].id)
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-border bg-background hover:bg-accent'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion < exam.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Submit Exam
              </Button>
            )}
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  Submit Exam?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Are you sure you want to submit this exam? You have answered{' '}
                  {Object.keys(answers).length} out of {exam.questions.length} questions.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitExam}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  >
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamPage
