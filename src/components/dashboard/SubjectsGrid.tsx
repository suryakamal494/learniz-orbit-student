
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Microscope,
  ArrowUpRight,
  BookOpen
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Subject {
  id: number
  name: string
  progress: number
}

interface SubjectsGridProps {
  subjects?: Subject[]
  isLoading?: boolean
}

const defaultSubjects: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    progress: 78
  },
  {
    id: 2,
    name: "Physics",
    progress: 65
  },
  {
    id: 3,
    name: "Chemistry",
    progress: 82
  },
  {
    id: 4,
    name: "Biology",
    progress: 71
  }
]

const iconMap: { [key: string]: any } = {
  mathematics: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Microscope
}

const getSubjectConfig = (name: string, index: number) => {
  const key = name.toLowerCase()
  
  const configs = [
    {
      iconBg: "bg-blue-500",
      cardBg: "bg-blue-50",
      textColor: "text-blue-600",
      progressColor: "bg-blue-500"
    },
    {
      iconBg: "bg-purple-500", 
      cardBg: "bg-purple-50",
      textColor: "text-purple-600",
      progressColor: "bg-purple-500"
    },
    {
      iconBg: "bg-green-500",
      cardBg: "bg-green-50", 
      textColor: "text-green-600",
      progressColor: "bg-green-500"
    },
    {
      iconBg: "bg-orange-500",
      cardBg: "bg-orange-50",
      textColor: "text-orange-600", 
      progressColor: "bg-orange-500"
    }
  ]

  return {
    icon: iconMap[key] || BookOpen,
    ...configs[index % configs.length]
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
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-0 shadow-premium">
              <CardContent className="p-6">
                <div className="skeleton-premium h-16 w-16 rounded-2xl mb-4"></div>
                <div className="skeleton-premium h-5 w-3/4 rounded-lg mb-3"></div>
                <div className="skeleton-premium h-4 w-1/2 rounded-lg mb-4"></div>
                <div className="skeleton-premium h-2 w-full rounded-full"></div>
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
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject, index) => {
          const config = getSubjectConfig(subject.name, index)
          const IconComponent = config.icon
          
          return (
            <Card 
              key={subject.id} 
              className={`
                group cursor-pointer border-0 shadow-md hover:shadow-lg
                ${config.cardBg} transition-all duration-300 hover:-translate-y-1
                rounded-3xl overflow-hidden
              `}
              onClick={() => handleSubjectClick(subject.id, subject.name)}
            >
              <CardContent className="p-8 text-center relative">
                {/* Subject Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`
                    p-4 rounded-2xl ${config.iconBg} text-white shadow-lg
                  `}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
                
                {/* Subject Name */}
                <h3 className={`text-xl font-semibold ${config.textColor} mb-2`}>
                  {subject.name}
                </h3>
                
                {/* Progress Text */}
                <p className="text-sm text-gray-500 mb-4">
                  {subject.progress}% Complete
                </p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${config.progressColor} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Arrow Button */}
                <div className="flex justify-center">
                  <div className={`
                    p-2 rounded-xl ${config.textColor} opacity-70 
                    group-hover:opacity-100 transition-all duration-300
                    group-hover:scale-110
                  `}>
                    <ArrowUpRight className="h-5 w-5" />
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
