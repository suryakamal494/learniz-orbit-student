
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
    gradient: "from-pastel-blue-400 to-pastel-blue-600"
  },
  {
    title: "Active Classes",
    value: "8",
    change: "2 today",
    changeType: "neutral" as const,
    icon: BookOpen,
    gradient: "from-pastel-green-400 to-pastel-green-600"
  },
  {
    title: "This Week",
    value: "24",
    change: "6 pending",
    changeType: "neutral" as const,
    icon: Calendar,
    gradient: "from-pastel-purple-400 to-pastel-purple-600"
  },
  {
    title: "Avg Performance",
    value: "87%",
    change: "+5%",
    changeType: "increase" as const,
    icon: TrendingUp,
    gradient: "from-pastel-peach-400 to-pastel-peach-600"
  }
]

export function TeacherStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="relative overflow-hidden border-2 border-primary/10 shadow-pastel-md backdrop-blur-sm hover:shadow-pastel-lg transition-all duration-300 hover:scale-105 group animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-pastel-md group-hover:shadow-pastel-lg transition-all duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              
              {stat.changeType === "increase" && (
                <Badge variant="secondary" className="bg-success-bg text-success border-2 border-success/30">
                  {stat.change}
                </Badge>
              )}
              {stat.changeType === "neutral" && (
                <Badge variant="secondary" className="bg-muted text-muted-foreground border-2 border-muted/30">
                  {stat.change}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
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
