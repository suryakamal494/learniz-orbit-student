
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
      // Deep Blue - Mathematics
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/60",
      textColor: "text-blue-700",
      progressBg: "bg-blue-100",
      progressColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      hoverShadow: "hover:shadow-blue-200/50"
    },
    {
      // Rich Purple - Physics
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
      cardBg: "bg-gradient-to-br from-purple-50 via-purple-50/80 to-indigo-100/60",
      textColor: "text-purple-700",
      progressBg: "bg-purple-100",
      progressColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
      hoverShadow: "hover:shadow-purple-200/50"
    },
    {
      // Emerald Green - Chemistry
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      cardBg: "bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-100/60",
      textColor: "text-emerald-700",
      progressBg: "bg-emerald-100",
      progressColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
      hoverShadow: "hover:shadow-emerald-200/50"
    },
    {
      // Warm Orange - Biology
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      cardBg: "bg-gradient-to-br from-orange-50 via-orange-50/80 to-red-100/60",
      textColor: "text-orange-700",
      progressBg: "bg-orange-100",
      progressColor: "bg-gradient-to-r from-orange-500 to-red-500",
      hoverShadow: "hover:shadow-orange-200/50"
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="skeleton-premium h-8 w-48 rounded-xl"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-0 shadow-premium">
              <CardContent className="p-6">
                <div className="skeleton-premium h-12 w-12 rounded-xl mb-4"></div>
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Your Subjects</h2>
        </div>
        
        <Card className="p-20 text-center glass-premium border-0">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">No subjects available</h3>
              <p className="text-body-sm text-muted-foreground max-w-md mx-auto">
                Subjects will appear here once they are assigned to you. Contact your instructor for more information.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Your Subjects</h2>
          <p className="text-body-sm text-muted-foreground">
            {subjects.length} active course{subjects.length !== 1 ? 's' : ''} • Keep learning and growing!
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {subjects.map((subject, index) => {
          const config = getSubjectConfig(subject.name, index)
          const IconComponent = config.icon
          
          return (
            <Card 
              key={subject.id} 
              className={`
                group cursor-pointer border-0 shadow-premium 
                ${config.cardBg} ${config.hoverShadow}
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-premium-lg
                rounded-xl overflow-hidden
                backdrop-blur-sm border border-white/20
              `}
              onClick={() => handleSubjectClick(subject.id, subject.name)}
            >
              <CardContent className="p-6 text-center relative">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Subject Icon - Standardized size */}
                <div className="flex justify-center mb-4 relative z-10">
                  <div className={`
                    p-3 rounded-xl ${config.iconBg} text-white shadow-md
                    transform transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                  `}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Subject Name - Standardized typography */}
                <h3 className={`
                  text-lg font-semibold ${config.textColor} mb-2 relative z-10
                  group-hover:text-opacity-90 transition-colors duration-300
                `}>
                  {subject.name}
                </h3>
                
                {/* Progress Text - Standardized */}
                <p className="text-body-sm text-gray-600 mb-4 font-medium relative z-10">
                  {subject.progress}% Complete
                </p>
                
                {/* Progress Bar - Standardized height */}
                <div className="mb-4 relative z-10">
                  <div className={`h-2 ${config.progressBg} rounded-full overflow-hidden shadow-inner`}>
                    <div 
                      className={`
                        h-full ${config.progressColor} rounded-full 
                        transition-all duration-700 ease-out
                        shadow-sm
                        group-hover:shadow-md
                      `}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Arrow Button - Standardized */}
                <div className="flex justify-center relative z-10">
                  <div className={`
                    p-2 rounded-lg ${config.textColor} opacity-60
                    group-hover:opacity-100 transition-all duration-300
                    group-hover:scale-125 group-hover:-rotate-12
                    bg-white/50 group-hover:bg-white/80
                  `}>
                    <ArrowUpRight className="h-4 w-4" />
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
