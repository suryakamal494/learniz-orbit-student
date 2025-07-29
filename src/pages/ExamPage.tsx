
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { mockExamData } from '@/data/mockExams'
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  Save
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundExam = mockExamData.chapters
      .flatMap(chapter => chapter.exams)
      .find(e => e.id === examId)
    
    if (foundExam && foundExam.questions) {
      setExam(foundExam)
      setTimeRemaining(foundExam.duration * 60)
      setIsLoading(false)
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

  const handleAnswerSelect = (value: string) => {
    const questionId = exam?.questions?.[currentQuestion]?.id
    if (questionId) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: parseInt(value)
      }))
    }
  }

  const handleSaveAndNext = () => {
    if (currentQuestion < (exam?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
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

  const isAnswered = (questionIndex: number) => {
    const questionId = exam?.questions?.[questionIndex]?.id
    return questionId ? answers.hasOwnProperty(questionId) : false
  }

  const getCurrentAnswer = () => {
    const questionId = exam?.questions?.[currentQuestion]?.id
    return questionId && answers[questionId] !== undefined ? answers[questionId].toString() : ""
  }

  if (isLoading || !exam || !exam.questions) {
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
  const isTimeRunningLow = timeRemaining <= 300 // 5 minutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-7xl mx-auto p-4">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-6">
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
              <h1 className="text-xl md:text-2xl font-bold text-foreground">{exam.title}</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {exam.questions.length}</p>
            </div>
          </div>
          
          {/* Prominent Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
            isTimeRunningLow ? 'border-red-500 bg-red-50 text-red-700' : 'border-orange-200 bg-orange-50 text-orange-700'
          }`}>
            <Clock className="h-5 w-5" />
            <span className="text-lg font-bold">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Single Question */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-start justify-between text-lg">
                  <span>Q{currentQuestion + 1}. {currentQ.question}</span>
                  <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                    {currentQ.marks} marks
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={getCurrentAnswer()} onValueChange={handleAnswerSelect} className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={handleSaveAndNext}
                disabled={currentQuestion >= exam.questions.length - 1}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                Save & Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>

              <Button
                onClick={() => setShowSubmitConfirm(true)}
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 hover:scale-105 transition-all"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Submit Test
              </Button>
            </div>
          </div>

          {/* Right Panel - Question Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {Object.keys(answers).length} of {exam.questions.length} answered
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 gap-2 mb-4">
                  {exam.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`h-12 w-12 rounded-lg text-sm font-semibold transition-all ${
                        index === currentQuestion
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                          : isAnswered(index)
                          ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                          : 'bg-background border border-border hover:bg-accent hover:border-accent-foreground/20'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-background border border-border"></div>
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
                  <span className="font-semibold">{Object.keys(answers).length}</span> out of{' '}
                  <span className="font-semibold">{exam.questions.length}</span> questions.
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
