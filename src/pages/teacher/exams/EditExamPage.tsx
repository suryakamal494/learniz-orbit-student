import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, X, Calculator, Clock } from 'lucide-react'
import type { ExamFormData } from '@/types/exam'
import { mockInstructions } from '@/data/mockInstructions'
import { mockExamsData } from '@/data/mockExamsData'
import { useToast } from '@/hooks/use-toast'

const examSchema = z.object({
  title: z.string().min(1, 'Exam title is required').max(200, 'Title must be less than 200 characters'),
  category: z.enum(['Subject Exam', 'Quiz', 'LMS Exam'], {
    required_error: 'Please select a category'
  }),
  duration: z.number().min(1, 'Duration must be at least 1 minute').max(600, 'Duration cannot exceed 600 minutes'),
  marksPerQuestion: z.number().min(0.1, 'Marks per question must be greater than 0').max(100, 'Marks per question cannot exceed 100'),
  totalMarks: z.number().min(1, 'Total marks must be at least 1'),
  passPercentage: z.number().min(0, 'Pass percentage cannot be negative').max(100, 'Pass percentage cannot exceed 100'),
  negativeMark: z.number().min(0, 'Negative mark cannot be negative').max(10, 'Negative mark cannot exceed 10'),
  instructionId: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  examType: z.enum(['No Section, No Timer', 'Section with No Timer', 'Section with Timer'], {
    required_error: 'Please select an exam type'
  })
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"]
})

const EditExamPage: React.FC = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const { toast } = useToast()
  const [questionCount, setQuestionCount] = useState(10)
  
  const exam = mockExamsData.find(e => e.id === examId)

  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: exam?.title || '',
      category: exam?.category || 'Subject Exam',
      duration: exam?.duration || 60,
      marksPerQuestion: exam?.marksPerQuestion || 1,
      totalMarks: exam?.totalMarks || 10,
      passPercentage: exam?.passPercentage || 60,
      negativeMark: exam?.negativeMark || 0,
      instructionId: exam?.instructionId || 'none',
      startDate: exam?.startDate || format(new Date(), 'yyyy-MM-dd'),
      endDate: exam?.endDate || format(new Date(), 'yyyy-MM-dd'),
      startTime: exam?.startTime || '09:00',
      examType: exam?.examType || 'No Section, No Timer'
    }
  })

  const marksPerQuestion = form.watch('marksPerQuestion')

  useEffect(() => {
    if (exam) {
      setQuestionCount(exam.questionCount || 10)
    }
  }, [exam])

  useEffect(() => {
    const totalMarks = marksPerQuestion * questionCount
    form.setValue('totalMarks', totalMarks)
  }, [marksPerQuestion, questionCount, form])

  const onSubmit = (data: ExamFormData) => {
    console.log('Updating exam:', data)
    
    toast({
      title: "Success",
      description: "Exam updated successfully",
    })
    
    navigate('/teacher/exams')
  }

  const handleCancel = () => {
    navigate('/teacher/exams')
  }

  if (!exam) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Exam not found</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/teacher/exams')}
            className="mt-4"
          >
            Back to Exams
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/teacher/exams')} className="shrink-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Edit Exam</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Update exam details and settings
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium">Exam Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter Exam Title" 
                          {...field}
                          className="h-12 text-base"
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
                      <FormLabel className="text-sm font-medium">Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select category" />
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

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Duration (minutes) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            type="number" 
                            placeholder="60"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            className="h-12 pl-10 text-base"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Marking & Grading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Marking & Grading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="marksPerQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Marks Per Question *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalMarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Total Marks</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            {...field}
                            readOnly
                            className="h-12 pl-10 text-base bg-gray-50 text-gray-600"
                          />
                        </div>
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">Auto-calculated: {questionCount} questions × {marksPerQuestion} marks</p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Pass Percentage *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="60"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="negativeMark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Negative Mark</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">Marks deducted per wrong answer</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Instructions</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select instructions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No specific instructions</SelectItem>
                          {mockInstructions.map(instruction => (
                            <SelectItem key={instruction.id} value={instruction.id}>
                              {instruction.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule & Timing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium">Start Date *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium">End Date *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Start Time *</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="examType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Exam Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select exam type" />
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
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-none"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {form.formState.isSubmitting ? 'Updating...' : 'Update Exam'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
              
              {!form.formState.isValid && form.formState.isSubmitted && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm font-medium">Please fill in all required fields correctly</p>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default EditExamPage
