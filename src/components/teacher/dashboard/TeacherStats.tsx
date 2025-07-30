
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "284",
    change: "+12",
    changeType: "increase" as const,
    icon: Users,
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    title: "Active Classes",
    value: "8",
    change: "2 today",
    changeType: "neutral" as const,
    icon: BookOpen,
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    title: "This Week",
    value: "24",
    change: "6 pending",
    changeType: "neutral" as const,
    icon: Calendar,
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    title: "Avg Performance",
    value: "87%",
    change: "+5%",
    changeType: "increase" as const,
    icon: TrendingUp,
    color: "bg-gradient-to-br from-orange-500 to-orange-600"
  }
]

export function TeacherStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="relative overflow-hidden border-border/50 shadow-premium backdrop-blur-sm bg-card/95 hover:shadow-premium-lg transition-all duration-300 hover:scale-105 group animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} shadow-modern group-hover:shadow-modern-lg transition-all duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              
              {stat.changeType === "increase" && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  {stat.change}
                </Badge>
              )}
              {stat.changeType === "neutral" && (
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {stat.change}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </h3>
              <p className="text-body-sm text-muted-foreground font-medium">
                {stat.title}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
