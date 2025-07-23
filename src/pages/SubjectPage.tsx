
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Circle,
  FileText,
  PenTool,
  GraduationCap
} from "lucide-react"

const SubjectPage = () => {
  const { subjectId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const subjectName = location.state?.subjectName || "Subject"

  const getSubjectColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "mathematics":
        return {
          primary: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
          gradient: "from-blue-500 to-cyan-500"
        }
      case "physics":
        return {
          primary: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-200",
          gradient: "from-purple-500 to-pink-500"
        }
      case "chemistry":
        return {
          primary: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          gradient: "from-green-500 to-emerald-500"
        }
      case "biology":
        return {
          primary: "text-orange-600",
          bg: "bg-orange-50",
          border: "border-orange-200",
          gradient: "from-orange-500 to-red-500"
        }
      default:
        return {
          primary: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
          gradient: "from-gray-500 to-slate-500"
        }
    }
  }

  const subjectColor = getSubjectColor(subjectName)

  const subjectData = {
    name: subjectName,
    progress: 78,
    streak: 12,
    score: 92,
    nextClass: "Today, 10:00 AM",
    lmsChapters: [
      { id: 1, title: "Introduction to Calculus", progress: 100, status: "completed" },
      { id: 2, title: "Limits and Continuity", progress: 100, status: "completed" },
      { id: 3, title: "Derivatives", progress: 85, status: "current" },
      { id: 4, title: "Applications of Derivatives", progress: 0, status: "locked" },
      { id: 5, title: "Integrals", progress: 0, status: "locked" },
    ],
    examChapters: [
      { id: 1, title: "Chapter 1 - Basics", examType: "Quiz", score: 95, status: "completed" },
      { id: 2, title: "Chapter 2 - Advanced", examType: "Test", score: 88, status: "completed" },
      { id: 3, title: "Chapter 3 - Applications", examType: "Quiz", score: null, status: "upcoming" },
      { id: 4, title: "Mid-term Exam", examType: "Exam", score: null, status: "upcoming" },
    ],
    notesChapters: [
      { id: 1, title: "Introduction Notes", size: "2.5 MB", downloadCount: 45, status: "available" },
      { id: 2, title: "Derivatives Formula Sheet", size: "1.8 MB", downloadCount: 67, status: "available" },
      { id: 3, title: "Practice Problems", size: "3.2 MB", downloadCount: 23, status: "available" },
      { id: 4, title: "Summary Notes", size: "1.1 MB", downloadCount: 12, status: "coming_soon" },
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
              <h1 className={`text-3xl font-bold ${subjectColor.primary}`}>
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
          <Card className={`${subjectColor.bg} ${subjectColor.border} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className={`h-5 w-5 ${subjectColor.primary}`} />
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

          <Card className={`${subjectColor.bg} ${subjectColor.border} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className={`h-5 w-5 ${subjectColor.primary}`} />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${subjectColor.primary}`}>{subjectData.score}%</div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>

          <Card className={`${subjectColor.bg} ${subjectColor.border} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className={`h-5 w-5 ${subjectColor.primary}`} />
                Next Class
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className={`h-4 w-4 ${subjectColor.primary}`} />
                <span className="font-medium">{subjectData.nextClass}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for LMS, Exams, and Notes */}
        <Tabs defaultValue="lms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lms" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              LMS
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Learning Management System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectData.lmsChapters.map((chapter) => (
                    <div 
                      key={chapter.id}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                        ${chapter.status === 'completed' 
                          ? `${subjectColor.bg} ${subjectColor.border} opacity-80` 
                          : chapter.status === 'current'
                          ? `${subjectColor.bg} ${subjectColor.border} hover:shadow-md`
                          : 'bg-muted border-muted-foreground/20 opacity-60 cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {chapter.status === 'completed' ? (
                            <CheckCircle2 className={`h-5 w-5 ${subjectColor.primary}`} />
                          ) : chapter.status === 'current' ? (
                            <Play className={`h-5 w-5 ${subjectColor.primary}`} />
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
                                ? `${subjectColor.primary} bg-current/10` 
                                : chapter.status === 'current'
                                ? `${subjectColor.primary} bg-current/10`
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
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Exams & Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectData.examChapters.map((exam) => (
                    <div 
                      key={exam.id}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                        ${exam.status === 'completed' 
                          ? `${subjectColor.bg} ${subjectColor.border}` 
                          : `bg-muted/50 border-muted-foreground/20 hover:${subjectColor.bg} hover:${subjectColor.border}`
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PenTool className={`h-5 w-5 ${exam.status === 'completed' ? subjectColor.primary : 'text-muted-foreground'}`} />
                          <div>
                            <h3 className="font-medium">{exam.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {exam.examType} • {exam.status === 'completed' ? `Score: ${exam.score}%` : 'Upcoming'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {exam.score && (
                            <div className={`text-lg font-bold ${subjectColor.primary}`}>
                              {exam.score}%
                            </div>
                          )}
                          <Badge 
                            variant={exam.status === 'completed' ? 'default' : 'secondary'}
                            className={exam.status === 'completed' ? `${subjectColor.primary} bg-current/10` : ''}
                          >
                            {exam.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Study Notes & Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectData.notesChapters.map((note) => (
                    <div 
                      key={note.id}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                        ${note.status === 'available' 
                          ? `${subjectColor.bg} ${subjectColor.border} hover:shadow-md` 
                          : 'bg-muted/50 border-muted-foreground/20 opacity-60'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className={`h-5 w-5 ${note.status === 'available' ? subjectColor.primary : 'text-muted-foreground'}`} />
                          <div>
                            <h3 className="font-medium">{note.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {note.size} • Downloaded {note.downloadCount} times
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {note.status === 'available' ? (
                            <Button size="sm" variant="outline" className={`hover:${subjectColor.bg} hover:${subjectColor.border}`}>
                              Download
                            </Button>
                          ) : (
                            <Badge variant="secondary">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SubjectPage
