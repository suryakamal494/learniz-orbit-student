
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TeacherDataWrapper } from '@/components/teacher/ui/TeacherDataWrapper'
import { mockQuestionBankSubjects } from '@/data/mockQuestionBank'
import { MoreVertical, Eye, Plus, Search, Filter } from 'lucide-react'
import type { QuestionBankSubject } from '@/types/questionBank'

export default function QuestionBankMainPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleViewQuestions = (subjectId: string) => {
    navigate(`/teacher/exams/question-bank/view/${subjectId}`)
  }

  const handleAddQuestion = (subjectId: string) => {
    navigate(`/teacher/exams/question-bank/add/${subjectId}`)
  }

  const filteredSubjects = mockQuestionBankSubjects.filter(subject =>
    subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.institute.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Question Bank</h1>
          <p className="text-muted-foreground">Manage questions for all subjects</p>
        </div>
        <Button 
          onClick={() => navigate('/teacher/exams/question-bank/add/new')}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Question
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects, codes, or institutes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Question Bank Table */}
      <Card>
        <CardHeader>
          <CardTitle>Question Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <TeacherDataWrapper
            data={filteredSubjects}
            loading={loading}
            emptyTitle="No subjects found"
            emptyDescription="No question bank subjects match your search criteria."
            emptyIcon={<div className="text-4xl">📚</div>}
          >
            {(subjects) => (
              <div className="space-y-4">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Institute</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.institute}</TableCell>
                          <TableCell>{subject.subject}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{subject.code}</Badge>
                          </TableCell>
                          <TableCell>{subject.questionCount}</TableCell>
                          <TableCell>{new Date(subject.lastUpdated).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewQuestions(subject.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Questions
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAddQuestion(subject.id)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Question
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {subjects.map((subject) => (
                    <Card key={subject.id}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg">{subject.subject}</h3>
                              <p className="text-sm text-muted-foreground">{subject.institute}</p>
                              <Badge variant="secondary" className="text-xs">{subject.code}</Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewQuestions(subject.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Questions
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAddQuestion(subject.id)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Question
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm text-muted-foreground">
                              {subject.questionCount} questions
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Updated {new Date(subject.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TeacherDataWrapper>
        </CardContent>
      </Card>
    </div>
  )
}
