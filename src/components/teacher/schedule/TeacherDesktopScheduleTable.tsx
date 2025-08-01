
import React from 'react';
import { ChevronUp, ChevronDown, MoreVertical, ExternalLink, BookOpen, FileText, Zap, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { TeacherScheduleClass, TeacherScheduleSort } from '@/types/teacherSchedule';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TeacherDesktopScheduleTableProps {
  data: TeacherScheduleClass[];
  sort: TeacherScheduleSort;
  onSortChange: (field: string) => void;
}

export function TeacherDesktopScheduleTable({
  data,
  sort,
  onSortChange
}: TeacherDesktopScheduleTableProps) {
  const getSortIcon = (field: string) => {
    if (sort.field !== field) return null;
    return sort.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const handleAssignmentClick = (type: string, classItem: TeacherScheduleClass) => {
    toast.success(`${type} assignment clicked for ${classItem.topic}`);
  };

  const handleActionClick = (action: string, classItem: TeacherScheduleClass) => {
    toast.success(`${action} clicked for ${classItem.topic}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'default',
      completed: 'secondary',
      cancelled: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="hidden lg:block">
      <div className="glass rounded-lg border border-border/40 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20 hover:bg-muted/30">
              <TableHead 
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => onSortChange('date')}
              >
                <div className="flex items-center gap-2">
                  DATE
                  {getSortIcon('date')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => onSortChange('time')}
              >
                <div className="flex items-center gap-2">
                  TIME
                  {getSortIcon('time')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => onSortChange('class')}
              >
                <div className="flex items-center gap-2">
                  CLASS
                  {getSortIcon('class')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => onSortChange('batch')}
              >
                <div className="flex items-center gap-2">
                  BATCH
                  {getSortIcon('batch')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => onSortChange('subject')}
              >
                <div className="flex items-center gap-2">
                  SUBJECT
                  {getSortIcon('subject')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => onSortChange('topic')}
              >
                <div className="flex items-center gap-2">
                  TOPIC
                  {getSortIcon('topic')}
                </div>
              </TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-center">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((classItem) => (
              <TableRow key={classItem.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-medium">
                  <div className="space-y-1">
                    <div>{format(new Date(classItem.date), 'MMM dd, yyyy')}</div>
                    {getStatusBadge(classItem.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{classItem.time}</div>
                    <div className="text-sm text-muted-foreground">{classItem.duration}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{classItem.class}</TableCell>
                <TableCell>{classItem.batch}</TableCell>
                <TableCell>
                  <div className="font-medium text-primary">{classItem.subject}</div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="font-medium">{classItem.topic}</div>
                    <div className="text-sm text-muted-foreground truncate">{classItem.faculty}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {classItem.assignments.urlView && (
                      <Button
                        onClick={() => handleAssignmentClick('URL View', classItem)}
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                    <Button
                      onClick={() => handleAssignmentClick('LMS', classItem)}
                      variant={classItem.assignments.lmsAssigned ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      LMS
                    </Button>
                    <Button
                      onClick={() => handleAssignmentClick('Notes', classItem)}
                      variant={classItem.assignments.notesAssigned ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Notes
                    </Button>
                    <Button
                      onClick={() => handleAssignmentClick('Quiz', classItem)}
                      variant={classItem.assignments.liveQuizAssigned ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Quiz
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleActionClick('Edit', classItem)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleActionClick('Delete', classItem)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Schedule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
