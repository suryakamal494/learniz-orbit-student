
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
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/30",
    progress: 78
  },
  {
    id: 2,
    name: "Physics",
    icon: Atom,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/30",
    progress: 65
  },
  {
    id: 3,
    name: "Chemistry",
    icon: FlaskConical,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/30",
    progress: 82
  },
  {
    id: 4,
    name: "Biology",
    icon: Microscope,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    borderColor: "border-orange-500/30",
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
        <h2 className="text-2xl font-bold text-foreground">
          Your Subjects
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className={`
              relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 
              hover:-translate-y-2 bg-gradient-to-br ${subject.bgGradient} ${subject.borderColor} 
              border-2 group cursor-pointer hover:border-primary/50 transform-gpu
              backdrop-blur-sm
            `}
            onClick={() => handleSubjectClick(subject.id, subject.name)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className={`
                p-4 rounded-2xl bg-gradient-to-r ${subject.gradient} text-white shadow-lg
                group-hover:scale-110 transition-transform duration-300
              `}>
                <subject.icon className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {subject.progress}% Complete
                </p>
              </div>
              
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div 
                  className={`
                    h-2 rounded-full bg-gradient-to-r ${subject.gradient} 
                    transition-all duration-1000 ease-out
                  `}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </CardContent>
            
            {/* Subtle background decoration */}
            <div className={`
              absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${subject.gradient} 
              rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300
            `} />
          </Card>
        ))}
      </div>
    </div>
  )
}
