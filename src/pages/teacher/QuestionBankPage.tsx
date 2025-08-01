
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const QuestionBankPage: React.FC = () => {
  const navigate = useNavigate()

  // Mock question bank data
  const questionBanks = [
    {
      id: '1',
      institute: 'NEET Institute',
      subject: 'Physics',
      code: 'PHY-001',
      questionCount: 150,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      institute: 'NEET Institute',
      subject: 'Chemistry',
      code: 'CHE-001',
      questionCount: 200,
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      institute: 'JEE Institute',
      subject: 'Mathematics',
      code: 'MAT-001',
      questionCount: 180,
      lastUpdated: '2024-01-13'
    }
  ]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/teacher/exams')}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
            <p className="text-gray-600 mt-1">
              Manage your question collections
            </p>
          </div>
        </div>
        
        <Button onClick={() => navigate('/teacher/question-bank/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question Bank
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search question banks..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Institute" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neet">NEET Institute</SelectItem>
                <SelectItem value="jee">JEE Institute</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Question Banks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questionBanks.map((bank) => (
          <Card key={bank.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{bank.subject}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{bank.institute}</p>
                </div>
                <Badge variant="outline">{bank.code}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-semibold">{bank.questionCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{bank.lastUpdated}</span>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => navigate(`/teacher/question-bank/${bank.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/teacher/question-bank/${bank.id}/edit`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {questionBanks.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Question Banks Found</h3>
          <p className="text-gray-600 mb-6">Create your first question bank to get started.</p>
          <Button onClick={() => navigate('/teacher/question-bank/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question Bank
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuestionBankPage
