
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
    gradient: "from-primary/80 to-primary"
  },
  {
    title: "Active Classes",
    value: "8",
    change: "2 today",
    changeType: "neutral" as const,
    icon: BookOpen,
    gradient: "from-success/80 to-success"
  },
  {
    title: "This Week",
    value: "24",
    change: "6 pending",
    changeType: "neutral" as const,
    icon: Calendar,
    gradient: "from-accent-teal/80 to-accent-teal"
  },
  {
    title: "Avg Performance",
    value: "87%",
    change: "+5%",
    changeType: "increase" as const,
    icon: TrendingUp,
    gradient: "from-accent-orange/80 to-accent-orange"
  }
]

export function TeacherStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="relative overflow-hidden border-border/50 shadow-modern backdrop-blur-sm bg-card/95 hover:shadow-modern-lg transition-all duration-300 hover:scale-105 hover:border-primary/30 group animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-sm group-hover:shadow-md transition-all duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              
              {stat.changeType === "increase" && (
                <Badge variant="secondary" className="bg-success/15 text-success border-success/30">
                  {stat.change}
                </Badge>
              )}
              {stat.changeType === "neutral" && (
                <Badge variant="secondary" className="bg-muted/50 text-muted-foreground border-muted-foreground/30">
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
