
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
} from '@/components/ui/alert-dialog'
import { Search, Plus, MoreHorizontal, Edit, Trash2, FileText } from 'lucide-react'
import { mockInstructions } from '@/data/mockInstructions'
import { useToast } from '@/hooks/use-toast'

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [instructions, setInstructions] = useState(mockInstructions)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [instructionToDelete, setInstructionToDelete] = useState<string | null>(null)

  const filteredInstructions = instructions.filter(instruction =>
    instruction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instruction.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (instructionId: string) => {
    navigate(`/teacher/exams/instructions/edit/${instructionId}`)
  }

  const handleDeleteClick = (instructionId: string) => {
    setInstructionToDelete(instructionId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (instructionToDelete) {
      setInstructions(prev => prev.filter(i => i.id !== instructionToDelete))
      toast({
        title: "Success",
        description: "Instruction deleted successfully",
      })
      setDeleteDialogOpen(false)
      setInstructionToDelete(null)
    }
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructions</h1>
          <p className="text-gray-600 mt-1">
            Manage exam and system instructions for students
          </p>
        </div>
        <Button onClick={() => navigate('/teacher/exams/instructions/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Instruction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Instructions
              <span className="text-sm font-normal text-muted-foreground">
                ({filteredInstructions.length})
              </span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search instructions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No instructions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInstructions.map((instruction) => (
                  <TableRow key={instruction.id}>
                    <TableCell className="font-medium">
                      {instruction.title}
                    </TableCell>
                    <TableCell className="max-w-md">
                      {truncateContent(instruction.content)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(instruction.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(instruction.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(instruction.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the instruction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default InstructionsPage
