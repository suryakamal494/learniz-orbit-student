import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ArrowLeft, Plus, Minus, Save, X, Eye } from 'lucide-react'
import type { QuestionFormData } from '@/types/questionBank'
import { useToast } from '@/hooks/use-toast'
import QuestionPreviewModal from '@/components/teacher/exams/QuestionPreviewModal'

const questionSchema = z.object({
  questionBankType: z.string().min(1, 'Question bank type is required'),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  questionContent: z.object({
    text: z.string().min(1, 'Question text is required'),
    html: z.string(),
    hasmath: z.boolean(),
    images: z.array(z.string())
  }),
  type: z.enum(['single', 'multiple', 'fillInBlanks']),
  numberOfOptions: z.number().min(2).max(6),
  options: z.array(z.object({
    text: z.string().min(1, 'Option text is required'),
    html: z.string(),
    hasmath: z.boolean(),
    images: z.array(z.string())
  })).min(2),
  correctAnswer: z.number().min(0),
  explanationContent: z.object({
    text: z.string().min(1, 'Explanation is required'),
    html: z.string(),
    hasmath: z.boolean(),
    images: z.array(z.string())
  }),
  hint: z.string(),
  marks: z.number().min(1, 'Marks must be at least 1')
})

const QuestionBankAddPage: React.FC = () => {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const { toast } = useToast()
  const [numberOfOptions, setNumberOfOptions] = useState(4)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionBankType: '',
      chapter: '',
      topic: '',
      category: '',
      difficulty: 'easy',
      questionContent: {
        text: '',
        html: '',
        hasmath: false,
        images: []
      },
      type: 'single',
      numberOfOptions: 4,
      options: Array(4).fill(null).map(() => ({
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

  const updateOptionsCount = (count: number) => {
    setNumberOfOptions(count)
    const currentOptions = form.getValues('options')
    const newOptions = Array(count).fill(null).map((_, index) => 
      currentOptions[index] || {
        text: '',
        html: '',
        hasmath: false,
        images: []
      }
    )
    form.setValue('options', newOptions)
    form.setValue('numberOfOptions', count)
  }

  const onSubmit = (data: QuestionFormData) => {
    console.log('Creating question:', data)
    
    toast({
      title: "Success",
      description: "Question created successfully",
    })
    
    navigate(`/teacher/exams/question-bank/view/${subjectId}`)
  }

  const handleCancel = () => {
    navigate(`/teacher/exams/question-bank/view/${subjectId}`)
  }

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Question Bank
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Question</h1>
          <p className="text-gray-600 mt-1">
            Create a new question for {subjectId}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Question Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="questionBankType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Bank Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="practice">Practice Questions</SelectItem>
                          <SelectItem value="exam">Exam Questions</SelectItem>
                          <SelectItem value="mock">Mock Test Questions</SelectItem>
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
                  name="chapter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chapter name" {...field} />
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
                        <Input placeholder="Enter topic name" {...field} />
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
                  name="marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marks *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Question Content */}
          <Card>
            <CardHeader>
              <CardTitle>Question Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="questionContent.text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question *</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter your question here..."
                        minHeight="150px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="single" />
                          <label htmlFor="single">Single Correct Answer</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple" id="multiple" />
                          <label htmlFor="multiple">Multiple Correct Answers</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fillInBlanks" id="fillInBlanks" />
                          <label htmlFor="fillInBlanks">Fill in the Blanks</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Answer Options</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateOptionsCount(Math.max(2, numberOfOptions - 1))}
                    disabled={numberOfOptions <= 2}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{numberOfOptions} options</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateOptionsCount(Math.min(6, numberOfOptions + 1))}
                    disabled={numberOfOptions >= 6}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: numberOfOptions }, (_, index) => (
                <div key={index} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`options.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option {index + 1} *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={`Enter option ${index + 1}`} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correct Answer *</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select correct option" />
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

          {/* Explanation */}
          <Card>
            <CardHeader>
              <CardTitle>Explanation & Hint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="explanationContent.text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation *</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Explain why this is the correct answer..."
                        minHeight="120px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hint (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Provide a helpful hint..." {...field} />
                    </FormControl>
                    <FormDescription>
                      A hint to help students understand the question better
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-6 border-t">
            <Button type="submit" disabled={form.formState.isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Create Question
            </Button>
            <Button type="button" variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview Question
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </Form>

      {/* Preview Modal */}
      <QuestionPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        questionData={form.getValues()}
      />
    </div>
  )
}

export default QuestionBankAddPage
