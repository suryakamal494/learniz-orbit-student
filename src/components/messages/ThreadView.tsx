
import { useState, useEffect, useRef } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MessageThread, Faculty } from "@/types/messages"
import { ReplyBox } from "./ReplyBox"

interface ThreadViewProps {
  thread: MessageThread
  currentUserId: string
  faculty: Faculty[]
  onBack: () => void
}

export function ThreadView({ thread, currentUserId, faculty }: ThreadViewProps) {
  const [messages, setMessages] = useState(thread.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getFacultyById = (id: string) => {
    return faculty.find(f => f.id === id)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleReply = (messageBody: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      recipientId: thread.participants.find(p => p !== currentUserId) || '',
      subject: `Re: ${thread.messages[0].subject}`,
      body: messageBody,
      timestamp: new Date(),
      isRead: false,
      threadId: thread.id
    }

    setMessages(prev => [...prev, newMessage])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const sender = getFacultyById(message.senderId)
          const isCurrentUser = message.senderId === currentUserId
          
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isCurrentUser && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={sender?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {sender?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                <Card className={`${
                  isCurrentUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {isCurrentUser ? 'You' : sender?.name}
                      </span>
                      <span className={`text-xs ${
                        isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-sm whitespace-pre-wrap">
                      {message.body}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {isCurrentUser && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    You
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-border/50 p-4">
        <ReplyBox onSend={handleReply} />
      </div>
    </div>
  )
}
