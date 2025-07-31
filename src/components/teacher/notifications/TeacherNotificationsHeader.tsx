
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCheck } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TeacherNotificationsHeaderProps {
  filter: 'all' | 'unread'
  onFilterChange: (filter: 'all' | 'unread') => void
  onMarkAllRead: () => void
  unreadCount: number
}

export function TeacherNotificationsHeader({ 
  filter, 
  onFilterChange, 
  onMarkAllRead, 
  unreadCount 
}: TeacherNotificationsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-modern">
          <Bell className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-600">
            Stay updated with important announcements and system updates
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select value={filter} onValueChange={(value: 'all' | 'unread') => onFilterChange(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">
              <div className="flex items-center gap-2">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="h-4 min-w-4 text-xs bg-primary/15 text-primary">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            className="flex items-center gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>
    </div>
  )
}
