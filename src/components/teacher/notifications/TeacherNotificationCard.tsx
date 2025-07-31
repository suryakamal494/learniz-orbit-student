
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Notification } from "@/types/notifications"
import { 
  Clock, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  User, 
  Shield, 
  Settings 
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TeacherNotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export function TeacherNotificationCard({ notification, onMarkAsRead }: TeacherNotificationCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'assignment': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'announcement': return <Info className="h-4 w-4 text-blue-500" />
      case 'grade': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'system': return <Settings className="h-4 w-4 text-gray-500" />
      case 'deadline': return <Clock className="h-4 w-4 text-red-500" />
      default: return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case 'Faculty': return <User className="h-4 w-4 text-blue-500" />
      case 'Admin': return <Shield className="h-4 w-4 text-orange-500" />
      case 'System': return <Settings className="h-4 w-4 text-gray-500" />
      default: return <User className="h-4 w-4 text-blue-500" />
    }
  }

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        !notification.isRead 
          ? 'border-l-4 border-l-primary bg-primary/5' 
          : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border-2 border-gray-200">
            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
              {getSenderIcon(notification.senderType)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h3>
                {getCategoryIcon(notification.category)}
                {!notification.isRead && (
                  <Badge variant="secondary" className="h-5 text-xs bg-primary/15 text-primary">
                    New
                  </Badge>
                )}
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${getPriorityColor(notification.priority)}`}
              >
                {notification.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {notification.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span>From: {notification.sender}</span>
                <span>•</span>
                <span className="capitalize">{notification.senderType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
