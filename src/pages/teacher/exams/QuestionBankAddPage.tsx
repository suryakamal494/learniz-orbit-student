
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  type: z.enum(['single', 'multiple', 'fillInBlanks']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  marks: z.number().min(1, 'Marks must be at least 1'),
  explanation: z.string().optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  category: z.string().min(1, 'Category is required')
})

type FormData = z.infer<typeof formSchema>

export default function QuestionBankAddPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      type: 'single',
      difficulty: 'medium',
      marks: 1,
      explanation: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      chapter: '',
      topic: '',
      category: ''
    }
  })

  const questionType = form.watch('type')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Adding question:', data)
      
      // Navigate back to question bank main page
      navigate('/teacher/question-bank')
    } catch (error) {
      console.error('Error adding question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/teacher/question-bank')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Question Bank
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Add New Question</h1>
          <p className="text-muted-foreground mt-1">Create a new question for the question bank</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single Choice</SelectItem>
                          <SelectItem value="multiple">Multiple Choice</SelectItem>
                          <SelectItem value="fillInBlanks">Fill in Blanks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marks *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter marks"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chapter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chapter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter topic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Question Content with Rich Text Editor */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question *</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter your question here... Use the formula button (∫) to add mathematical expressions."
                        minHeight="150px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional Options */}
              {(questionType === 'single' || questionType === 'multiple') && (
                <div className="space-y-4">
                  <Label>Options *</Label>
                  {[0, 1, 2, 3].map((index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`options.${index}` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder={`Option ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  
                  <FormField
                    control={form.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correct Answer *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter correct answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Explanation with Rich Text Editor */}
              <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation (Optional)</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value || ''}
                        onChange={field.onChange}
                        placeholder="Enter explanation for the answer... You can include mathematical formulas and formatting."
                        minHeight="120px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Adding...' : 'Add Question'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/teacher/question-bank')}
                  className="flex-1 sm:flex-none"
                >
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
