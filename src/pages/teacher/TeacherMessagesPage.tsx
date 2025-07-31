
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TeacherMessagesHeader } from "@/components/teacher/messages/TeacherMessagesHeader"
import { TeacherMessagesList } from "@/components/teacher/messages/TeacherMessagesList"
import { TeacherComposeForm } from "@/components/teacher/messages/TeacherComposeForm"
import { TeacherThreadView } from "@/components/teacher/messages/TeacherThreadView"
import { mockTeacherMessages, mockTeacherFaculty, mockTeacherThreads } from "@/data/mockTeacherMessages"
import { Message, MessageThread } from "@/types/messages"

export default function TeacherMessagesPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('inbox')
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [threads] = useState<MessageThread[]>(mockTeacherThreads)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate API call
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setMessages(mockTeacherMessages)
        setError(null)
      } catch (err) {
        setError('Failed to load messages. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

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
      <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
        <div className="flex items-center gap-4">
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
        <TeacherThreadView 
          thread={selectedThread} 
          currentUserId="teacher-1" 
          faculty={mockTeacherFaculty}
          onBack={handleBackToInbox}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-full overflow-hidden">
      <TeacherMessagesHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        unreadCount={messages.filter(m => !m.isRead).length}
      />
      
      {activeTab === 'inbox' ? (
        <TeacherMessagesList 
          messages={messages} 
          faculty={mockTeacherFaculty}
          onMessageClick={handleMessageClick}
          onComposeClick={handleComposeMessage}
          loading={loading}
          error={error}
        />
      ) : (
        <TeacherComposeForm 
          faculty={mockTeacherFaculty}
          onCancel={() => setActiveTab('inbox')}
          onSend={() => setActiveTab('inbox')}
        />
      )}
    </div>
  )
}
