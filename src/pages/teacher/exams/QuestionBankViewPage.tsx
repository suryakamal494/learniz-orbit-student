
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TeacherDataWrapper } from '@/components/teacher/ui/TeacherDataWrapper'
import { mockQuestions, mockQuestionBankSubjects } from '@/data/mockQuestionBank'
import { ArrowLeft, Search, Filter, Edit, Trash2, Plus } from 'lucide-react'
import type { Question } from '@/types/questionBank'

export default function QuestionBankViewPage() {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [loading, setLoading] = useState(false)

  const subject = mockQuestionBankSubjects.find(s => s.id === subjectId)
  
  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/teacher/exams/question-bank')}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            {subject?.subject || 'Questions'}
          </h1>
          <p className="text-muted-foreground">
            {subject?.institute} • {subject?.code}
          </p>
        </div>
        <Button 
          onClick={() => navigate(`/teacher/exams/question-bank/add/${subjectId}`)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions, chapters, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardHeader>
          <CardTitle>Questions ({filteredQuestions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <TeacherDataWrapper
            data={filteredQuestions}
            loading={loading}
            emptyTitle="No questions found"
            emptyDescription="No questions match your search criteria or filters."
            emptyIcon={<div className="text-4xl">❓</div>}
          >
            {(questions) => (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Question Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Q{index + 1}</span>
                              <span>•</span>
                              <span>{question.chapter}</span>
                              <span>•</span>
                              <span>{question.topic}</span>
                            </div>
                            <h3 className="font-medium text-lg leading-tight">
                              {question.question}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {question.marks} marks
                            </Badge>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border text-sm ${
                                question.correctAnswer === optionIndex
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <span className="font-medium mr-2">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              {option}
                            </div>
                          ))}
                        </div>

                        {/* Explanation */}
                        {question.explanation && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                            <p className="text-sm text-blue-700">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TeacherDataWrapper>
        </CardContent>
      </Card>
    </div>
  )
}
