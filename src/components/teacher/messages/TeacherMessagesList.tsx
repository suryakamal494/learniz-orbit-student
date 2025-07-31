
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Message, Faculty } from "@/types/messages"
import { Search, PenSquare, Clock, User, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TeacherMessagesListProps {
  messages: Message[]
  faculty: Faculty[]
  onMessageClick: (message: Message) => void
  onComposeClick: () => void
}

export function TeacherMessagesList({ messages, faculty, onMessageClick, onComposeClick }: TeacherMessagesListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMessages = messages.filter(message => {
    const sender = faculty.find(f => f.id === message.senderId)
    return (
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sender?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const getSenderInfo = (senderId: string) => {
    return faculty.find(f => f.id === senderId)
  }

  const getSenderTypeIcon = (senderId: string) => {
    const sender = getSenderInfo(senderId)
    if (sender?.department === 'Administration') {
      return <Users className="h-4 w-4 text-orange-500" />
    }
    return <User className="h-4 w-4 text-blue-500" />
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 mb-4">
          <PenSquare className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
        <p className="text-gray-600 mb-4">
          Start communicating with students and colleagues
        </p>
        <Button onClick={onComposeClick} className="flex items-center gap-2">
          <PenSquare className="h-4 w-4" />
          Compose Message
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onComposeClick} className="flex items-center gap-2">
          <PenSquare className="h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="space-y-3">
        {filteredMessages.map((message) => {
          const sender = getSenderInfo(message.senderId)
          
          return (
            <Card 
              key={message.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                !message.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
              }`}
              onClick={() => onMessageClick(message)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border-2 border-gray-200">
                    <AvatarImage src={sender?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-semibold">
                      {sender?.name.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {sender?.name || 'Unknown Sender'}
                        </h3>
                        {getSenderTypeIcon(message.senderId)}
                        {!message.isRead && (
                          <Badge variant="secondary" className="h-5 text-xs bg-primary/15 text-primary">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-2 ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {message.subject}
                    </p>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {message.body}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        From: {sender?.department || 'Unknown Department'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
