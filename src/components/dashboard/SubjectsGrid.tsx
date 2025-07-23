
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Microscope,
  ArrowUpRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    icon: Calculator,
    bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
    progressColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    progress: 78,
    borderColor: "border-blue-100"
  },
  {
    id: 2,
    name: "Physics",
    icon: Atom,
    bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    progressColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    progress: 65,
    borderColor: "border-purple-100"
  },
  {
    id: 3,
    name: "Chemistry",
    icon: FlaskConical,
    bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    textColor: "text-green-600",
    progressColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    progress: 82,
    borderColor: "border-green-100"
  },
  {
    id: 4,
    name: "Biology",
    icon: Microscope,
    bgGradient: "bg-gradient-to-br from-orange-50 to-red-50",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    textColor: "text-orange-600",
    progressColor: "bg-gradient-to-r from-orange-500 to-red-500",
    progress: 71,
    borderColor: "border-orange-100"
  }
]

export function SubjectsGrid() {
  const navigate = useNavigate()

  const handleSubjectClick = (subjectId: number, subjectName: string) => {
    navigate(`/subject/${subjectId}`, { state: { subjectName } })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Subjects
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className={`
              relative overflow-hidden transition-all duration-300 hover:shadow-lg
              hover:-translate-y-1 ${subject.bgGradient} ${subject.borderColor} border-2
              group cursor-pointer transform-gpu
            `}
            onClick={() => handleSubjectClick(subject.id, subject.name)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className={`
                p-4 rounded-2xl ${subject.iconBg} text-white shadow-lg
                group-hover:scale-105 transition-transform duration-300
              `}>
                <subject.icon className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className={`text-lg font-semibold ${subject.textColor}`}>
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {subject.progress}% Complete
                </p>
              </div>
              
              <div className="w-full bg-white/50 rounded-full h-2.5 shadow-inner">
                <div 
                  className={`
                    h-2.5 rounded-full ${subject.progressColor}
                    transition-all duration-1000 ease-out shadow-sm
                  `}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              
              <ArrowUpRight className={`h-4 w-4 ${subject.textColor} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
