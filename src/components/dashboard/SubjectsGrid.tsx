
import { Card, CardContent } from "@/components/ui/card"
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
  Trophy
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
      bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      progressColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      borderColor: "border-blue-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-purple-600",
      progressColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      borderColor: "border-purple-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      textColor: "text-green-600",
      progressColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      borderColor: "border-green-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-orange-50 to-red-50",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      textColor: "text-orange-600",
      progressColor: "bg-gradient-to-r from-orange-500 to-red-500",
      borderColor: "border-orange-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-indigo-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
      progressColor: "bg-gradient-to-r from-indigo-500 to-blue-500",
      borderColor: "border-indigo-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-rose-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
      textColor: "text-rose-600",
      progressColor: "bg-gradient-to-r from-rose-500 to-pink-500",
      borderColor: "border-rose-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-teal-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
      textColor: "text-teal-600",
      progressColor: "bg-gradient-to-r from-teal-500 to-cyan-500",
      borderColor: "border-teal-100"
    },
    {
      bgGradient: "bg-gradient-to-br from-yellow-50 to-orange-50",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      textColor: "text-yellow-600",
      progressColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      borderColor: "border-yellow-100"
    }
  ]

  return {
    icon: iconMap[key] || BookOpen,
    ...colorConfigs[index % colorConfigs.length]
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
          <h2 className="text-2xl font-bold text-gray-900">
            Your Subjects
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full"></div>
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
          <h2 className="text-2xl font-bold text-gray-900">
            Your Subjects
          </h2>
        </div>
        
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto" />
            <h3 className="text-lg font-medium text-gray-500">No subjects available</h3>
            <p className="text-sm text-gray-400">Subjects will appear here once they are assigned to you.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Subjects
        </h2>
        {subjects.length > 0 && (
          <span className="text-sm text-gray-500">
            {subjects.length} subject{subjects.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {subjects.map((subject, index) => {
          const config = getSubjectConfig(subject.name, index)
          const IconComponent = config.icon
          
          return (
            <Card 
              key={subject.id} 
              className={`
                relative overflow-hidden transition-all duration-300 hover:shadow-lg
                hover:-translate-y-1 ${config.bgGradient} ${config.borderColor} border-2
                group cursor-pointer transform-gpu
              `}
              onClick={() => handleSubjectClick(subject.id, subject.name)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className={`
                  p-4 rounded-2xl ${config.iconBg} text-white shadow-lg
                  group-hover:scale-105 transition-transform duration-300
                `}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className={`text-lg font-semibold ${config.textColor} line-clamp-2`}>
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {subject.progress}% Complete
                  </p>
                </div>
                
                <div className="w-full bg-white/50 rounded-full h-2.5 shadow-inner">
                  <div 
                    className={`
                      h-2.5 rounded-full ${config.progressColor}
                      transition-all duration-1000 ease-out shadow-sm
                    `}
                    style={{ width: `${Math.min(100, Math.max(0, subject.progress))}%` }}
                  />
                </div>
                
                <ArrowUpRight className={`h-4 w-4 ${config.textColor} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300`} />
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
