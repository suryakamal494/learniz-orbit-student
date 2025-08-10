import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Plus, X, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ImageUpload } from '@/components/teacher/exams/ImageUpload'
import { useQuery } from '@tanstack/react-query'
import { questionBankService, CreateQuestionData } from '@/services/questionBankService'

const formSchema = z.object({
  questionBankType: z.string().min(1, 'Question bank type is required'),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
  questionText: z.string().min(1, 'Question text is required'),
  explanation: z.string().optional(),
  marks: z.number().min(1, 'Marks must be at least 1'),
  correctAnswer: z.number().min(0, 'Correct answer is required'),
})

type FormData = z.infer<typeof formSchema>

interface Option {
  content: string
  image: File | null
}

const QuestionBankAddPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [numberOfOptions, setNumberOfOptions] = useState(4)
  const [options, setOptions] = useState<Option[]>([
    { content: '', image: null },
    { content: '', image: null },
    { content: '', image: null },
    { content: '', image: null },
  ])
  const [questionImage, setQuestionImage] = useState<File | null>(null)

  const { data: questionBankData = [] } = useQuery({
    queryKey: ['questionBank'],
    queryFn: questionBankService.getQuestions,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marks: 1,
      correctAnswer: 0,
    },
  })

  const watchedValues = watch()

  const handleNumberOfOptionsChange = (value: string) => {
    const num = parseInt(value)
    setNumberOfOptions(num)
    
    if (num > options.length) {
      const newOptions = [...options]
      for (let i = options.length; i < num; i++) {
        newOptions.push({ content: '', image: null })
      }
      setOptions(newOptions)
    } else if (num < options.length) {
      setOptions(options.slice(0, num))
    }
  }

  const handleOptionChange = (index: number, content: string) => {
    const newOptions = [...options]
    newOptions[index].content = content
    setOptions(newOptions)
  }

  const handleOptionImageChange = (index: number, file: File | null) => {
    const newOptions = [...options]
    newOptions[index].image = file
    setOptions(newOptions)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const questionData: CreateQuestionData = {
        ...data,
        numberOfOptions,
        options: options.map(opt => ({
          content: opt.content,
          image: opt.image as File,
        })),
        questionImage: questionImage as File,
      }

      await questionBankService.createQuestion(questionData)
      
      toast({
        title: 'Success',
        description: 'Question created successfully!',
      })
      
      navigate('/teacher/question-bank')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create question. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleCreateAndNew = async (data: FormData) => {
    await onSubmit(data)
    reset()
    setOptions([
      { content: '', image: null },
      { content: '', image: null },
      { content: '', image: null },
      { content: '', image: null },
    ])
    setQuestionImage(null)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/teacher/question-bank')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Add New Question</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Question Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="questionBankType">Question Bank Type *</Label>
                <Select onValueChange={(value) => setValue('questionBankType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                  </SelectContent>
                </Select>
                {errors.questionBankType && (
                  <p className="text-sm text-red-500">{errors.questionBankType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter *</Label>
                <Input
                  id="chapter"
                  {...register('chapter')}
                  placeholder="Enter chapter"
                />
                {errors.chapter && (
                  <p className="text-sm text-red-500">{errors.chapter.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  {...register('topic')}
                  placeholder="Enter topic"
                />
                {errors.topic && (
                  <p className="text-sm text-red-500">{errors.topic.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conceptual">Conceptual</SelectItem>
                    <SelectItem value="analytical">Analytical</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select onValueChange={(value) => setValue('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && (
                  <p className="text-sm text-red-500">{errors.difficulty.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="marks">Marks *</Label>
                <Input
                  id="marks"
                  type="number"
                  min="1"
                  {...register('marks', { valueAsNumber: true })}
                  placeholder="Enter marks"
                />
                {errors.marks && (
                  <p className="text-sm text-red-500">{errors.marks.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionText">Question Text *</Label>
              <Textarea
                id="questionText"
                {...register('questionText')}
                placeholder="Enter your question here..."
                rows={4}
              />
              {errors.questionText && (
                <p className="text-sm text-red-500">{errors.questionText.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Question Image (Optional)</Label>
              <ImageUpload
                onImageSelect={setQuestionImage}
                currentImage={questionImage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="explanation">Explanation (Optional)</Label>
              <Textarea
                id="explanation"
                {...register('explanation')}
                placeholder="Provide explanation for the answer..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Answer Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfOptions">Number of Options</Label>
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
              {options.slice(0, numberOfOptions).map((option, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                  </div>
                  
                  <Input
                    id={`option-${index}`}
                    value={option.content}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                    required
                  />
                  
                  <div>
                    <Label className="text-sm text-gray-600">Option Image (Optional)</Label>
                    <ImageUpload
                      onImageSelect={(file) => handleOptionImageChange(index, file)}
                      currentImage={option.image}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Correct Answer *</Label>
              <RadioGroup
                value={watchedValues.correctAnswer?.toString()}
                onValueChange={(value) => setValue('correctAnswer', parseInt(value))}
                className="flex flex-wrap gap-4"
              >
                {options.slice(0, numberOfOptions).map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`correct-${index}`} />
                    <Label htmlFor={`correct-${index}`}>Option {index + 1}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.correctAnswer && (
                <p className="text-sm text-red-500">{errors.correctAnswer.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/teacher/question-bank')}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit(handleCreateAndNew)}
          >
            Create & New
          </Button>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 font-semibold"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default QuestionBankAddPage
