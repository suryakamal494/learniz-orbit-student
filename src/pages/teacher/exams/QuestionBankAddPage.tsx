
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ImageUpload } from '@/components/teacher/exams/ImageUpload'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useQuery } from '@tanstack/react-query'
import { questionBankService, type CreateQuestionData } from '@/services/questionBankService'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  questionBankType: z.string().min(1, 'Question Bank Type is required'),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  category: z.string().min(1, 'Question Category is required'),
  difficulty: z.string().min(1, 'Difficulty Level is required'),
  questionContent: z.string().min(1, 'Question is required'),
  questionType: z.string().min(1, 'Question Type is required'),
  hint: z.string().optional(),
  marks: z.number().min(1, 'Marks must be at least 1'),
  explanation: z.string().min(1, 'Explanation is required'),
  numberOfOptions: z.number().min(1).max(8),
  options: z.array(z.string().min(1, 'Option cannot be empty')),
  correctAnswer: z.number().min(1, 'Please select the correct answer')
})

type FormData = z.infer<typeof formSchema>

export default function QuestionBankAddPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [questionImage, setQuestionImage] = useState<File | null>(null)
  const [optionImages, setOptionImages] = useState<{ [key: number]: File | null }>({})

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionBankType: '',
      chapter: '',
      topic: '',
      category: '',
      difficulty: '',
      questionContent: '',
      questionType: '',
      hint: '',
      marks: 1,
      explanation: '',
      numberOfOptions: 4,
      options: ['', '', '', ''],
      correctAnswer: 1
    }
  })

  const selectedQuestionBankType = form.watch('questionBankType')
  const selectedChapter = form.watch('chapter')
  const numberOfOptions = form.watch('numberOfOptions')

  // Fetch data with React Query
  const { data: questionBankTypes } = useQuery({
    queryKey: ['questionBankTypes'],
    queryFn: questionBankService.getQuestionBankTypes
  })

  const { data: chapters } = useQuery({
    queryKey: ['chapters', selectedQuestionBankType],
    queryFn: () => questionBankService.getChapters(selectedQuestionBankType),
    enabled: !!selectedQuestionBankType
  })

  const { data: topics } = useQuery({
    queryKey: ['topics', selectedChapter],
    queryFn: () => questionBankService.getTopics(selectedChapter),
    enabled: !!selectedChapter
  })

  const { data: questionCategories } = useQuery({
    queryKey: ['questionCategories'],
    queryFn: questionBankService.getQuestionCategories
  })

  const { data: difficultyLevels } = useQuery({
    queryKey: ['difficultyLevels'],
    queryFn: questionBankService.getDifficultyLevels
  })

  const { data: questionTypes } = useQuery({
    queryKey: ['questionTypes'],
    queryFn: questionBankService.getQuestionTypes
  })

  // Update options array when numberOfOptions changes
  React.useEffect(() => {
    const currentOptions = form.getValues('options')
    const newOptions = Array(numberOfOptions).fill('').map((_, index) => 
      currentOptions[index] || ''
    )
    form.setValue('options', newOptions)
  }, [numberOfOptions, form])

  // Reset dependent fields when parent field changes
  React.useEffect(() => {
    form.setValue('chapter', '')
    form.setValue('topic', '')
  }, [selectedQuestionBankType, form])

  React.useEffect(() => {
    form.setValue('topic', '')
  }, [selectedChapter, form])

  const onSubmit = async (data: FormData, createNew = false) => {
    setIsSubmitting(true)
    try {
      const questionData: CreateQuestionData = {
        ...data,
        numberOfOptions,
        options: data.options.slice(0, numberOfOptions).map((content, index) => ({
          content,
          image: optionImages[index] || undefined
        })),
        questionImage: questionImage || undefined
      }

      await questionBankService.createQuestion(questionData)
      
      toast({
        title: "Success",
        description: "Question created successfully"
      })

      if (createNew) {
        // Reset form for new question
        form.reset()
        setQuestionImage(null)
        setOptionImages({})
      } else {
        navigate('/teacher/question-bank')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create question. Please try again.",
        variant: "destructive"
      })
      console.error('Error creating question:', error)
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

      <Form {...form}>
        <form className="space-y-6">
          {/* Section 1: Metadata Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Question Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="questionBankType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Bank Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select question bank type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {questionBankTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
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
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedQuestionBankType}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select chapter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {chapters?.map((chapter) => (
                            <SelectItem key={chapter.id} value={chapter.id}>
                              {chapter.name}
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
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedChapter}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {topics?.map((topic) => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {questionCategories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {difficultyLevels?.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
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

          {/* Section 2: Question Input */}
          <Card>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="questionContent"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {questionTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.value}>
                              {type.name}
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
                          placeholder="Enter marks"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <ImageUpload
                label="Question Image (Optional)"
                onImageSelect={setQuestionImage}
                onImageRemove={() => setQuestionImage(null)}
                selectedImage={questionImage}
              />

              <FormField
                control={form.control}
                name="hint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hint (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a hint for students" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 3: Explanation */}
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
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter explanation for the answer... You can include mathematical formulas and formatting."
                        minHeight="120px"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 4: Options */}
          <Card>
            <CardHeader>
              <CardTitle>Answer Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="numberOfOptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Options</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger className="w-40 bg-background">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Option{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                {Array.from({ length: numberOfOptions }, (_, index) => (
                  <div key={index} className="space-y-3">
                    <Label>Option {index + 1} *</Label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`options.${index}` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RichTextEditor
                                value={field.value || ''}
                                onChange={field.onChange}
                                placeholder={`Enter option ${index + 1} content...`}
                                minHeight="100px"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <ImageUpload
                        label={`Option ${index + 1} Image (Optional)`}
                        onImageSelect={(file) => setOptionImages(prev => ({ ...prev, [index]: file }))}
                        onImageRemove={() => setOptionImages(prev => ({ ...prev, [index]: null }))}
                        selectedImage={optionImages[index]}
                        className="lg:mt-0"
                      />
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
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger className="w-40 bg-background">
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        {Array.from({ length: numberOfOptions }, (_, index) => (
                          <SelectItem key={index + 1} value={(index + 1).toString()}>
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

          {/* Final Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="button"
                  onClick={form.handleSubmit((data) => onSubmit(data, false))}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
                
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={form.handleSubmit((data) => onSubmit(data, true))}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create & New
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
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
