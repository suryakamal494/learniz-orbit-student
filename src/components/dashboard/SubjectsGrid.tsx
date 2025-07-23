
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
    bgColor: "bg-blue-100",
    iconBg: "bg-blue-500",
    textColor: "text-blue-600",
    progressColor: "bg-blue-500",
    progress: 78
  },
  {
    id: 2,
    name: "Physics",
    icon: Atom,
    bgColor: "bg-purple-100",
    iconBg: "bg-purple-500",
    textColor: "text-purple-600",
    progressColor: "bg-purple-500",
    progress: 65
  },
  {
    id: 3,
    name: "Chemistry",
    icon: FlaskConical,
    bgColor: "bg-green-100",
    iconBg: "bg-green-500",
    textColor: "text-green-600",
    progressColor: "bg-green-500",
    progress: 82
  },
  {
    id: 4,
    name: "Biology",
    icon: Microscope,
    bgColor: "bg-orange-100",
    iconBg: "bg-orange-500",
    textColor: "text-orange-600",
    progressColor: "bg-orange-500",
    progress: 71
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
              hover:-translate-y-1 ${subject.bgColor} border-0
              group cursor-pointer transform-gpu
            `}
            onClick={() => handleSubjectClick(subject.id, subject.name)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className={`
                p-4 rounded-2xl ${subject.iconBg} text-white shadow-md
                group-hover:scale-105 transition-transform duration-300
              `}>
                <subject.icon className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className={`text-lg font-semibold ${subject.textColor}`}>
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {subject.progress}% Complete
                </p>
              </div>
              
              <div className="w-full bg-white/70 rounded-full h-2">
                <div 
                  className={`
                    h-2 rounded-full ${subject.progressColor}
                    transition-all duration-1000 ease-out
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
