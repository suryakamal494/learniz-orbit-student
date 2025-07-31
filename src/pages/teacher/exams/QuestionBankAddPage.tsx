
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { RichContentDisplay } from '@/components/ui/rich-content-display'
import { mockFilterOptions, mockQuestionBankSubjects } from '@/data/mockQuestionBank'
import { ArrowLeft, Upload, Eye, EyeOff } from 'lucide-react'
import type { QuestionFormData } from '@/types/questionBank'

const formSchema = z.object({
  questionBankType: z.string().min(1, "Question Bank Type is required"),
  chapter: z.string().min(1, "Chapter is required"),
  topic: z.string().min(1, "Topic is required"),
  category: z.string().min(1, "Category is required"),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  questionContent: z.object({
    text: z.string().min(10, "Question must be at least 10 characters"),
    html: z.string().min(10, "Question must be at least 10 characters"),
    hasmath: z.boolean(),
    images: z.array(z.string())
  }),
  type: z.enum(['single', 'multiple', 'fillInBlanks']),
  numberOfOptions: z.number().min(2).max(6),
  options: z.array(z.object({
    text: z.string().min(1, "Option cannot be empty"),
    html: z.string().min(1, "Option cannot be empty"),
    hasmath: z.boolean(),
    images: z.array(z.string())
  })).min(2),
  correctAnswer: z.number().min(0),
  explanationContent: z.object({
    text: z.string().min(1, "Explanation is required"),
    html: z.string().min(1, "Explanation is required"),
    hasmath: z.boolean(),
    images: z.array(z.string())
  }),
  hint: z.string().optional(),
  marks: z.number().min(1).max(10)
})

export default function QuestionBankAddPage() {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const [numberOfOptions, setNumberOfOptions] = useState(4)
  const [selectedChapter, setSelectedChapter] = useState('')
  const [selectedQuestionBankType, setSelectedQuestionBankType] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const subject = mockQuestionBankSubjects.find(s => s.id === subjectId)

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionBankType: '',
      chapter: '',
      topic: '',
      category: '',
      difficulty: 'medium',
      questionContent: {
        text: '',
        html: '',
        hasmath: false,
        images: []
      },
      type: 'single',
      numberOfOptions: 4,
      options: Array.from({ length: 4 }, () => ({
        text: '',
        html: '',
        hasmath: false,
        images: []
      })),
      correctAnswer: 0,
      explanationContent: {
        text: '',
        html: '',
        hasmath: false,
        images: []
      },
      hint: '',
      marks: 1
    }
  })

  const watchedValues = form.watch()

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
      for (let i = currentOptions.length; i < num; i++) {
        newOptions.push({
          text: '',
          html: '',
          hasmath: false,
          images: []
        })
      }
    } else {
      newOptions.splice(num)
    }
    
    form.setValue('options', newOptions)
    form.setValue('numberOfOptions', num)
  }

  const handleQuestionContentChange = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '')
    const hasmath = html.includes('ql-formula') || html.includes('katex')
    form.setValue('questionContent', {
      text,
      html,
      hasmath,
      images: []
    })
  }

  const handleOptionChange = (index: number, html: string) => {
    const text = html.replace(/<[^>]*>/g, '')
    const hasmath = html.includes('ql-formula') || html.includes('katex')
    const currentOptions = form.getValues('options')
    const newOptions = [...currentOptions]
    newOptions[index] = {
      text,
      html,
      hasmath,
      images: []
    }
    form.setValue('options', newOptions)
  }

  const handleExplanationChange = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '')
    const hasmath = html.includes('ql-formula') || html.includes('katex')
    form.setValue('explanationContent', {
      text,
      html,
      hasmath,
      images: []
    })
  }

  const availableChapters = selectedQuestionBankType 
    ? mockFilterOptions.chapters[selectedQuestionBankType as keyof typeof mockFilterOptions.chapters] || []
    : []

  const availableTopics = selectedChapter 
    ? mockFilterOptions.topics[selectedChapter as keyof typeof mockFilterOptions.topics] || []
    : []

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
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
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2"
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Section 1: Metadata Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Question Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

              {/* Section 2: Question Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Question Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Question *</Label>
                    <RichTextEditor
                      value={watchedValues.questionContent?.html || ''}
                      onChange={handleQuestionContentChange}
                      placeholder="Enter your question here. You can use math equations, formatting, and images..."
                      minHeight="150px"
                    />
                  </div>

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
                        <Input type="file" accept="image/*" className="hidden" id="question-image-upload" />
                        <Label
                          htmlFor="question-image-upload"
                          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
                        >
                          <Upload className="h-4 w-4" />
                          Choose File
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Hint (Optional)</Label>
                    <Input
                      placeholder="Provide a helpful hint for students..."
                      value={watchedValues.hint || ''}
                      onChange={(e) => form.setValue('hint', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Answer Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        <RichTextEditor
                          value={watchedValues.options?.[index]?.html || ''}
                          onChange={(html) => handleOptionChange(index, html)}
                          placeholder={`Enter option ${index + 1}...`}
                          minHeight="80px"
                        />
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
                  <Label className="text-sm font-medium mb-2 block">Explanation *</Label>
                  <RichTextEditor
                    value={watchedValues.explanationContent?.html || ''}
                    onChange={handleExplanationChange}
                    placeholder="Provide a detailed explanation of the correct answer..."
                    minHeight="120px"
                  />
                </CardContent>
              </Card>

              {/* Final Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button type="submit">
                      Create Question
                    </Button>
                    <Button type="button" variant="secondary">
                      Create & New
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>

        {/* Right Column - Preview */}
        {showPreview && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Question Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Question:</h3>
                  <RichContentDisplay 
                    content={watchedValues.questionContent?.html || '<p>Enter your question...</p>'} 
                    className="text-blue-800"
                  />
                </div>

                {/* Options Preview */}
                <div className="space-y-2">
                  <h4 className="font-medium">Options:</h4>
                  {watchedValues.options?.slice(0, numberOfOptions).map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        watchedValues.correctAnswer === index
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`font-medium text-sm ${
                          watchedValues.correctAnswer === index ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <div className="flex-1">
                          <RichContentDisplay 
                            content={option.html || '<p>Enter option...</p>'} 
                            className={watchedValues.correctAnswer === index ? 'text-green-800' : 'text-gray-700'}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explanation Preview */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-900 mb-2">Explanation:</h4>
                  <RichContentDisplay 
                    content={watchedValues.explanationContent?.html || '<p>Enter explanation...</p>'} 
                    className="text-amber-800"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
