
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface ReplyBoxProps {
  onSend: (message: string) => void
}

export function ReplyBox({ onSend }: ReplyBoxProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSend(message.trim())
    setMessage("")
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your reply..."
        className="flex-1 min-h-12 max-h-32 resize-none"
        disabled={isLoading}
      />
      
      <Button 
        type="submit" 
        disabled={!message.trim() || isLoading}
        className="flex items-center gap-2 px-4"
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline">
          {isLoading ? 'Sending...' : 'Send'}
        </span>
      </Button>
    </form>
  )
}
