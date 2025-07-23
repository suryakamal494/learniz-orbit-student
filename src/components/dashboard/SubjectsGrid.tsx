
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
  BookOpen
} from "lucide-react"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    icon: Calculator,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    progress: 78,
    nextClass: "Today, 10:00 AM",
    topics: ["Calculus", "Algebra", "Geometry"],
    recentActivity: "Completed Chapter 5 Quiz"
  },
  {
    id: 2,
    name: "Physics",
    icon: Atom,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    progress: 65,
    nextClass: "Tomorrow, 2:00 PM",
    topics: ["Mechanics", "Optics", "Thermodynamics"],
    recentActivity: "Lab Report Due Soon"
  },
  {
    id: 3,
    name: "Chemistry",
    icon: FlaskConical,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    progress: 82,
    nextClass: "Today, 1:30 PM",
    topics: ["Organic", "Inorganic", "Physical"],
    recentActivity: "New Assignment Posted"
  },
  {
    id: 4,
    name: "Biology",
    icon: Microscope,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    progress: 71,
    nextClass: "Friday, 11:00 AM",
    topics: ["Genetics", "Ecology", "Cell Biology"],
    recentActivity: "Virtual Lab Completed"
  }
]

export function SubjectsGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Subjects</h2>
        <Button variant="outline" size="sm">
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className={`
              relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1
              ${subject.bgColor} ${subject.borderColor} border-2 group cursor-pointer
            `}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${subject.color} text-white shadow-md`}>
                    <subject.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {subject.progress}% Complete
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
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
                  <Badge key={index} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
