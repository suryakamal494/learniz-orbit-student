
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MessagesHeader } from "@/components/messages/MessagesHeader"
import { MessagesList } from "@/components/messages/MessagesList"
import { ComposeForm } from "@/components/messages/ComposeForm"
import { ThreadView } from "@/components/messages/ThreadView"
import { mockMessages, mockFaculty, mockThreads } from "@/data/mockMessages"
import { Message, MessageThread } from "@/types/messages"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('inbox')
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [messages] = useState<Message[]>(mockMessages)
  const [threads] = useState<MessageThread[]>(mockThreads)

  const handleMessageClick = (message: Message) => {
    const thread = threads.find(t => t.id === message.threadId)
    if (thread) {
      setSelectedThread(thread)
    }
  }

  const handleBackToInbox = () => {
    setSelectedThread(null)
    setActiveTab('inbox')
  }

  const handleComposeMessage = () => {
    setActiveTab('compose')
    setSelectedThread(null)
  }

  if (selectedThread) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToInbox}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        <ThreadView 
          thread={selectedThread} 
          currentUserId="student-1" 
          faculty={mockFaculty}
          onBack={handleBackToInbox}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MessagesHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        unreadCount={messages.filter(m => !m.isRead).length}
      />
      
      <main className="p-4 md:p-6">
        {activeTab === 'inbox' ? (
          <MessagesList 
            messages={messages} 
            faculty={mockFaculty}
            onMessageClick={handleMessageClick}
            onComposeClick={handleComposeMessage}
          />
        ) : (
          <ComposeForm 
            faculty={mockFaculty}
            onCancel={() => setActiveTab('inbox')}
            onSend={() => setActiveTab('inbox')}
          />
        )}
      </main>
    </div>
  )
}
