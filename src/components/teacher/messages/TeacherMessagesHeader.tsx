
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, PenSquare } from "lucide-react"

interface TeacherMessagesHeaderProps {
  activeTab: 'inbox' | 'compose'
  onTabChange: (tab: 'inbox' | 'compose') => void
  unreadCount: number
}

export function TeacherMessagesHeader({ activeTab, onTabChange, unreadCount }: TeacherMessagesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-modern">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-600">
            Communicate with students and administration
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'inbox' | 'compose')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Inbox
              {unreadCount > 0 && (
                <Badge variant="secondary" className="h-5 min-w-5 text-xs bg-primary/15 text-primary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="compose" className="flex items-center gap-2">
              <PenSquare className="h-4 w-4" />
              Compose
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
