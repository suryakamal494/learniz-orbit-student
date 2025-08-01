
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Plus } from 'lucide-react'
import type { ExamFormData } from '@/types/exam'
import { useToast } from '@/hooks/use-toast'

const examFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['Subject Exam', 'Quiz', 'LMS Exam']),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  marksPerQuestion: z.number().min(0.1, 'Marks per question must be positive'),
  totalMarks: z.number().min(1, 'Total marks must be at least 1'),
  passPercentage: z.number().min(0).max(100, 'Pass percentage must be between 0-100'),
  negativeMark: z.number().min(0, 'Negative marks cannot be negative'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  examType: z.enum(['No Section, No Timer', 'Section with No Timer', 'Section with Timer']),
})

const CreateExamPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)

  const form = useForm<ExamFormData>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      title: '',
      category: 'Subject Exam',
      duration: 60,
      marksPerQuestion: 1,
      totalMarks: 100,
      passPercentage: 60,
      negativeMark: 0,
      startDate: '',
      endDate: '',
      startTime: '',
      examType: 'No Section, No Timer',
    }
  })

  const onSubmit = async (data: ExamFormData) => {
    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Created exam data:', data)
    
    toast({
      title: "Exam Created Successfully",
      description: `"${data.title}" has been created.`,
    })
    
    setIsCreating(false)
    navigate('/teacher/exams')
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/teacher/exams')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
          <p className="text-gray-600 mt-1">
            Set up a new exam with questions and assign to batches
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Exam Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter exam title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Subject Exam">Subject Exam</SelectItem>
                          <SelectItem value="Quiz">Quiz</SelectItem>
                          <SelectItem value="LMS Exam">LMS Exam</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marks Per Question */}
                <FormField
                  control={form.control}
                  name="marksPerQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marks per Question</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.1"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total Marks */}
                <FormField
                  control={form.control}
                  name="totalMarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Marks</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pass Percentage */}
                <FormField
                  control={form.control}
                  name="passPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pass Percentage</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          min="0"
                          max="100"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Negative Mark */}
                <FormField
                  control={form.control}
                  name="negativeMark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Negative Marks</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          step="0.1"
                          min="0"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Time */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Exam Type */}
                <FormField
                  control={form.control}
                  name="examType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No Section, No Timer">No Section, No Timer</SelectItem>
                          <SelectItem value="Section with No Timer">Section with No Timer</SelectItem>
                          <SelectItem value="Section with Timer">Section with Timer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/teacher/exams')}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 sm:flex-none"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isCreating ? 'Creating...' : 'Create Exam'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateExamPage
