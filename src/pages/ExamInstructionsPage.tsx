
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockExamData } from '@/data/mockExams'
import { 
  ArrowLeft, 
  Clock, 
  Trophy, 
  BookOpen,
  AlertTriangle,
  Play
} from 'lucide-react'

const ExamInstructionsPage = () => {
  const { subjectId, examId } = useParams()
  const navigate = useNavigate()

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

  const handleStartTest = () => {
    navigate(`/subject/${subjectId}/exam/${examId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
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
            <h1 className="text-2xl font-bold text-foreground">Test Instructions</h1>
            <p className="text-muted-foreground">Please read carefully before starting</p>
          </div>
        </div>

        {/* Test Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {exam.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <div className="font-semibold">{exam.totalQuestions}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold">{exam.duration} minutes</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Trophy className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Total Marks</div>
                  <div className="font-semibold">{exam.totalMarks}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Passing Score</div>
                  <div className="font-semibold">{exam.passingScore}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Important Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {exam.instructions || "Please read all questions carefully and select the best answer for each question. Good luck!"}
              </p>
              
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Additional Guidelines:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• Do not refresh the page during the test</li>
                  <li>• The test will auto-submit when time expires</li>
                  <li>• You can navigate between questions freely</li>
                  <li>• Make sure to submit your test before leaving</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Test Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleStartTest}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 transition-all px-8"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Test
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExamInstructionsPage
