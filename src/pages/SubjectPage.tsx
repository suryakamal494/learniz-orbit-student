import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LMSContainer } from "@/components/lms/LMSContainer"
import { ExamsContainer } from "@/components/exams/ExamsContainer"
import { mockExamData } from "@/data/mockExams"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  BookOpen, 
  Trophy,
  Star,
  TrendingUp,
  Target,
  GraduationCap,
  FileText,
} from "lucide-react"
import type { LMSData } from '@/types/lms'

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

  // Enhanced LMS data structure
  const lmsData: LMSData = {
    overallProgress: 78,
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction to Calculus",
        description: "Fundamental concepts and definitions",
        progress: 100,
        status: "completed",
        estimatedTime: "2 hours",
        totalItems: 6,
        completedItems: 6,
        topics: [
          {
            id: "topic-1-1",
            title: "What is Calculus?",
            estimatedTime: "45 min",
            difficulty: "easy",
            completed: true,
            contentItems: [
              {
                id: "content-1-1-1",
                title: "The essence of calculus",
                type: "youtube",
                url: "https://www.youtube.com/watch?v=WUvTyaaNkzM",
                duration: "17 min",
                completed: true
              },
              {
                id: "content-1-1-2",
                title: "Introduction to Calculus",
                type: "youtube", 
                url: "https://www.youtube.com/watch?v=YpYSEXAxMJ0",
                duration: "15 min",
                completed: true
              },
              {
                id: "content-1-1-3",
                title: "Calculus Fundamentals",
                type: "youtube",
                url: "https://www.youtube.com/watch?v=jHGi1uVN1Uc",
                duration: "18 min",
                completed: true
              }
            ]
          },
          {
            id: "topic-1-2", 
            title: "Reference Materials",
            estimatedTime: "30 min",
            difficulty: "easy",
            completed: true,
            contentItems: [
              {
                id: "content-1-2-1",
                title: "Calculus Formulas Cheat Sheet",
                type: "pdf",
                url: "https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf",
                size: "2.3 MB",
                pages: 8,
                completed: true
              },
              {
                id: "content-1-2-2",
                title: "Integration Techniques Guide", 
                type: "pdf",
                url: "https://www.math.ucdavis.edu/~kouba/CalcTwoDIRECTORY/integraltableDIRECTORY/IntegralTable.pdf",
                size: "1.8 MB", 
                pages: 12,
                completed: true
              }
            ]
          },
          {
            id: "topic-1-3",
            title: "Practice Quiz",
            estimatedTime: "20 min",
            difficulty: "medium",
            completed: true,
            contentItems: [
              {
                id: "content-1-3-1",
                title: "Basic Concepts Quiz",
                type: "quiz",
                duration: "20 min",
                completed: true
              }
            ]
          }
        ]
      },
      {
        id: "chapter-2",
        title: "Limits and Continuity", 
        description: "Understanding limits and continuous functions",
        progress: 85,
        status: "current",
        estimatedTime: "3 hours",
        totalItems: 8,
        completedItems: 7,
        topics: [
          {
            id: "topic-2-1",
            title: "Understanding Limits",
            estimatedTime: "25 min", 
            difficulty: "medium",
            completed: true,
            contentItems: [
              {
                id: "content-2-1-1",
                title: "Introduction to Limits",
                type: "youtube",
                url: "https://www.youtube.com/watch?v=riXcZT2ICjA",
                duration: "25 min",
                completed: true
              }
            ]
          },
          {
            id: "topic-2-2",
            title: "Continuity Explained",
            estimatedTime: "20 min",
            difficulty: "medium", 
            completed: true,
            contentItems: [
              {
                id: "content-2-2-1", 
                title: "Continuity Concepts",
                type: "youtube",
                url: "https://www.youtube.com/watch?v=a3xHa5Y8mAg",
                duration: "20 min",
                completed: true
              }
            ]
          },
          {
            id: "topic-2-3",
            title: "Reference Materials",
            estimatedTime: "30 min",
            difficulty: "easy",
            completed: false,
            contentItems: [
              {
                id: "content-2-3-1",
                title: "Limits and Continuity Guide",
                type: "pdf",
                url: "https://www.whitman.edu/mathematics/calculus_online/section03.01.html",
                size: "1.2 MB",
                pages: 10,
                completed: false
              },
              {
                id: "content-2-3-2",
                title: "Practice Problems Set",
                type: "pdf",
                url: "https://tutorial.math.lamar.edu/Problems/CalcI/Limits_Intro.aspx", 
                size: "0.8 MB",
                pages: 5,
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "chapter-3",
        title: "Derivatives",
        description: "Introduction to derivatives and applications",
        progress: 0,
        status: "locked",
        estimatedTime: "4 hours", 
        totalItems: 12,
        completedItems: 0,
        topics: []
      }
    ]
  }

  const subjectData = {
    name: subjectName,
    progress: lmsData.overallProgress,
    streak: 12,
    score: 92,
    nextClass: "Today, 10:00 AM"
  }

  // Get initial tab from URL params
  const urlParams = new URLSearchParams(location.search)
  const initialTab = urlParams.get('tab') || 'lms'

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-primary/10 h-12 w-12 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${subjectColor.primary}`}>
                {subjectName}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">Continue your learning journey</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

          <Card className={`${subjectColor.bg} ${subjectColor.border} border-2 sm:col-span-2 lg:col-span-1`}>
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
        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="lms" className="flex items-center gap-2 text-sm sm:text-base">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">LMS</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2 text-sm sm:text-base">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Exams</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2 text-sm sm:text-base">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lms" className="space-y-4">
            <LMSContainer data={lmsData} subjectColor={subjectColor} />
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <ExamsContainer data={mockExamData} subjectColor={subjectColor} />
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Study Notes & Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notes content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SubjectPage
