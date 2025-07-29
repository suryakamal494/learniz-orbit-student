import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Microscope,
  ArrowUpRight,
  BookOpen,
  Globe,
  PenTool,
  Music,
  Palette,
  Languages,
  Trophy,
  Clock,
  Star,
  TrendingUp,
  Play,
  Calendar,
  Users
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Subject {
  id: number
  name: string
  progress: number
  lastAccessed?: string
  nextClass?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  rating?: number
}

interface SubjectsGridProps {
  subjects?: Subject[]
  isLoading?: boolean
}

const defaultSubjects: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    progress: 78,
    lastAccessed: "2 hours ago",
    nextClass: "Tomorrow 10:00 AM",
    difficulty: "Intermediate",
    rating: 4.8
  },
  {
    id: 2,
    name: "Physics",
    progress: 65,
    lastAccessed: "Yesterday",
    nextClass: "Today 2:00 PM",
    difficulty: "Advanced",
    rating: 4.6
  },
  {
    id: 3,
    name: "Chemistry",
    progress: 82,
    lastAccessed: "3 hours ago",
    nextClass: "Friday 11:00 AM",
    difficulty: "Intermediate",
    rating: 4.9
  },
  {
    id: 4,
    name: "Biology",
    progress: 71,
    lastAccessed: "5 hours ago",
    nextClass: "Monday 9:00 AM",
    difficulty: "Beginner",
    rating: 4.7
  }
]

const iconMap: { [key: string]: any } = {
  mathematics: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Microscope,
  english: BookOpen,
  geography: Globe,
  literature: PenTool,
  music: Music,
  art: Palette,
  language: Languages,
  history: Trophy
}

const getPremiumSubjectConfig = (name: string, index: number) => {
  const key = name.toLowerCase()
  
  const premiumConfigs = [
    {
      bgGradient: "bg-gradient-to-br from-blue-50/80 via-blue-50/60 to-cyan-50/80",
      cardBg: "bg-gradient-to-br from-blue-500/5 to-cyan-500/5",
      iconBg: "gradient-primary",
      iconColor: "text-white",
      textColor: "text-blue-700",
      accentColor: "text-blue-600",
      progressBg: "bg-blue-100",
      progressFill: "gradient-primary",
      borderGlow: "hover:shadow-blue-500/20",
      dotColor: "bg-blue-500"
    },
    {
      bgGradient: "bg-gradient-to-br from-purple-50/80 via-purple-50/60 to-pink-50/80",
      cardBg: "bg-gradient-to-br from-purple-500/5 to-pink-500/5",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      iconColor: "text-white",
      textColor: "text-purple-700",
      accentColor: "text-purple-600",
      progressBg: "bg-purple-100",
      progressFill: "bg-gradient-to-r from-purple-500 to-pink-500",
      borderGlow: "hover:shadow-purple-500/20",
      dotColor: "bg-purple-500"
    },
    {
      bgGradient: "bg-gradient-to-br from-emerald-50/80 via-emerald-50/60 to-teal-50/80",
      cardBg: "gradient-secondary",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
      iconColor: "text-white",
      textColor: "text-emerald-700",
      accentColor: "text-emerald-600",
      progressBg: "bg-emerald-100",
      progressFill: "gradient-success",
      borderGlow: "hover:shadow-emerald-500/20",
      dotColor: "bg-emerald-500"
    },
    {
      bgGradient: "bg-gradient-to-br from-orange-50/80 via-orange-50/60 to-red-50/80",
      cardBg: "bg-gradient-to-br from-orange-500/5 to-red-500/5",
      iconBg: "gradient-accent",
      iconColor: "text-white",
      textColor: "text-orange-700",
      accentColor: "text-orange-600",
      progressBg: "bg-orange-100",
      progressFill: "bg-gradient-to-r from-orange-500 to-red-500",
      borderGlow: "hover:shadow-orange-500/20",
      dotColor: "bg-orange-500"
    }
  ]

  return {
    icon: iconMap[key] || BookOpen,
    ...premiumConfigs[index % premiumConfigs.length]
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800'
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
    case 'Advanced': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function SubjectsGrid({ subjects = defaultSubjects, isLoading = false }: SubjectsGridProps) {
  const navigate = useNavigate()

  const handleSubjectClick = (subjectId: number, subjectName: string) => {
    navigate(`/subject/${subjectId}`, { state: { subjectName } })
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="skeleton-premium h-8 w-48 rounded-xl"></div>
          <div className="skeleton-premium h-6 w-32 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="subject-card-premium border-0 shadow-premium">
              <CardContent className="p-8">
                <div className="skeleton-premium h-16 w-16 rounded-2xl mb-6"></div>
                <div className="skeleton-premium h-5 w-3/4 rounded-lg mb-3"></div>
                <div className="skeleton-premium h-4 w-1/2 rounded-lg mb-6"></div>
                <div className="skeleton-premium h-3 w-full rounded-full mb-4"></div>
                <div className="skeleton-premium h-4 w-2/3 rounded-lg"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (subjects.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-display-md text-foreground">Your Subjects</h2>
        </div>
        
        <Card className="p-20 text-center glass-premium border-0">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl flex items-center justify-center mx-auto">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-display-xs text-foreground">No subjects available</h3>
              <p className="text-body-md text-muted-foreground max-w-md mx-auto">
                Subjects will appear here once they are assigned to you. Contact your instructor for more information.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in space-y-2">
          <h2 className="text-display-md text-foreground">Your Subjects</h2>
          <p className="text-body-md text-muted-foreground">
            {subjects.length} active course{subjects.length !== 1 ? 's' : ''} • Keep learning and growing!
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-success-bg text-success border-0 px-4 py-2">
            <TrendingUp className="h-4 w-4 mr-2" />
            Progress Tracking
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {subjects.map((subject, index) => {
          const config = getPremiumSubjectConfig(subject.name, index)
          const IconComponent = config.icon
          
          return (
            <Card 
              key={subject.id} 
              className={`
                subject-card-premium group cursor-pointer border-0 shadow-premium
                ${config.cardBg} ${config.borderGlow} hover:shadow-premium-xl
                animate-fade-in relative overflow-hidden
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSubjectClick(subject.id, subject.name)}
            >
              <CardContent className="p-8 relative">
                {/* Premium Background Elements */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-white to-white/50"></div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-white to-white/50"></div>
                </div>

                {/* Floating Status Dot */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <div className={`w-2 h-2 ${config.dotColor} rounded-full animate-pulse`}></div>
                  <span className="text-xs font-medium text-muted-foreground">Live</span>
                </div>

                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`
                    p-4 rounded-2xl ${config.iconBg} ${config.iconColor} shadow-premium
                    group-hover:scale-110 group-hover:rotate-3 transition-premium
                    relative z-10
                  `}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    {subject.difficulty && (
                      <Badge className={`text-xs font-medium ${getDifficultyColor(subject.difficulty)} border-0 px-3 py-1`}>
                        {subject.difficulty}
                      </Badge>
                    )}
                    
                    {subject.rating && (
                      <div className="flex items-center gap-1 bg-white/50 rounded-full px-3 py-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-700">
                          {subject.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Subject Info */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className={`text-xl font-bold ${config.textColor} line-clamp-2 mb-2`}>
                      {subject.name}
                    </h3>
                    
                    {subject.lastAccessed && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Last accessed {subject.lastAccessed}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Premium Progress Section */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Learning Progress</span>
                    <span className="text-lg font-bold text-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className={`h-3 ${config.progressBg} rounded-full overflow-hidden shadow-inner`}>
                      <div 
                        className={`
                          h-full ${config.progressFill} 
                          transition-all duration-1000 ease-out shadow-sm
                          relative overflow-hidden rounded-full
                        `}
                        style={{ width: `${Math.min(100, Math.max(0, subject.progress))}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Started 2 weeks ago</span>
                    <span>{100 - subject.progress}% remaining</span>
                  </div>
                </div>
                
                {/* Next Class */}
                {subject.nextClass && (
                  <div className="flex items-center justify-between text-sm mb-6 p-3 bg-white/30 rounded-xl">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Next class:</span>
                    </div>
                    <span className="font-semibold text-foreground">{subject.nextClass}</span>
                  </div>
                )}
                
                {/* Premium Action Section */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Continue</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">248 students</span>
                    </div>
                  </div>
                  
                  <div className={`
                    p-2 rounded-xl bg-white/40 backdrop-blur-sm
                    group-hover:bg-white/60 transition-premium
                    group-hover:scale-110 group-hover:rotate-12
                  `}>
                    <ArrowUpRight className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
