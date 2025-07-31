
import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { QuestionFiltersPanel } from '@/components/teacher/exams/QuestionFiltersPanel'
import { QuestionListPanel } from '@/components/teacher/exams/QuestionListPanel'
import { SelectedQuestionsPanel } from '@/components/teacher/exams/SelectedQuestionsPanel'
import QuestionPreviewModal from '@/components/teacher/exams/QuestionPreviewModal'
import { mockQuestions } from '@/data/mockQuestionBank'
import { mockExamsData } from '@/data/mockExamsData'
import type { Question, QuestionBankFilters } from '@/types/questionBank'
import type { QuestionFormData } from '@/types/questionBank'
import { toast } from 'sonner'

export default function UpdateQuestionsPage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  
  // Find exam data
  const exam = mockExamsData.find(e => e.id === examId)
  
  // State management
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [filters, setFilters] = useState<QuestionBankFilters>({
    questionBankType: '',
    chapter: '',
    topic: '',
    category: '',
    difficulty: 'easy'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [previewQuestion, setPreviewQuestion] = useState<QuestionFormData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Filter questions based on current filters
  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter(question => {
      const matchesSearch = !searchTerm || 
        question.questionContent.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.topic.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesChapter = !filters.chapter || question.chapter === filters.chapter
      const matchesCategory = !filters.category || question.category === filters.category
      const matchesDifficulty = !filters.difficulty || question.difficulty === filters.difficulty
      const matchesTopic = !filters.topic || question.topic === filters.topic
      
      return matchesSearch && matchesChapter && matchesCategory && matchesDifficulty && matchesTopic
    })
  }, [filters, searchTerm])

  // Calculate total marks
  const totalMarks = useMemo(() => {
    return selectedQuestions.reduce((total, question) => total + question.marks, 0)
  }, [selectedQuestions])

  // Handle adding question to selected list
  const handleAddQuestion = (question: Question) => {
    if (selectedQuestions.find(q => q.id === question.id)) {
      toast.error('Question already added to the exam')
      return
    }
    
    setSelectedQuestions(prev => [...prev, question])
    toast.success('Question added to exam')
  }

  // Handle removing question from selected list
  const handleRemoveQuestion = (questionId: string) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId))
    toast.success('Question removed from exam')
  }

  // Handle preview question
  const handlePreviewQuestion = (question: Question) => {
    // Convert Question to QuestionFormData for preview
    const previewData: QuestionFormData = {
      questionBankType: 'neet', // Default value
      chapter: question.chapter,
      topic: question.topic,
      category: question.category,
      difficulty: question.difficulty,
      questionContent: question.questionContent,
      type: question.type,
      options: question.options,
      correctAnswer: Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer,
      explanationContent: question.explanationContent,
      hint: question.hint || '',
      marks: question.marks,
      numberOfOptions: question.options.length
    }
    
    setPreviewQuestion(previewData)
    setIsPreviewOpen(true)
  }

  // Handle updating exam with selected questions
  const handleUpdateExam = () => {
    if (selectedQuestions.length === 0) {
      toast.error('Please select at least one question')
      return
    }
    
    // In a real app, this would make an API call
    console.log('Updating exam with questions:', selectedQuestions.map(q => q.id))
    toast.success(`Exam updated with ${selectedQuestions.length} questions (${totalMarks} marks)`)
    
    // Navigate back to exams list
    navigate('/teacher/exams')
  }

  if (!exam) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Exam not found</h1>
          <Button onClick={() => navigate('/teacher/exams')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/exams')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Exams
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Update Questions</h1>
            <p className="text-gray-600">{exam.title}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <Badge variant="outline">{exam.category}</Badge>
          <span>Duration: {exam.duration} minutes</span>
          <span>Current Questions: {exam.questionCount}</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Filters & Question List */}
        <div className="lg:col-span-8 space-y-6">
          <QuestionFiltersPanel
            filters={filters}
            onFiltersChange={setFilters}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <QuestionListPanel
            questions={filteredQuestions}
            selectedQuestionIds={selectedQuestions.map(q => q.id)}
            onAddQuestion={handleAddQuestion}
            onPreviewQuestion={handlePreviewQuestion}
          />
        </div>

        {/* Right Column - Selected Questions */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <SelectedQuestionsPanel
              selectedQuestions={selectedQuestions}
              totalMarks={totalMarks}
              onRemoveQuestion={handleRemoveQuestion}
              onUpdateExam={handleUpdateExam}
              onPreviewQuestion={handlePreviewQuestion}
            />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewQuestion && (
        <QuestionPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          questionData={previewQuestion}
        />
      )}
    </div>
  )
}
