
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ArrowLeft, Save, X } from 'lucide-react'
import { InstructionFormData } from '@/types/instruction'
import { useToast } from '@/hooks/use-toast'

const instructionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required').max(5000, 'Content must be less than 5000 characters')
})

const CreateInstructionPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<InstructionFormData>({
    resolver: zodResolver(instructionSchema),
    defaultValues: {
      title: '',
      content: ''
    }
  })

  const onSubmit = (data: InstructionFormData) => {
    // Mock API call - in real app this would be an API request
    console.log('Creating instruction:', data)
    
    toast({
      title: "Success",
      description: "Instruction created successfully",
    })
    
    navigate('/teacher/instructions')
  }

  const handleCancel = () => {
    navigate('/teacher/instructions')
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/teacher/instructions')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Instructions
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Instruction</h1>
          <p className="text-gray-600 mt-1">
            Add a new instruction for students and staff
          </p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Instruction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter instruction title..." 
                        {...field} 
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content *</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter instruction content..."
                        minHeight="300px"
                        className="border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-3 pt-6 border-t">
                <Button type="submit" disabled={form.formState.isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Instruction
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateInstructionPage
