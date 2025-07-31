
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Send, X } from "lucide-react"

const replySchema = z.object({
  message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
})

type ReplyFormData = z.infer<typeof replySchema>

interface TeacherReplyBoxProps {
  threadId: string
  onSend: (message: string) => void
  onCancel: () => void
}

export function TeacherReplyBox({ threadId, onSend, onCancel }: TeacherReplyBoxProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      message: ""
    }
  })

  const handleSubmit = async (data: ReplyFormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Sending reply to thread:', threadId, data.message)
    onSend(data.message)
    setIsLoading(false)
  }

  const messageLength = form.watch('message')?.length || 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Reply</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Type your reply here..."
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <FormMessage />
                    <span className={`text-xs ${messageLength > 900 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {messageLength}/1000
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isLoading ? 'Sending...' : 'Send Reply'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
