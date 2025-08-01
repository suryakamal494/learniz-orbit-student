
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, X, CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
  subject: z.string().min(1, 'Subject is required'),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  showInHomepage: z.enum(['yes', 'no']),
  startDate: z.date().optional(),
  endDate: z.date().optional()
})

type FormData = z.infer<typeof formSchema>

const CreateLMSSeriesPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalItems] = useState(0) // Auto-calculated, non-editable

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subject: '',
      chapter: '',
      topic: '',
      showInHomepage: 'no',
      startDate: undefined,
      endDate: undefined
    }
  })

  const watchedSubject = form.watch('subject')
  const watchedChapter = form.watch('chapter')

  // Mock data for dropdowns - in real app, these would come from API
  const subjects = ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'English', 'History']
  
  const chaptersBySubject: Record<string, string[]> = {
    'Physics': ['Motion in a Straight Line', 'Laws of Motion', 'Work, Energy and Power'],
    'Mathematics': ['Algebra', 'Calculus', 'Geometry', 'Statistics'],
    'Chemistry': ['Acids and Bases', 'Organic Chemistry', 'Chemical Bonding'],
    'Biology': ['Cell Structure', 'Genetics', 'Evolution', 'Ecology'],
    'English': ['Poetry Analysis', 'Grammar', 'Literature'],
    'History': ['World War II', 'Ancient History', 'Medieval Period']
  }
  
  const topicsByChapter: Record<string, string[]> = {
    'Motion in a Straight Line': ['Uniform Motion', 'Non-uniform Motion', 'Acceleration'],
    'Algebra': ['Linear Equations', 'Quadratic Equations', 'Functions'],
    'Acids and Bases': ['pH Scale', 'Neutralization', 'Salt Formation'],
    'Cell Structure': ['Cell Organelles', 'Cell Division', 'Cell Membrane'],
    'Poetry Analysis': ['Romantic Poetry', 'Modern Poetry', 'Classical Poetry'],
    'World War II': ['European Theatre', 'Pacific Theatre', 'Home Front']
  }

  const availableChapters = watchedSubject ? chaptersBySubject[watchedSubject] || [] : []
  const availableTopics = watchedChapter ? topicsByChapter[watchedChapter] || [] : []

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Creating series:', { ...data, totalItems })
      
      // Navigate back to series list
      navigate('/teacher/lms/series')
    } catch (error) {
      console.error('Error creating series:', error)
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
          onClick={() => navigate('/teacher/lms/series')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Series
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New LMS Series</h1>
          <p className="text-muted-foreground mt-1">Create a new learning series for your students</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Series Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter series title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <Select onValueChange={(value) => {
                        field.onChange(value)
                        // Reset chapter and topic when subject changes
                        form.setValue('chapter', '')
                        form.setValue('topic', '')
                      }} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={(value) => {
                        field.onChange(value)
                        // Reset topic when chapter changes
                        form.setValue('topic', '')
                      }} value={field.value} disabled={!watchedSubject}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select chapter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableChapters.map(chapter => (
                            <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value} disabled={!watchedChapter}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTopics.map(topic => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Total Items</FormLabel>
                  <FormControl>
                    <Input 
                      value={totalItems} 
                      disabled 
                      className="bg-muted cursor-not-allowed"
                      placeholder="Auto-calculated"
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">This field updates automatically when content is added</p>
                </FormItem>

                <FormField
                  control={form.control}
                  name="showInHomepage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Show in Homepage *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select start date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select end date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Creating...' : 'Create Series'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/teacher/lms/series')}
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

export default CreateLMSSeriesPage
