
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    const foundExam = mockExamData.chapters
      .flatMap(chapter => chapter.exams)
      .find(e => e.id === examId)
    
    if (foundExam) {
      setExam(foundExam)
      setTimeRemaining(foundExam.duration * 60)
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
    handleSubmitExam()
  }

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }))
  }

  const handleSaveAndNext = () => {
    if (currentQuestion < (exam?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSubmitExam = () => {
    const totalQuestions = exam?.questions?.length || 0
    const correctAnswers = exam?.questions?.reduce((count, question) => {
      return answers[question.id] === question.correctAnswer ? count + 1 : count
    }, 0) || 0
    
    const score = Math.round((correctAnswers / totalQuestions) * (exam?.totalMarks || 0))
    const percentage = Math.round((score / (exam?.totalMarks || 1)) * 100)
    
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

  const isAnswered = (questionId: string) => answers.hasOwnProperty(questionId)

  if (!exam || !exam.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-6xl mx-auto p-4">
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
      <div className="container max-w-6xl mx-auto p-4 space-y-6">
        {/* Header with Timer */}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Question */}
          <div className="lg:col-span-3 space-y-6">
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

            {/* Bottom Controls */}
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={handleSaveAndNext}
                disabled={currentQuestion >= exam.questions.length - 1}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              >
                Save & Next
              </Button>

              <Button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>

          {/* Right Panel - Question Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 lg:grid-cols-3 gap-2">
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
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded bg-primary"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded bg-green-200"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border border-border bg-background"></div>
                    <span>Not Answered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
