
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Microscope,
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
}

interface SubjectsGridProps {
  subjects?: Subject[]
  isLoading?: boolean
}

const defaultSubjects: Subject[] = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Biology" }
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

const getSubjectIcon = (name: string) => {
  const key = name.toLowerCase()
  return iconMap[key] || BookOpen
}

export function SubjectsGrid({ subjects = defaultSubjects, isLoading = false }: SubjectsGridProps) {
  const navigate = useNavigate()

  const handleSubjectClick = (subjectId: number, subjectName: string) => {
    navigate(`/subject/${subjectId}`, { state: { subjectName } })
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="skeleton-premium h-8 w-48 rounded-xl"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="skeleton-premium h-12 w-12 rounded-xl mb-4"></div>
                <div className="skeleton-premium h-5 w-3/4 rounded-lg mb-4"></div>
                <div className="skeleton-premium h-8 w-full rounded-lg"></div>
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
        <h2 className="text-2xl font-semibold text-foreground">Your Subjects</h2>
        
        <Card className="p-20 text-center border-0 shadow-sm">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-muted/50 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-foreground">No subjects available</h3>
              <p className="text-muted-foreground">
                Subjects will appear here once they are assigned to you.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your Subjects</h2>
        <p className="text-muted-foreground">
          {subjects.length} active course{subjects.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => {
          const IconComponent = getSubjectIcon(subject.name)
          
          return (
            <Card 
              key={subject.id} 
              className="border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-card"
            >
              <CardContent className="p-6 text-center space-y-4">
                {/* Subject Icon */}
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                
                {/* Subject Name */}
                <h3 className="text-lg font-medium text-foreground">
                  {subject.name}
                </h3>
                
                {/* Learn More Button */}
                <Button
                  onClick={() => handleSubjectClick(subject.id, subject.name)}
                  className="w-full"
                  variant="outline"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
