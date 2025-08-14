
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "284",
    change: "+12 this month",
    changeType: "increase" as const,
    icon: Users,
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
    textColor: "text-blue-900",
    subtitleColor: "text-blue-700",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    title: "Active Classes",
    value: "8",
    change: "2 scheduled today",
    changeType: "neutral" as const,
    icon: BookOpen,
    gradient: "bg-gradient-to-br from-emerald-50 to-teal-100", 
    iconBg: "bg-emerald-500",
    textColor: "text-emerald-900",
    subtitleColor: "text-emerald-700",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  {
    title: "This Week",
    value: "24",
    change: "6 classes pending",
    changeType: "neutral" as const,
    icon: Calendar,
    gradient: "bg-gradient-to-br from-purple-50 to-indigo-100",
    iconBg: "bg-purple-500", 
    textColor: "text-purple-900",
    subtitleColor: "text-purple-700",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
  },
  {
    title: "Avg Performance",
    value: "87%",
    change: "+5% improvement",
    changeType: "increase" as const,
    icon: TrendingUp,
    gradient: "bg-gradient-to-br from-amber-50 to-orange-100",
    iconBg: "bg-amber-500",
    textColor: "text-amber-900", 
    subtitleColor: "text-amber-700",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
  }
]

export function ModernTeacherStats() {
  return (
    <>
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className={`relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group animate-fade-in ${stat.gradient}`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.iconBg} shadow-sm group-hover:shadow-md transition-shadow`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className={`text-2xl font-bold ${stat.textColor} group-hover:scale-105 transition-transform`}>
                {stat.value}
              </h3>
              <p className={`text-xs font-medium ${stat.subtitleColor}`}>
                {stat.title}
              </p>
              <Badge className={`${stat.badgeColor} text-xs font-medium`}>
                {stat.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
