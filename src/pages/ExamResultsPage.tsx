
import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockExamData } from '@/data/mockExams'
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  CheckCircle2,
  XCircle,
  Target,
  BookOpen,
  RotateCcw
} from 'lucide-react'

const ExamResultsPage = () => {
  const { subjectId, examId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [showAnswers, setShowAnswers] = useState(false)
  
  // Get result data from navigation state or mock data
  const resultData = location.state || {
    score: 7,
    totalMarks: 10,
    percentage: 70,
    answers: { "q1": 0, "q2": 2, "q3": 1 },
    timeTaken: 25
  }

  const exam = mockExamData.chapters
    .flatMap(chapter => chapter.exams)
    .find(e => e.id === examId)

  if (!exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container max-w-4xl mx-auto p-4">
          <div className="text-center py-8">
            <p>Exam not found</p>
          </div>
        </div>
      </div>
    )
  }

  const isPassed = resultData.percentage >= exam.passingScore
  const correctAnswers = exam.questions?.reduce((count, question) => {
    return resultData.answers[question.id] === question.correctAnswer ? count + 1 : count
  }, 0) || 0

  const getResultColor = (passed: boolean) => {
    return passed ? 'text-green-600' : 'text-red-600'
  }

  const getResultBg = (passed: boolean) => {
    return passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(`/subject/${subjectId}?tab=exams`)}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Exam Results</h1>
              <p className="text-muted-foreground">{exam.title}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${getResultBg(isPassed)} ${getResultColor(isPassed)} border-2`}
          >
            {isPassed ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
            {isPassed ? 'PASSED' : 'FAILED'}
          </Badge>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`${getResultBg(isPassed)} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className={`h-5 w-5 ${getResultColor(isPassed)}`} />
                Final Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getResultColor(isPassed)}`}>
                {resultData.percentage}%
              </div>
              <p className="text-sm text-muted-foreground">
                {resultData.score}/{resultData.totalMarks} marks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round((correctAnswers / (exam.questions?.length || 1)) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">
                {correctAnswers}/{exam.questions?.length || 0} correct
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Time Taken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {resultData.timeTaken}m
              </div>
              <p className="text-sm text-muted-foreground">
                out of {exam.duration}m
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-600" />
                Pass Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {exam.passingScore}%
              </div>
              <p className="text-sm text-muted-foreground">
                Required to pass
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Performance</span>
                  <span className={getResultColor(isPassed)}>{resultData.percentage}%</span>
                </div>
                <Progress value={resultData.percentage} className="h-3" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {(exam.questions?.length || 0) - correctAnswers}
                  </div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {(exam.questions?.length || 0) - Object.keys(resultData.answers).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Unanswered</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question-wise Analysis */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Question Analysis</CardTitle>
              <Button
                variant="outline"
                onClick={() => setShowAnswers(!showAnswers)}
              >
                {showAnswers ? 'Hide' : 'Show'} Answers
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAnswers && exam.questions && (
              <div className="space-y-4">
                {exam.questions.map((question, index) => {
                  const userAnswer = resultData.answers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  const wasAnswered = userAnswer !== undefined
                  
                  return (
                    <div key={question.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="font-medium">Q{index + 1}. {question.question}</h4>
                        <div className="flex items-center gap-2">
                          {wasAnswered ? (
                            isCorrect ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Correct
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                <XCircle className="h-3 w-3 mr-1" />
                                Incorrect
                              </Badge>
                            )
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              Not Answered
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            ({question.marks} marks)
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 border border-green-200'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 border border-red-200'
                                : 'bg-gray-50'
                            }`}
                          >
                            <span className="font-medium mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle2 className="h-4 w-4 text-green-600 inline ml-2" />
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <XCircle className="h-4 w-4 text-red-600 inline ml-2" />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                          <div className="text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(`/subject/${subjectId}?tab=exams`)}
            variant="outline"
          >
            Back to Exams
          </Button>
          {exam.allowRetake && (
            <Button
              onClick={() => navigate(`/subject/${subjectId}/exam/${examId}`)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Exam
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExamResultsPage
