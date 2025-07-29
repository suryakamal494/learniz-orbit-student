
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit3, Mail } from "lucide-react"
import { Message, Faculty } from "@/types/messages"

interface MessagesListProps {
  messages: Message[]
  faculty: Faculty[]
  onMessageClick: (message: Message) => void
  onComposeClick: () => void
}

export function MessagesList({ messages, faculty, onMessageClick, onComposeClick }: MessagesListProps) {
  const getFacultyById = (id: string) => {
    return faculty.find(f => f.id === id)
  }

  const getMessagePreview = (body: string) => {
    return body.length > 100 ? `${body.substring(0, 100)}...` : body
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Mail className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
        <p className="text-muted-foreground mb-6">
          Start a conversation with your faculty members
        </p>
        <Button onClick={onComposeClick} className="flex items-center gap-2">
          <Edit3 className="h-4 w-4" />
          Compose Message
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const sender = getFacultyById(message.senderId)
        
        return (
          <Card 
            key={message.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              !message.isRead ? 'border-primary/50 bg-primary/5' : 'hover:bg-muted/50'
            }`}
            onClick={() => onMessageClick(message)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={sender?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {sender?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {sender?.name}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!message.isRead && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          New
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground mb-1 truncate">
                    {message.subject}
                  </p>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {getMessagePreview(message.body)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
