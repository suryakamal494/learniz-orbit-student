import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Plus, Search, MoreHorizontal, Edit, Trash2, FileText } from 'lucide-react'
import { mockInstructions, deleteInstruction } from '@/data/mockInstructions'
import type { Instruction } from '@/types/instruction'
import { useToast } from '@/hooks/use-toast'

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [instructions, setInstructions] = useState<Instruction[]>(mockInstructions)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInstructions = instructions.filter(instruction =>
    instruction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instruction.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateInstruction = () => {
    navigate('/teacher/exams/instructions/create')
  }

  const handleEditInstruction = (instructionId: string) => {
    navigate(`/teacher/exams/instructions/${instructionId}/edit`)
  }

  const handleDeleteInstruction = (instructionId: string) => {
    const success = deleteInstruction(instructionId)
    if (success) {
      setInstructions(prev => prev.filter(i => i.id !== instructionId))
      toast({
        title: "Success",
        description: "Instruction deleted successfully",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete instruction",
        variant: "destructive"
      })
    }
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructions Management</h1>
          <p className="text-gray-600 mt-1">
            Create and manage instructions for students and staff
          </p>
        </div>
        <Button onClick={handleCreateInstruction} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Instruction
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search instructions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Instructions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Instructions
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {filteredInstructions.length} instruction{filteredInstructions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstructions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        {searchTerm ? 'No instructions found matching your search.' : 'No instructions created yet.'}
                      </div>
                      {!searchTerm && (
                        <Button 
                          variant="outline" 
                          onClick={handleCreateInstruction}
                          className="mt-2"
                        >
                          Create Your First Instruction
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInstructions.map((instruction) => (
                    <TableRow key={instruction.id}>
                      <TableCell>
                        <div className="font-medium">{instruction.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 max-w-md">
                          {truncateContent(instruction.content)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(instruction.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(instruction.updatedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditInstruction(instruction.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the instruction
                                    "{instruction.title}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteInstruction(instruction.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InstructionsPage
