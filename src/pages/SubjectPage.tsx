import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MediaViewer } from "@/components/MediaViewer"
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
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Video,
  FileQuestion,
  Download,
  Eye,
  Youtube
} from "lucide-react"
import { useState } from "react"

const SubjectPage = () => {
  const { subjectId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const subjectName = location.state?.subjectName || "Subject"
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [expandedContent, setExpandedContent] = useState<string[]>([])
  const [mediaViewer, setMediaViewer] = useState<{
    isOpen: boolean
    content: {
      id: string
      title: string
      type: 'youtube' | 'pdf'
      url: string
      size?: string
      pages?: number
      duration?: string
    } | null
  }>({
    isOpen: false,
    content: null
  })

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const toggleContent = (contentId: string) => {
    setExpandedContent(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const openMediaViewer = (content: any) => {
    setMediaViewer({
      isOpen: true,
      content
    })
  }

  const closeMediaViewer = () => {
    setMediaViewer({
      isOpen: false,
      content: null
    })
  }

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
      { 
        id: "lms-1", 
        title: "Introduction to Calculus", 
        progress: 100, 
        status: "completed",
        content: [
          { 
            id: "lms-1-1", 
            title: "What is Calculus?", 
            type: "video-playlist", 
            duration: "50 min total",
            hasSubContent: true,
            subContent: [
              {
                id: "lms-1-1-1",
                title: "The essence of calculus",
                type: "youtube",
                url: "https://www.youtube.com/watch?v=UukVP7Mg3TU",
                duration: "17 min"
              },
              {
                id: "lms-1-1-2", 
                title: "Introduction to Calculus",
                type: "youtube",
                url: "https://www.youtube.com/watch?v=YpYSEXAxMJ0",
                duration: "15 min"
              },
              {
                id: "lms-1-1-3",
                title: "Calculus Fundamentals", 
                type: "youtube",
                url: "https://www.youtube.com/watch?v=jHGi1uVN1Uc",
                duration: "18 min"
              }
            ]
          },
          { 
            id: "lms-1-2", 
            title: "Calculus Reference Materials", 
            type: "pdf-collection",
            duration: "Study materials",
            hasSubContent: true,
            subContent: [
              {
                id: "lms-1-2-1",
                title: "Calculus Formulas Cheat Sheet",
                type: "pdf",
                url: "https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf",
                size: "2.3 MB",
                pages: 8
              },
              {
                id: "lms-1-2-2",
                title: "Integration Techniques Guide",
                type: "pdf", 
                url: "https://www.math.ucdavis.edu/~kouba/CalcTwoDIRECTORY/integraltableDIRECTORY/IntegralTable.pdf",
                size: "1.8 MB",
                pages: 12
              }
            ]
          },
          { id: "lms-1-3", title: "Practice Quiz", type: "quiz", duration: "20 min" }
        ]
      },
      { 
        id: "lms-2", 
        title: "Limits and Continuity", 
        progress: 100, 
        status: "completed",
        content: [
          { id: "lms-2-1", title: "Understanding Limits", type: "video", duration: "25 min" },
          { id: "lms-2-2", title: "Continuity Explained", type: "video", duration: "20 min" },
          { id: "lms-2-3", title: "Worked Examples", type: "reading", duration: "15 min" },
          { 
            id: "lms-2-4", 
            title: "Limits and Continuity Reference Materials", 
            type: "pdf-collection",
            duration: "Study materials",
            hasSubContent: true,
            subContent: [
              {
                id: "lms-2-4-1",
                title: "Sample PDF Document",
                type: "pdf",
                url: "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf",
                size: "1.2 MB",
                pages: 10
              },
              {
                id: "lms-2-4-2",
                title: "Basic Link PDF Sample",
                type: "pdf", 
                url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
                size: "0.8 MB",
                pages: 5
              }
            ]
          }
        ]
      },
      { 
        id: "lms-3", 
        title: "Derivatives", 
        progress: 85, 
        status: "current",
        content: [
          { id: "lms-3-1", title: "Definition of Derivatives", type: "video", duration: "30 min" },
          { id: "lms-3-2", title: "Derivative Rules", type: "reading", duration: "25 min" },
          { id: "lms-3-3", title: "Chain Rule", type: "video", duration: "20 min" },
          { id: "lms-3-4", title: "Practice Problems", type: "quiz", duration: "40 min" }
        ]
      },
      { 
        id: "lms-4", 
        title: "Applications of Derivatives", 
        progress: 0, 
        status: "locked",
        content: []
      }
    ],
    examChapters: [
      { 
        id: "exam-1", 
        title: "Chapter 1 - Basics", 
        examType: "Quiz", 
        score: 95, 
        status: "completed",
        content: [
          { id: "exam-1-1", title: "Basic Concepts Quiz", type: "quiz", score: 95, attempts: 1 },
          { id: "exam-1-2", title: "Review Questions", type: "practice", score: null, attempts: 0 }
        ]
      },
      { 
        id: "exam-2", 
        title: "Chapter 2 - Advanced", 
        examType: "Test", 
        score: 88, 
        status: "completed",
        content: [
          { id: "exam-2-1", title: "Comprehensive Test", type: "test", score: 88, attempts: 2 },
          { id: "exam-2-2", title: "Supplementary Questions", type: "practice", score: 92, attempts: 1 }
        ]
      },
      { 
        id: "exam-3", 
        title: "Chapter 3 - Applications", 
        examType: "Quiz", 
        score: null, 
        status: "upcoming",
        content: [
          { id: "exam-3-1", title: "Applications Quiz", type: "quiz", score: null, attempts: 0 }
        ]
      }
    ],
    notesChapters: [
      { 
        id: "notes-1", 
        title: "Introduction Notes", 
        size: "2.5 MB", 
        downloadCount: 45, 
        status: "available",
        content: [
          { 
            id: "notes-1-1", 
            title: "Chapter Summary", 
            type: "pdf", 
            size: "1.2 MB",
            url: "https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf",
            pages: 4
          },
          { 
            id: "notes-1-2", 
            title: "Key Formulas", 
            type: "pdf", 
            size: "0.8 MB",
            url: "https://www.math.ucdavis.edu/~kouba/CalcTwoDIRECTORY/integraltableDIRECTORY/IntegralTable.pdf",
            pages: 6
          },
          { id: "notes-1-3", title: "Additional Resources", type: "pdf", size: "0.5 MB" }
        ]
      },
      { 
        id: "notes-2", 
        title: "Derivatives Formula Sheet", 
        size: "1.8 MB", 
        downloadCount: 67, 
        status: "available",
        content: [
          { id: "notes-2-1", title: "Basic Derivatives", type: "pdf", size: "0.9 MB" },
          { id: "notes-2-2", title: "Advanced Derivatives", type: "pdf", size: "0.9 MB" }
        ]
      },
      { 
        id: "notes-3", 
        title: "Practice Problems", 
        size: "3.2 MB", 
        downloadCount: 23, 
        status: "available",
        content: [
          { id: "notes-3-1", title: "Easy Problems", type: "pdf", size: "1.0 MB" },
          { id: "notes-3-2", title: "Medium Problems", type: "pdf", size: "1.1 MB" },
          { id: "notes-3-3", title: "Hard Problems", type: "pdf", size: "1.1 MB" }
        ]
      }
    ]
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />
      case "video-playlist": return <Video className="h-4 w-4" />
      case "pdf-collection": return <FileText className="h-4 w-4" />
      case "youtube": return <Youtube className="h-4 w-4" />
      case "reading": return <BookOpen className="h-4 w-4" />
      case "quiz": return <FileQuestion className="h-4 w-4" />
      case "test": return <PenTool className="h-4 w-4" />
      case "practice": return <Target className="h-4 w-4" />
      case "pdf": return <FileText className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
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
                    <Collapsible key={chapter.id}>
                      <div className={`
                        rounded-lg border-2 transition-all duration-300
                        ${chapter.status === 'completed' 
                          ? `${subjectColor.bg} ${subjectColor.border} opacity-80` 
                          : chapter.status === 'current'
                          ? `${subjectColor.bg} ${subjectColor.border}`
                          : 'bg-muted border-muted-foreground/20 opacity-60'
                        }
                      `}>
                        <CollapsibleTrigger 
                          className="w-full p-4 cursor-pointer"
                          onClick={() => toggleChapter(chapter.id)}
                          disabled={chapter.status === 'locked'}
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
                              <div className="text-left">
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
                              {chapter.content.length > 0 && (
                                expandedChapters.includes(chapter.id) ? (
                                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )
                              )}
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        
                        {chapter.content.length > 0 && (
                          <CollapsibleContent className="px-4 pb-4">
                            <div className="space-y-2 ml-8">
                              {chapter.content.map((item) => (
                                <div key={item.id}>
                                  {item.hasSubContent ? (
                                    <Collapsible>
                                      <div className="bg-white/50 rounded-lg">
                                        <CollapsibleTrigger 
                                          className="w-full p-3 cursor-pointer"
                                          onClick={() => toggleContent(item.id)}
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                              {getContentIcon(item.type)}
                                              <div className="text-left">
                                                <h4 className="font-medium text-sm">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">{item.duration}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Badge variant="secondary" className="text-xs">
                                                {item.subContent?.length} {item.type === 'video-playlist' ? 'videos' : 'files'}
                                              </Badge>
                                              {expandedContent.includes(item.id) ? (
                                                <ChevronUp className="h-3 w-3 text-muted-foreground" />
                                              ) : (
                                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                              )}
                                            </div>
                                          </div>
                                        </CollapsibleTrigger>
                                        
                                        <CollapsibleContent className="px-3 pb-3">
                                          <div className="space-y-1 ml-6 mt-2">
                                            {item.subContent?.map((subItem) => (
                                              <div 
                                                key={subItem.id} 
                                                className="flex items-center justify-between p-2 bg-white/70 rounded-md hover:bg-white/90 transition-colors cursor-pointer group"
                                                onClick={() => openMediaViewer(subItem)}
                                              >
                                                <div className="flex items-center gap-2">
                                                  {getContentIcon(subItem.type)}
                                                  <div>
                                                    <h5 className="font-medium text-xs group-hover:text-blue-600 transition-colors">
                                                      {subItem.title}
                                                    </h5>
                                                    <p className="text-xs text-muted-foreground">
                                                      {subItem.duration || `${subItem.size} ${subItem.pages ? `• ${subItem.pages} pages` : ''}`}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                  <Eye className="h-3 w-3 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </CollapsibleContent>
                                      </div>
                                    </Collapsible>
                                  ) : (
                                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                                      <div className="flex items-center gap-3">
                                        {getContentIcon(item.type)}
                                        <div>
                                          <h4 className="font-medium text-sm">{item.title}</h4>
                                          <p className="text-xs text-muted-foreground">{item.duration}</p>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="ghost" className="h-8">
                                        <Play className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        )}
                      </div>
                    </Collapsible>
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
                    <Collapsible key={exam.id}>
                      <div className={`
                        rounded-lg border-2 transition-all duration-300
                        ${exam.status === 'completed' 
                          ? `${subjectColor.bg} ${subjectColor.border}` 
                          : `bg-muted/50 border-muted-foreground/20`
                        }
                      `}>
                        <CollapsibleTrigger 
                          className="w-full p-4 cursor-pointer"
                          onClick={() => toggleChapter(exam.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <PenTool className={`h-5 w-5 ${exam.status === 'completed' ? subjectColor.primary : 'text-muted-foreground'}`} />
                              <div className="text-left">
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
                              {exam.content.length > 0 && (
                                expandedChapters.includes(exam.id) ? (
                                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )
                              )}
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        
                        {exam.content.length > 0 && (
                          <CollapsibleContent className="px-4 pb-4">
                            <div className="space-y-2 ml-8">
                              {exam.content.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    {getContentIcon(item.type)}
                                    <div>
                                      <h4 className="font-medium text-sm">{item.title}</h4>
                                      <p className="text-xs text-muted-foreground">
                                        {item.score ? `Score: ${item.score}%` : 'Not attempted'} • {item.attempts} attempts
                                      </p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost" className="h-8">
                                    <Play className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        )}
                      </div>
                    </Collapsible>
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
                    <Collapsible key={note.id}>
                      <div className={`
                        rounded-lg border-2 transition-all duration-300
                        ${note.status === 'available' 
                          ? `${subjectColor.bg} ${subjectColor.border}` 
                          : 'bg-muted/50 border-muted-foreground/20 opacity-60'
                        }
                      `}>
                        <CollapsibleTrigger 
                          className="w-full p-4 cursor-pointer"
                          onClick={() => toggleChapter(note.id)}
                          disabled={note.status !== 'available'}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className={`h-5 w-5 ${note.status === 'available' ? subjectColor.primary : 'text-muted-foreground'}`} />
                              <div className="text-left">
                                <h3 className="font-medium">{note.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {note.size} • Downloaded {note.downloadCount} times
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {note.status === 'available' ? (
                                <Button size="sm" variant="outline" className={`hover:${subjectColor.bg} hover:${subjectColor.border}`}>
                                  Download All
                                </Button>
                              ) : (
                                <Badge variant="secondary">
                                  Coming Soon
                                </Badge>
                              )}
                              {note.content.length > 0 && note.status === 'available' && (
                                expandedChapters.includes(note.id) ? (
                                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )
                              )}
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        
                        {note.content.length > 0 && note.status === 'available' && (
                          <CollapsibleContent className="px-4 pb-4">
                            <div className="space-y-2 ml-8">
                              {note.content.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    {getContentIcon(item.type)}
                                    <div>
                                      <h4 className="font-medium text-sm">{item.title}</h4>
                                      <p className="text-xs text-muted-foreground">
                                        {item.size} {item.pages ? `• ${item.pages} pages` : ''}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {item.url ? (
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-8"
                                        onClick={() => openMediaViewer(item)}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                    ) : null}
                                    <Button size="sm" variant="ghost" className="h-8">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        )}
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <MediaViewer
          isOpen={mediaViewer.isOpen}
          onClose={closeMediaViewer}
          content={mediaViewer.content}
        />
      </div>
    </div>
  )
}

export default SubjectPage
