
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  BookOpen, 
  Play, 
  Trophy,
  Star,
  TrendingUp,
  Target,
  CheckCircle2,
  Circle
} from "lucide-react"

const SubjectPage = () => {
  const { subjectId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const subjectName = location.state?.subjectName || "Subject"

  const subjectData = {
    name: subjectName,
    progress: 78,
    streak: 12,
    score: 92,
    nextClass: "Today, 10:00 AM",
    chapters: [
      { id: 1, title: "Introduction to Calculus", progress: 100, status: "completed" },
      { id: 2, title: "Limits and Continuity", progress: 100, status: "completed" },
      { id: 3, title: "Derivatives", progress: 85, status: "current" },
      { id: 4, title: "Applications of Derivatives", progress: 0, status: "locked" },
      { id: 5, title: "Integrals", progress: 0, status: "locked" },
    ],
    recentActivities: [
      "Completed Chapter 5 Quiz - 92%",
      "Watched Derivative Rules Video",
      "Solved 15 practice problems",
      "Attended live session on Limits"
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {subjectName}
              </h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{subjectData.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{subjectData.score}</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-medium">{subjectData.progress}%</span>
                </div>
                <Progress value={subjectData.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-500" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{subjectData.score}%</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Next Class
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="font-medium">{subjectData.nextClass}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chapters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectData.chapters.map((chapter) => (
                <div 
                  key={chapter.id}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                    ${chapter.status === 'completed' 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
                      : chapter.status === 'current'
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800 hover:shadow-md'
                      : 'bg-muted border-muted-foreground/20 opacity-60 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {chapter.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : chapter.status === 'current' ? (
                        <Play className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-medium">{chapter.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {chapter.progress}% Complete
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={chapter.progress} className="w-24 h-2" />
                      <Badge 
                        variant={chapter.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          chapter.status === 'completed' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : chapter.status === 'current'
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : ''
                        }
                      >
                        {chapter.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjectData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SubjectPage
