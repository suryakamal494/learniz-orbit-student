
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Zap } from "lucide-react"

const LiveQuizPage = () => {
  const { subjectId, quizId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10 h-12 w-12"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Live Quiz</h1>
              <p className="text-muted-foreground">Quiz ID: {quizId}</p>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <Card className="border-red-200/50 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            <CardTitle className="text-xl text-red-600">Live Quiz Interface</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Quiz timer and questions would appear here</span>
            </div>
            <p className="text-muted-foreground">
              This page would contain the actual live quiz interface with:
            </p>
            <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
              <li>• Real-time countdown timer</li>
              <li>• Question navigation</li>
              <li>• Answer submission</li>
              <li>• Live progress tracking</li>
              <li>• Auto-submission when time expires</li>
            </ul>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="mt-6"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveQuizPage
