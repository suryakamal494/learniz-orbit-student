
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
  TrendingUp
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

const getSubjectConfig = (name: string, index: number) => {
  const key = name.toLowerCase()
  
  const colorConfigs = [
    {
      bgGradient: "bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      progressColor: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-100/50",
      shadowColor: "shadow-blue-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-purple-50 via-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-purple-600",
      progressColor: "from-purple-500 to-pink-500",
      borderColor: "border-purple-100/50",
      shadowColor: "shadow-purple-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-green-50 via-green-50 to-emerald-50",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      textColor: "text-green-600",
      progressColor: "from-green-500 to-emerald-500",
      borderColor: "border-green-100/50",
      shadowColor: "shadow-green-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-orange-50 via-orange-50 to-red-50",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      textColor: "text-orange-600",
      progressColor: "from-orange-500 to-red-500",
      borderColor: "border-orange-100/50",
      shadowColor: "shadow-orange-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-indigo-50 via-indigo-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
      progressColor: "from-indigo-500 to-blue-500",
      borderColor: "border-indigo-100/50",
      shadowColor: "shadow-indigo-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-rose-50 via-rose-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
      textColor: "text-rose-600",
      progressColor: "from-rose-500 to-pink-500",
      borderColor: "border-rose-100/50",
      shadowColor: "shadow-rose-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-teal-50 via-teal-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
      textColor: "text-teal-600",
      progressColor: "from-teal-500 to-cyan-500",
      borderColor: "border-teal-100/50",
      shadowColor: "shadow-teal-500/20"
    },
    {
      bgGradient: "bg-gradient-to-br from-yellow-50 via-yellow-50 to-orange-50",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      textColor: "text-yellow-600",
      progressColor: "from-yellow-500 to-orange-500",
      borderColor: "border-yellow-100/50",
      shadowColor: "shadow-yellow-500/20"
    }
  ]

  return {
    icon: iconMap[key] || BookOpen,
    ...colorConfigs[index % colorConfigs.length]
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="skeleton-modern h-8 w-48 rounded-lg"></div>
          <div className="skeleton-modern h-5 w-24 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="subject-card border-0 shadow-modern animate-pulse">
              <CardContent className="p-6">
                <div className="skeleton-modern h-16 w-16 rounded-2xl mb-4"></div>
                <div className="skeleton-modern h-4 w-3/4 rounded mb-2"></div>
                <div className="skeleton-modern h-3 w-1/2 rounded mb-4"></div>
                <div className="skeleton-modern h-2 w-full rounded-full mb-3"></div>
                <div className="skeleton-modern h-3 w-2/3 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (subjects.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Subjects</h2>
        </div>
        
        <Card className="p-16 text-center glass">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No subjects available</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Subjects will appear here once they are assigned to you. Contact your instructor for more information.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Subjects</h2>
          <p className="text-muted-foreground">
            {subjects.length} active course{subjects.length !== 1 ? 's' : ''} • Keep learning!
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            <TrendingUp className="h-3 w-3 mr-1" />
            Progress Tracking
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {subjects.map((subject, index) => {
          const config = getSubjectConfig(subject.name, index)
          const IconComponent = config.icon
          
          return (
            <Card 
              key={subject.id} 
              className={`
                subject-card group cursor-pointer border-0 shadow-modern
                ${config.bgGradient} ${config.borderColor} border-2
                hover:shadow-2xl hover:${config.shadowColor}
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSubjectClick(subject.id, subject.name)}
            >
              <CardContent className="p-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white"></div>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-4 rounded-2xl ${config.iconBg} text-white shadow-lg
                    group-hover:scale-110 transition-all duration-300
                    relative z-10
                  `}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {subject.difficulty && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getDifficultyColor(subject.difficulty)}`}
                      >
                        {subject.difficulty}
                      </Badge>
                    )}
                    
                    {subject.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground font-medium">
                          {subject.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Subject Info */}
                <div className="space-y-3 mb-4">
                  <h3 className={`text-lg font-bold ${config.textColor} line-clamp-2`}>
                    {subject.name}
                  </h3>
                  
                  {subject.lastAccessed && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Last accessed {subject.lastAccessed}</span>
                    </div>
                  )}
                </div>
                
                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-bold text-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-white/50 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`
                          h-full bg-gradient-to-r ${config.progressColor} 
                          transition-all duration-1000 ease-out shadow-sm
                          relative overflow-hidden
                        `}
                        style={{ width: `${Math.min(100, Math.max(0, subject.progress))}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Next Class */}
                {subject.nextClass && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>Next class:</span>
                    <span className="font-medium">{subject.nextClass}</span>
                  </div>
                )}
                
                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Continue Learning
                  </span>
                  <ArrowUpRight className={`
                    h-5 w-5 ${config.textColor} transition-all duration-300
                    group-hover:translate-x-1 group-hover:-translate-y-1
                  `} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
