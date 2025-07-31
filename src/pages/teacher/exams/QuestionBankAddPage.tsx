
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { mockFilterOptions, mockQuestionBankSubjects } from '@/data/mockQuestionBank'
import { ArrowLeft, Upload, Plus, Minus } from 'lucide-react'
import type { QuestionFormData } from '@/types/questionBank'

const formSchema = z.object({
  questionBankType: z.string().min(1, "Question Bank Type is required"),
  chapter: z.string().min(1, "Chapter is required"),
  topic: z.string().min(1, "Topic is required"),
  category: z.string().min(1, "Category is required"),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  question: z.string().min(10, "Question must be at least 10 characters"),
  type: z.enum(['single', 'multiple', 'fillInBlanks']),
  numberOfOptions: z.number().min(2).max(6),
  options: z.array(z.string()).min(2),
  correctAnswer: z.number().min(0),
  explanation: z.string().min(1, "Explanation is required"),
  hint: z.string().optional(),
  marks: z.number().min(1).max(10)
})

export default function QuestionBankAddPage() {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const [numberOfOptions, setNumberOfOptions] = useState(4)
  const [selectedChapter, setSelectedChapter] = useState('')
  const [selectedQuestionBankType, setSelectedQuestionBankType] = useState('')

  const subject = mockQuestionBankSubjects.find(s => s.id === subjectId)

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionBankType: '',
      chapter: '',
      topic: '',
      category: '',
      difficulty: 'medium',
      question: '',
      type: 'single',
      numberOfOptions: 4,
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      hint: '',
      marks: 1
    }
  })

  const onSubmit = (data: QuestionFormData) => {
    console.log('Question data:', data)
    // Handle form submission
    navigate(`/teacher/exams/question-bank/view/${subjectId}`)
  }

  const handleNumberOfOptionsChange = (value: string) => {
    const num = parseInt(value)
    setNumberOfOptions(num)
    const currentOptions = form.getValues('options')
    const newOptions = [...currentOptions]
    
    if (num > currentOptions.length) {
      // Add empty options
      for (let i = currentOptions.length; i < num; i++) {
        newOptions.push('')
      }
    } else {
      // Remove excess options
      newOptions.splice(num)
    }
    
    form.setValue('options', newOptions)
    form.setValue('numberOfOptions', num)
  }

  const availableChapters = selectedQuestionBankType 
    ? mockFilterOptions.chapters[selectedQuestionBankType as keyof typeof mockFilterOptions.chapters] || []
    : []

  const availableTopics = selectedChapter 
    ? mockFilterOptions.topics[selectedChapter as keyof typeof mockFilterOptions.topics] || []
    : []

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(`/teacher/exams/question-bank/view/${subjectId}`)}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Add Question</h1>
          <p className="text-muted-foreground">
            {subject ? `${subject.subject} • ${subject.code}` : 'Create a new question'}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Metadata Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="questionBankType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Bank Type *</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedQuestionBankType(value)
                          setSelectedChapter('')
                          form.setValue('chapter', '')
                          form.setValue('topic', '')
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockFilterOptions.questionBankType.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
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
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedChapter(value)
                          form.setValue('topic', '')
                        }}
                        disabled={!selectedQuestionBankType}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select chapter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableChapters.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
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
                      <Select onValueChange={field.onChange} disabled={!selectedChapter}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTopics.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Category *</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockFilterOptions.categories.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
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
                      <FormLabel>Difficulty Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="medium">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockFilterOptions.difficulties.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
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
                          min={1} 
                          max={10} 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Question Input */}
          <Card>
            <CardHeader>
              <CardTitle>Question Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question *</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field}
                        placeholder="Enter your question here. You can use formatting, math equations, and images..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="single">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single Answer</SelectItem>
                          <SelectItem value="multiple">Multiple Answer</SelectItem>
                          <SelectItem value="fillInBlanks">Fill in the Blanks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Upload Image (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept="image/*" className="hidden" id="image-upload" />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
                    >
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Label>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="hint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hint (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field}
                        placeholder="Provide a helpful hint for students..."
                        className="min-h-[80px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 3: Options */}
          <Card>
            <CardHeader>
              <CardTitle>Answer Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Label>Number of Options:</Label>
                <Select 
                  value={numberOfOptions.toString()} 
                  onValueChange={handleNumberOfOptionsChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {Array.from({ length: numberOfOptions }, (_, index) => (
                  <div key={index} className="space-y-2">
                    <Label>Option {index + 1} *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <Textarea 
                          placeholder={`Enter option ${index + 1}...`}
                          className="min-h-[60px]"
                          {...form.register(`options.${index}`)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Image (Optional)</Label>
                        <Input type="file" accept="image/*" className="text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correct Answer *</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                      <FormControl>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: numberOfOptions }, (_, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            Option {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 4: Explanation */}
          <Card>
            <CardHeader>
              <CardTitle>Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation *</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field}
                        placeholder="Provide a detailed explanation of the correct answer..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Final Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button type="button" variant="outline">
                  Preview Question
                </Button>
                <Button type="submit">
                  Create Question
                </Button>
                <Button type="button" variant="secondary">
                  Create & New
                </Button>
                <Button type="button" variant="secondary">
                  Create & New with Meta
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
