
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, MessageSquare, Calendar, CheckCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "exam",
    title: "Math Quiz submitted",
    description: "32 students completed the quiz",
    time: "2 hours ago",
    icon: FileText,
    status: "completed"
  },
  {
    id: 2,
    type: "message",
    title: "New student questions",
    description: "5 new messages in Physics group",
    time: "4 hours ago",
    icon: MessageSquare,
    status: "pending"
  },
  {
    id: 3,
    type: "attendance",
    title: "Attendance marked",
    description: "Chemistry Lab - 28/30 present",
    time: "6 hours ago",
    icon: Users,
    status: "completed"
  },
  {
    id: 4,
    type: "schedule",
    title: "Class rescheduled",
    description: "Advanced Math moved to 10:00 AM",
    time: "1 day ago",
    icon: Calendar,
    status: "updated"
  },
  {
    id: 5,
    type: "assignment",
    title: "Assignment reviewed",
    description: "Graded 24 submissions",
    time: "1 day ago",
    icon: CheckCircle,
    status: "completed"
  }
]

export function RecentActivity() {
  return (
    <Card className="border-border/50 shadow-premium backdrop-blur-sm bg-card/95 h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-foreground">Recent Activity</CardTitle>
          <p className="text-body-sm text-muted-foreground mt-1">
            Latest updates and notifications
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
          View All
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 group animate-fade-in cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`
              p-2 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-110
              ${activity.status === "completed" ? "bg-success/10 text-success" : ""}
              ${activity.status === "pending" ? "bg-warning/10 text-warning" : ""}
              ${activity.status === "updated" ? "bg-primary/10 text-primary" : ""}
            `}>
              <activity.icon className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-foreground text-body-sm group-hover:text-primary transition-colors line-clamp-1">
                  {activity.title}
                </h4>
                <Badge 
                  variant="secondary" 
                  className={`
                    text-xs shrink-0
                    ${activity.status === "completed" ? "bg-success/10 text-success border-success/20" : ""}
                    ${activity.status === "pending" ? "bg-warning/10 text-warning border-warning/20" : ""}
                    ${activity.status === "updated" ? "bg-primary/10 text-primary border-primary/20" : ""}
                  `}
                >
                  {activity.status}
                </Badge>
              </div>
              
              <p className="text-body-xs text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
              
              <p className="text-body-xs text-muted-foreground font-medium">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border/30">
          <Button 
            variant="ghost" 
            className="w-full text-primary hover:bg-primary/10 transition-all duration-300"
            size="sm"
          >
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
