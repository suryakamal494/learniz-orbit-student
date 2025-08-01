
import React from 'react';
import { Clock, Calendar, Users, Book, MoreVertical, ExternalLink, BookOpen, FileText, Zap, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { TeacherScheduleClass } from '@/types/teacherSchedule';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TeacherMobileScheduleCardProps {
  data: TeacherScheduleClass[];
}

export function TeacherMobileScheduleCard({ data }: TeacherMobileScheduleCardProps) {
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
      <Badge className={`text-xs font-medium border ${config.className}`}>
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

  const getCardBorderColor = (index: number) => {
    const colors = [
      'border-l-blue-500',
      'border-l-purple-500', 
      'border-l-orange-500',
      'border-l-green-500',
      'border-l-red-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="lg:hidden space-y-4">
      {data.map((classItem, index) => (
        <Card key={classItem.id} className={`bg-card border border-border/50 ${getCardBorderColor(index)} border-l-4 shadow-sm hover:shadow-md transition-all duration-300`}>
          <CardContent className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <h3 className={`font-bold text-lg ${getSubjectColor(classItem.subject)}`}>{classItem.subject}</h3>
                <p className="text-sm text-muted-foreground font-medium bg-muted/50 px-2 py-1 rounded-md">{classItem.topic}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(classItem.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 border-2">
                      <MoreVertical className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleActionClick('Edit', classItem)} className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 font-medium">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Schedule
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleActionClick('Delete', classItem)}
                      className="text-red-600 focus:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Schedule
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-700 dark:text-blue-300 font-semibold">{format(new Date(classItem.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-700 dark:text-purple-300 font-bold">{classItem.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
                <Book className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-orange-700 dark:text-orange-300 font-bold">
                  {classItem.class}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300 font-bold">
                  {classItem.batch}
                </span>
              </div>
            </div>

            {/* Faculty */}
            <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <p className="text-sm text-muted-foreground mb-1">Faculty: <span className="text-foreground font-semibold">{classItem.faculty}</span></p>
              <p className="text-sm text-muted-foreground">Duration: <span className="text-purple-600 dark:text-purple-400 font-semibold">{classItem.duration}</span></p>
            </div>

            {/* Assignment Buttons */}
            <div className="flex flex-wrap gap-2">
              {classItem.assignments.urlView && (
                <Button
                  onClick={() => handleAssignmentClick('URL View', classItem)}
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 text-xs font-semibold border-2 border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 dark:border-blue-600 dark:text-blue-300 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 transition-all duration-200"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View
                </Button>
              )}
              <Button
                onClick={() => handleAssignmentClick('LMS', classItem)}
                variant={classItem.assignments.lmsAssigned ? 'default' : 'outline'}
                size="sm"
                className={classItem.assignments.lmsAssigned 
                  ? "h-9 px-4 text-xs font-bold bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg border-2 border-teal-400" 
                  : "h-9 px-4 text-xs font-semibold border-2 border-teal-300 text-teal-700 bg-teal-50 hover:bg-teal-100 hover:border-teal-400 dark:border-teal-600 dark:text-teal-300 dark:bg-teal-950/30 dark:hover:bg-teal-900/40"
                }
              >
                <BookOpen className="h-3 w-3 mr-2" />
                LMS
              </Button>
              <Button
                onClick={() => handleAssignmentClick('Notes', classItem)}
                variant={classItem.assignments.notesAssigned ? 'default' : 'outline'}
                size="sm"
                className={classItem.assignments.notesAssigned 
                  ? "h-9 px-4 text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg border-2 border-orange-400" 
                  : "h-9 px-4 text-xs font-semibold border-2 border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 dark:border-orange-600 dark:text-orange-300 dark:bg-orange-950/30 dark:hover:bg-orange-900/40"
                }
              >
                <FileText className="h-3 w-3 mr-2" />
                Notes
              </Button>
              <Button
                onClick={() => handleAssignmentClick('Quiz', classItem)}
                variant={classItem.assignments.liveQuizAssigned ? 'default' : 'outline'}
                size="sm"
                className={classItem.assignments.liveQuizAssigned 
                  ? "h-9 px-4 text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg border-2 border-green-400" 
                  : "h-9 px-4 text-xs font-semibold border-2 border-green-300 text-green-700 bg-green-50 hover:bg-green-100 hover:border-green-400 dark:border-green-600 dark:text-green-300 dark:bg-green-950/30 dark:hover:bg-green-900/40"
                }
              >
                <Zap className="h-3 w-3 mr-2" />
                Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
