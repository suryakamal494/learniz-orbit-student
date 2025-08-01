
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
      scheduled: { 
        className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30' 
      },
      completed: { 
        className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30' 
      },
      cancelled: { 
        className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30' 
      }
    };
    
    const config = variants[status as keyof typeof variants] || variants.scheduled;
    
    return (
      <Badge className={`font-medium border ${config.className}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Mathematics': 'text-blue-600 dark:text-blue-400',
      'Physics': 'text-purple-600 dark:text-purple-400',
      'Chemistry': 'text-orange-600 dark:text-orange-400',
      'Biology': 'text-green-600 dark:text-green-400',
      'English': 'text-red-600 dark:text-red-400',
    };
    return colors[subject as keyof typeof colors] || 'text-blue-600 dark:text-blue-400';
  };

  return (
    <div className="hidden lg:block">
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-orange-950/20 hover:from-blue-100 hover:via-purple-100 hover:to-orange-100 dark:hover:from-blue-900/30 dark:hover:via-purple-900/30 dark:hover:to-orange-900/30 border-b border-border/30">
              <TableHead 
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors font-semibold text-blue-700 dark:text-blue-300"
                onClick={() => onSortChange('date')}
              >
                <div className="flex items-center gap-2">
                  DATE
                  {getSortIcon('date')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors font-semibold text-purple-700 dark:text-purple-300"
                onClick={() => onSortChange('time')}
              >
                <div className="flex items-center gap-2">
                  TIME
                  {getSortIcon('time')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors font-semibold text-orange-700 dark:text-orange-300"
                onClick={() => onSortChange('class')}
              >
                <div className="flex items-center gap-2">
                  CLASS
                  {getSortIcon('class')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors font-semibold text-green-700 dark:text-green-300"
                onClick={() => onSortChange('batch')}
              >
                <div className="flex items-center gap-2">
                  BATCH
                  {getSortIcon('batch')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors font-semibold text-indigo-700 dark:text-indigo-300"
                onClick={() => onSortChange('subject')}
              >
                <div className="flex items-center gap-2">
                  SUBJECT
                  {getSortIcon('subject')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-900/20 transition-colors font-semibold text-teal-700 dark:text-teal-300"
                onClick={() => onSortChange('topic')}
              >
                <div className="flex items-center gap-2">
                  TOPIC
                  {getSortIcon('topic')}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-pink-700 dark:text-pink-300">ASSIGNMENTS</TableHead>
              <TableHead className="text-center font-semibold text-slate-700 dark:text-slate-300">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((classItem, index) => (
              <TableRow key={classItem.id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-purple-50/30 hover:to-orange-50/30 dark:hover:from-blue-950/10 dark:hover:via-purple-950/10 dark:hover:to-orange-950/10 transition-all duration-200 border-b border-border/10">
                <TableCell className="font-medium">
                  <div className="space-y-2">
                    <div className="text-foreground font-semibold">{format(new Date(classItem.date), 'MMM dd, yyyy')}</div>
                    {getStatusBadge(classItem.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-bold text-purple-600 dark:text-purple-400 text-lg">{classItem.time}</div>
                    <div className="text-sm text-muted-foreground bg-purple-50 dark:bg-purple-950/20 px-2 py-1 rounded-md">{classItem.duration}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/30 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800/30">
                    {classItem.class}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-950/30 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800/30">
                    {classItem.batch}
                  </span>
                </TableCell>
                <TableCell>
                  <div className={`font-bold text-lg ${getSubjectColor(classItem.subject)}`}>
                    {classItem.subject}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="font-semibold text-foreground mb-1">{classItem.topic}</div>
                    <div className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-md truncate">{classItem.faculty}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {classItem.assignments.urlView && (
                      <Button
                        onClick={() => handleAssignmentClick('URL View', classItem)}
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs font-semibold border-2 border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 dark:border-blue-600 dark:text-blue-300 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 transition-all duration-200"
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
                        ? "h-8 px-3 text-xs font-bold bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg border-2 border-teal-400" 
                        : "h-8 px-3 text-xs font-semibold border-2 border-teal-300 text-teal-700 bg-teal-50 hover:bg-teal-100 hover:border-teal-400 dark:border-teal-600 dark:text-teal-300 dark:bg-teal-950/30 dark:hover:bg-teal-900/40"
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
                        ? "h-8 px-3 text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg border-2 border-orange-400" 
                        : "h-8 px-3 text-xs font-semibold border-2 border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 dark:border-orange-600 dark:text-orange-300 dark:bg-orange-950/30 dark:hover:bg-orange-900/40"
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
                        ? "h-8 px-3 text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg border-2 border-green-400" 
                        : "h-8 px-3 text-xs font-semibold border-2 border-green-300 text-green-700 bg-green-50 hover:bg-green-100 hover:border-green-400 dark:border-green-600 dark:text-green-300 dark:bg-green-950/30 dark:hover:bg-green-900/40"
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
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-300 dark:border-slate-600">
                        <MoreVertical className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
                      <DropdownMenuItem onClick={() => handleActionClick('Edit', classItem)} className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/20 font-medium">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Schedule
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/30" />
                      <DropdownMenuItem 
                        onClick={() => handleActionClick('Delete', classItem)}
                        className="text-red-600 focus:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 font-medium"
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
