
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Microscope,
  ChevronRight,
  Clock,
  BookOpen,
  TrendingUp,
  Star
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    icon: Calculator,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    progress: 78,
    nextClass: "Today, 10:00 AM",
    topics: ["Calculus", "Algebra", "Geometry"],
    recentActivity: "Completed Chapter 5 Quiz",
    streak: 12,
    score: 92
  },
  {
    id: 2,
    name: "Physics",
    icon: Atom,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    progress: 65,
    nextClass: "Tomorrow, 2:00 PM",
    topics: ["Mechanics", "Optics", "Thermodynamics"],
    recentActivity: "Lab Report Due Soon",
    streak: 8,
    score: 85
  },
  {
    id: 3,
    name: "Chemistry",
    icon: FlaskConical,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    progress: 82,
    nextClass: "Today, 1:30 PM",
    topics: ["Organic", "Inorganic", "Physical"],
    recentActivity: "New Assignment Posted",
    streak: 15,
    score: 88
  },
  {
    id: 4,
    name: "Biology",
    icon: Microscope,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    progress: 71,
    nextClass: "Friday, 11:00 AM",
    topics: ["Genetics", "Ecology", "Cell Biology"],
    recentActivity: "Virtual Lab Completed",
    streak: 6,
    score: 90
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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Your Subjects
        </h2>
        <Button variant="outline" size="sm" className="group">
          View All
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className={`
              relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 
              ${subject.bgColor} ${subject.borderColor} border-2 group cursor-pointer
              hover:border-primary/50 transform-gpu
            `}
            onClick={() => handleSubjectClick(subject.id, subject.name)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    p-3 rounded-xl bg-gradient-to-r ${subject.color} text-white shadow-lg
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <subject.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {subject.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {subject.progress}% Complete
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{subject.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500 font-medium">{subject.streak} day streak</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{subject.nextClass}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{subject.recentActivity}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {subject.topics.map((topic, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs group-hover:bg-primary/10 transition-colors"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`
                      h-2 rounded-full bg-gradient-to-r ${subject.color} 
                      transition-all duration-1000 ease-out
                      group-hover:animate-pulse
                    `}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`
                absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r ${subject.color} 
                rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300
              `} />
              <div className={`
                absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r ${subject.color} 
                rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300
              `} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
