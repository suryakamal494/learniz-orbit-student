
import { useState } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import { ChevronDown, Clock, User, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { Notification } from '@/types/notifications'

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  className?: string
}

const priorityIcons = {
  low: Info,
  medium: AlertCircle,
  high: AlertCircle
}

const priorityColors = {
  low: 'text-blue-500 bg-blue-50 border-blue-200',
  medium: 'text-amber-500 bg-amber-50 border-amber-200',
  high: 'text-red-500 bg-red-50 border-red-200'
}

const categoryColors = {
  assignment: 'bg-purple-50 text-purple-700 border-purple-200',
  announcement: 'bg-blue-50 text-blue-700 border-blue-200',
  grade: 'bg-green-50 text-green-700 border-green-200',
  system: 'bg-orange-50 text-orange-700 border-orange-200',
  deadline: 'bg-red-50 text-red-700 border-red-200'
}

export function NotificationCard({ notification, onMarkAsRead, className }: NotificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const PriorityIcon = priorityIcons[notification.priority]
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    if (!notification.isRead && !isExpanded) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <Card className={cn(
      "transition-premium hover-lift cursor-pointer relative overflow-hidden",
      !notification.isRead && "ring-2 ring-primary/20 bg-primary/2",
      className
    )}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div 
            className="w-full p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset"
            onClick={handleToggle}
          >
            <div className="flex items-start gap-3 md:gap-4">
              {/* Priority Indicator */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
                priorityColors[notification.priority]
              )}>
                <PriorityIcon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h3 className={cn(
                    "text-body-md font-semibold leading-tight",
                    !notification.isRead && "text-primary"
                  )}>
                    {notification.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                    
                    {/* Category badge */}
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs capitalize border", categoryColors[notification.category])}
                    >
                      {notification.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-body-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{notification.sender}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )} />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <CardContent className="pt-0 pb-6 px-4 md:px-6">
            <div className="ml-11 md:ml-12">
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <p className="text-body-sm leading-relaxed text-foreground">
                  {notification.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-body-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="font-medium">From: {notification.sender}</span>
                  <Badge variant="outline" className="text-xs">
                    {notification.senderType}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{format(notification.timestamp, 'PPp')}</span>
                </div>
              </div>

              {!notification.isRead && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkAsRead(notification.id)
                    }}
                    className="hover-scale"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as read
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
