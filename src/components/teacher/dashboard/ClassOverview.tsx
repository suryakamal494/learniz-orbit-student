
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Calendar, MoreHorizontal } from "lucide-react"

const upcomingClasses = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    time: "09:00 AM",
    duration: "1h 30m",
    students: 32,
    type: "Online",
    status: "scheduled"
  },
  {
    id: 2,
    subject: "Physics Lab",
    time: "02:00 PM",
    duration: "2h",
    students: 24,
    type: "Hybrid",
    status: "upcoming"
  },
  {
    id: 3,
    subject: "Chemistry Theory",
    time: "04:30 PM",
    duration: "1h",
    students: 28,
    type: "In-person",
    status: "scheduled"
  }
]

export function ClassOverview() {
  return (
    <Card className="border-border/50 shadow-premium backdrop-blur-sm bg-card/95">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-foreground">Today's Classes</CardTitle>
          <p className="text-body-sm text-muted-foreground mt-1">
            {upcomingClasses.length} classes scheduled for today
          </p>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-primary/10">
          View All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {upcomingClasses.map((classItem, index) => (
          <div 
            key={classItem.id}
            className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {classItem.subject}
                </h4>
                <Badge 
                  variant="secondary" 
                  className={`
                    text-xs font-medium
                    ${classItem.type === "Online" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                    ${classItem.type === "Hybrid" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                    ${classItem.type === "In-person" ? "bg-green-50 text-green-700 border-green-200" : ""}
                  `}
                >
                  {classItem.type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-6 text-body-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {classItem.time}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {classItem.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {classItem.students} students
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Join Class
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
