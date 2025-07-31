
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Save, X, Calculator } from 'lucide-react'
import { mockQuestions } from '@/data/mockQuestionBank'
import { mockExamsData } from '@/data/mockExamsData'
import { useToast } from '@/hooks/use-toast'
import type { Question } from '@/types/questionBank'
import { QuestionFiltersPanel } from '@/components/teacher/exams/QuestionFiltersPanel'
import { QuestionBrowserPanel } from '@/components/teacher/exams/QuestionBrowserPanel'
import { SelectedQuestionsPanel } from '@/components/teacher/exams/SelectedQuestionsPanel'

export interface QuestionFilters {
  subject: string
  chapter: string
  topic: string
  questionBankType: string
  category: string
  difficulty: string
  questionType: string
  search: string
}

interface SelectedQuestion extends Question {
  addedAt: Date
}

const UpdateQuestionsPage: React.FC = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [filters, setFilters] = useState<QuestionFilters>({
    subject: '',
    chapter: '',
    topic: '',
    questionBankType: '',
    category: '',
    difficulty: '',
    questionType: '',
    search: ''
  })

  const [selectedQuestions, setSelectedQuestions] = useState<SelectedQuestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const exam = mockExamsData.find(e => e.id === examId)

  // Filter questions based on current filters
  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter(question => {
      // Check if question is already selected
      if (selectedQuestions.some(sq => sq.id === question.id)) return false

      // Apply filters
      if (filters.chapter && question.chapter !== filters.chapter) return false
      if (filters.topic && question.topic !== filters.topic) return false
      if (filters.category && question.category !== filters.category) return false
      if (filters.difficulty && question.difficulty !== filters.difficulty) return false
      if (filters.questionType && question.type !== filters.questionType) return false
      if (filters.search && !question.questionContent.text.toLowerCase().includes(filters.search.toLowerCase())) return false

      return true
    })
  }, [filters, selectedQuestions])

  // Calculate total marks
  const totalMarks = useMemo(() => {
    return selectedQuestions.reduce((sum, question) => sum + question.marks, 0)
  }, [selectedQuestions])

  const handleAddQuestion = (question: Question) => {
    const selectedQuestion: SelectedQuestion = {
      ...question,
      addedAt: new Date()
    }
    setSelectedQuestions(prev => [...prev, selectedQuestion])
    
    toast({
      title: "Question Added",
      description: `Added "${question.questionContent.text.substring(0, 50)}..." to exam`,
    })
  }

  const handleRemoveQuestion = (questionId: string) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId))
    
    toast({
      title: "Question Removed",
      description: "Question removed from exam",
    })
  }

  const handleUpdateExam = async () => {
    if (selectedQuestions.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please add at least one question to the exam",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Exam Updated Successfully",
        description: `${selectedQuestions.length} questions added to ${exam?.title}`,
      })
      
      navigate('/teacher/exams')
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update exam questions. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearAllFilters = () => {
    setFilters({
      subject: '',
      chapter: '',
      topic: '',
      questionBankType: '',
      category: '',
      difficulty: '',
      questionType: '',
      search: ''
    })
  }

  if (!exam) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Exam Not Found</h1>
          <p className="text-gray-600 mt-2">The exam you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/teacher/exams')} className="mt-4">
            Back to Exams
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/teacher/exams')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Exams
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Update Questions</h1>
              <p className="text-gray-600">{exam.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calculator className="h-4 w-4" />
              <span>Total Marks: </span>
              <Badge variant="outline" className="font-semibold">
                {totalMarks}
              </Badge>
            </div>
            <Button 
              onClick={handleUpdateExam}
              disabled={selectedQuestions.length === 0 || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Updating...' : 'Update Exam'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Filters */}
        <div className="w-80 bg-white border-r flex-shrink-0">
          <QuestionFiltersPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearAllFilters}
            questionCount={filteredQuestions.length}
          />
        </div>

        {/* Center Panel - Question Browser */}
        <div className="flex-1 flex flex-col">
          <QuestionBrowserPanel
            questions={filteredQuestions}
            onAddQuestion={handleAddQuestion}
            filters={filters}
          />
        </div>

        {/* Right Panel - Selected Questions */}
        <div className="w-96 bg-white border-l flex-shrink-0">
          <SelectedQuestionsPanel
            selectedQuestions={selectedQuestions}
            totalMarks={totalMarks}
            onRemoveQuestion={handleRemoveQuestion}
            onUpdateExam={handleUpdateExam}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateQuestionsPage
