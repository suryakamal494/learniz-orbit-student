
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
      <ChevronUp className="h-4 w-4 text-primary" /> : 
      <ChevronDown className="h-4 w-4 text-primary" />;
  };

  const handleAssignmentClick = (type: string, classItem: TeacherScheduleClass) => {
    toast.success(`${type} assignment clicked for ${classItem.topic}`);
  };

  const handleActionClick = (action: string, classItem: TeacherScheduleClass) => {
    toast.success(`${action} clicked for ${classItem.topic}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: { variant: 'default' as const, className: 'bg-primary/20 text-primary border-primary/30' },
      completed: { variant: 'secondary' as const, className: 'bg-success/20 text-success border-success/30' },
      cancelled: { variant: 'destructive' as const, className: 'bg-error/20 text-error border-error/30' }
    };
    
    const config = variants[status as keyof typeof variants] || variants.scheduled;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Mathematics': 'text-primary',
      'Physics': 'text-accent-teal',
      'Chemistry': 'text-accent-orange',
      'Biology': 'text-success',
      'English': 'text-error',
    };
    return colors[subject as keyof typeof colors] || 'text-primary';
  };

  return (
    <div className="hidden lg:block">
      <div className="glass rounded-lg border border-border/40 overflow-hidden bg-gradient-to-br from-primary/5 via-accent-teal/5 to-background">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-primary/10 via-accent-teal/10 to-accent-orange/10 hover:from-primary/15 hover:via-accent-teal/15 hover:to-accent-orange/15 border-b border-primary/20">
              <TableHead 
                className="cursor-pointer hover:bg-primary/10 transition-colors font-semibold"
                onClick={() => onSortChange('date')}
              >
                <div className="flex items-center gap-2 text-primary">
                  DATE
                  {getSortIcon('date')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent-teal/10 transition-colors font-semibold"
                onClick={() => onSortChange('time')}
              >
                <div className="flex items-center gap-2 text-accent-teal">
                  TIME
                  {getSortIcon('time')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent-orange/10 transition-colors font-semibold"
                onClick={() => onSortChange('class')}
              >
                <div className="flex items-center gap-2 text-accent-orange">
                  CLASS
                  {getSortIcon('class')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-primary/10 transition-colors font-semibold"
                onClick={() => onSortChange('batch')}
              >
                <div className="flex items-center gap-2 text-primary">
                  BATCH
                  {getSortIcon('batch')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent-teal/10 transition-colors font-semibold"
                onClick={() => onSortChange('subject')}
              >
                <div className="flex items-center gap-2 text-accent-teal">
                  SUBJECT
                  {getSortIcon('subject')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent-orange/10 transition-colors font-semibold"
                onClick={() => onSortChange('topic')}
              >
                <div className="flex items-center gap-2 text-accent-orange">
                  TOPIC
                  {getSortIcon('topic')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-primary">URL</TableHead>
              <TableHead className="text-center font-semibold text-accent-teal">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((classItem, index) => (
              <TableRow key={classItem.id} className="hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-teal/5 hover:to-accent-orange/5 transition-all duration-200 border-b border-border/20">
                <TableCell className="font-medium">
                  <div className="space-y-1">
                    <div className="text-foreground">{format(new Date(classItem.date), 'MMM dd, yyyy')}</div>
                    {getStatusBadge(classItem.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-accent-teal">{classItem.time}</div>
                    <div className="text-sm text-muted-foreground">{classItem.duration}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-accent-orange bg-accent-orange/10 px-2 py-1 rounded-md">
                    {classItem.class}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                    {classItem.batch}
                  </span>
                </TableCell>
                <TableCell>
                  <div className={`font-semibold ${getSubjectColor(classItem.subject)}`}>
                    {classItem.subject}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="font-medium text-foreground">{classItem.topic}</div>
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
                        className="h-7 px-2 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                    <Button
                      onClick={() => handleAssignmentClick('LMS', classItem)}
                      variant={classItem.assignments.lmsAssigned ? 'default' : 'outline'}
                      size="sm"
                      className={classItem.assignments.lmsAssigned 
                        ? "h-7 px-2 text-xs bg-accent-teal text-white hover:bg-accent-teal-light" 
                        : "h-7 px-2 text-xs border-accent-teal/30 text-accent-teal hover:bg-accent-teal/10 hover:border-accent-teal/50"
                      }
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      LMS
                    </Button>
                    <Button
                      onClick={() => handleAssignmentClick('Notes', classItem)}
                      variant={classItem.assignments.notesAssigned ? 'default' : 'outline'}
                      size="sm"
                      className={classItem.assignments.notesAssigned 
                        ? "h-7 px-2 text-xs bg-accent-orange text-white hover:bg-accent-orange-light" 
                        : "h-7 px-2 text-xs border-accent-orange/30 text-accent-orange hover:bg-accent-orange/10 hover:border-accent-orange/50"
                      }
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Notes
                    </Button>
                    <Button
                      onClick={() => handleAssignmentClick('Quiz', classItem)}
                      variant={classItem.assignments.liveQuizAssigned ? 'default' : 'outline'}
                      size="sm"
                      className={classItem.assignments.liveQuizAssigned 
                        ? "h-7 px-2 text-xs bg-success text-white hover:bg-success-light" 
                        : "h-7 px-2 text-xs border-success/30 text-success hover:bg-success/10 hover:border-success/50"
                      }
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Quiz
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent-teal/10">
                        <MoreVertical className="h-4 w-4 text-accent-teal" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleActionClick('Edit', classItem)} className="text-primary hover:bg-primary/10">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleActionClick('Delete', classItem)}
                        className="text-error focus:text-error hover:bg-error/10"
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
