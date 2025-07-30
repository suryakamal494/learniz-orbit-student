
import { Mail, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MessagesHeaderProps {
  activeTab: 'inbox' | 'compose'
  onTabChange: (tab: 'inbox' | 'compose') => void
  unreadCount: number
}

export function MessagesHeader({ activeTab, onTabChange, unreadCount }: MessagesHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'inbox' ? 'default' : 'outline'}
            onClick={() => onTabChange('inbox')}
            className={`flex items-center gap-2 h-10 ${
              activeTab === 'inbox' 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'border-primary/30 text-primary hover:bg-primary/10'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Inbox</span>
          </Button>
          
          <Button
            variant={activeTab === 'compose' ? 'default' : 'outline'}
            onClick={() => onTabChange('compose')}
            className={`flex items-center gap-2 h-10 ${
              activeTab === 'compose' 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'border-primary/30 text-primary hover:bg-primary/10'
            }`}
          >
            <Edit3 className="h-4 w-4" />
            <span className="hidden sm:inline">Compose</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
