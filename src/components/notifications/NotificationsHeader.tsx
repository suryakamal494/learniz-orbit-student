
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCheck, Filter } from 'lucide-react'

interface NotificationsHeaderProps {
  filter: 'all' | 'unread'
  onFilterChange: (filter: 'all' | 'unread') => void
  onMarkAllRead: () => void
  unreadCount: number
}

export function NotificationsHeader({ 
  filter, 
  onFilterChange, 
  onMarkAllRead, 
  unreadCount 
}: NotificationsHeaderProps) {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-display-md font-bold text-gradient-primary mb-2">
            Notifications
          </h1>
          <p className="text-body-sm text-muted-foreground">
            Stay updated with the latest announcements and updates
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={onMarkAllRead}
            className="hover-scale"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          onClick={() => onFilterChange('all')}
          className={`
            relative h-12 rounded-t-lg rounded-b-none border-b-2
            ${filter === 'all' 
              ? 'border-primary bg-primary/5 text-primary font-semibold' 
              : 'border-transparent hover:border-border text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <Filter className="h-4 w-4 mr-2" />
          All Notifications
        </Button>
        
        <Button
          variant={filter === 'unread' ? 'default' : 'ghost'}
          onClick={() => onFilterChange('unread')}
          className={`
            relative h-12 rounded-t-lg rounded-b-none border-b-2
            ${filter === 'unread' 
              ? 'border-primary bg-primary/5 text-primary font-semibold' 
              : 'border-transparent hover:border-border text-muted-foreground hover:text-foreground'
            }
          `}
        >
          Unread
          {unreadCount > 0 && (
            <Badge className="ml-2 h-5 min-w-5 bg-primary text-primary-foreground text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}
