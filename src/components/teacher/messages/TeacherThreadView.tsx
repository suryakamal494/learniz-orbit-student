import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageThread, Faculty, Message } from "@/types/messages"
import { TeacherReplyBox } from "./TeacherReplyBox"
import { ArrowLeft, Clock, User, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TeacherThreadViewProps {
  thread: MessageThread
  currentUserId: string
  faculty: Faculty[]
  onBack: () => void
}

export function TeacherThreadView({ thread, currentUserId, faculty, onBack }: TeacherThreadViewProps) {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [messages, setMessages] = useState<Message[]>(thread.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const getParticipantInfo = (participantId: string) => {
    return faculty.find(f => f.id === participantId)
  }

  const getSenderTypeIcon = (senderId: string) => {
    const sender = getParticipantInfo(senderId)
    if (sender?.department === 'Administration') {
      return <Users className="h-4 w-4 text-orange-500" />
    }
    return <User className="h-4 w-4 text-blue-500" />
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleReply = (messageBody: string) => {
    const otherParticipants = thread.participants.filter(p => p !== currentUserId)
    const recipientId = otherParticipants[0] || ''
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      recipientId: recipientId,
      subject: `Re: ${thread.messages[0]?.subject || 'No Subject'}`,
      body: messageBody,
      timestamp: new Date(),
      isRead: false,
      threadId: thread.id
    }

    setMessages(prev => [...prev, newMessage])
    setShowReplyBox(false)
  }

  const otherParticipants = thread.participants.filter(p => p !== currentUserId)
  const mainParticipant = getParticipantInfo(otherParticipants[0])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Thread Header */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-12 w-12 border-2 border-gray-200">
            <AvatarImage src={mainParticipant?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-semibold">
              {mainParticipant?.name.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {messages[0]?.subject || 'No Subject'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Conversation with {mainParticipant?.name}</span>
              {getSenderTypeIcon(otherParticipants[0])}
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="flex items-center gap-2"
        >
          Reply
        </Button>
      </div>

      {/* Messages */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {messages.map((message) => {
          const sender = getParticipantInfo(message.senderId)
          const isFromCurrentUser = message.senderId === currentUserId
          
          return (
            <Card key={message.id} className={`${isFromCurrentUser ? 'ml-12' : 'mr-12'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {!isFromCurrentUser && (
                    <Avatar className="h-10 w-10 border-2 border-gray-200">
                      <AvatarImage src={sender?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-semibold">
                        {sender?.name.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {isFromCurrentUser ? 'You' : sender?.name}
                        </span>
                        {!isFromCurrentUser && getSenderTypeIcon(message.senderId)}
                        {isFromCurrentUser && (
                          <Badge variant="outline" className="text-xs">
                            Sent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {message.body}
                      </p>
                    </div>
                  </div>

                  {isFromCurrentUser && (
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                        T
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Box */}
      {showReplyBox && (
        <TeacherReplyBox
          threadId={thread.id}
          onSend={handleReply}
          onCancel={() => setShowReplyBox(false)}
        />
      )}
    </div>
  )
}
