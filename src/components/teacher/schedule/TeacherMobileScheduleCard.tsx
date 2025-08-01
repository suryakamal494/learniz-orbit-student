
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
      scheduled: { variant: 'default' as const, className: 'bg-primary/20 text-primary border border-primary/30' },
      completed: { variant: 'secondary' as const, className: 'bg-success/20 text-success border border-success/30' },
      cancelled: { variant: 'destructive' as const, className: 'bg-error/20 text-error border border-error/30' }
    };
    
    const config = variants[status as keyof typeof variants] || variants.scheduled;
    
    return (
      <Badge variant={config.variant} className={`text-xs ${config.className}`}>
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

  const getCardBorderColor = (index: number) => {
    const colors = [
      'border-l-primary',
      'border-l-accent-teal', 
      'border-l-accent-orange',
      'border-l-success',
      'border-l-error'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="lg:hidden space-y-4">
      {data.map((classItem, index) => (
        <Card key={classItem.id} className={`glass border-border/40 ${getCardBorderColor(index)} border-l-4 bg-gradient-to-br from-primary/5 via-accent-teal/5 to-background hover:shadow-lg transition-all duration-300`}>
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <h3 className={`font-semibold ${getSubjectColor(classItem.subject)}`}>{classItem.subject}</h3>
                <p className="text-sm text-muted-foreground">{classItem.topic}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(classItem.status)}
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
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-foreground">{format(new Date(classItem.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-accent-teal" />
                <span className="text-accent-teal font-medium">{classItem.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Book className="h-4 w-4 text-accent-orange" />
                <span className="text-accent-orange font-medium bg-accent-orange/10 px-2 py-1 rounded-md text-xs">
                  {classItem.class}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium bg-primary/10 px-2 py-1 rounded-md text-xs">
                  {classItem.batch}
                </span>
              </div>
            </div>

            {/* Faculty */}
            <div className="mb-4 p-3 bg-muted/20 rounded-lg border border-border/20">
              <p className="text-sm text-muted-foreground">Faculty: <span className="text-foreground font-medium">{classItem.faculty}</span></p>
              <p className="text-sm text-muted-foreground">Duration: <span className="text-accent-teal font-medium">{classItem.duration}</span></p>
            </div>

            {/* Assignment Buttons */}
            <div className="flex flex-wrap gap-2">
              {classItem.assignments.urlView && (
                <Button
                  onClick={() => handleAssignmentClick('URL View', classItem)}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
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
                  ? "h-8 px-3 text-xs bg-accent-teal text-white hover:bg-accent-teal-light shadow-md" 
                  : "h-8 px-3 text-xs border-accent-teal/30 text-accent-teal hover:bg-accent-teal/10 hover:border-accent-teal/50"
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
                  ? "h-8 px-3 text-xs bg-accent-orange text-white hover:bg-accent-orange-light shadow-md" 
                  : "h-8 px-3 text-xs border-accent-orange/30 text-accent-orange hover:bg-accent-orange/10 hover:border-accent-orange/50"
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
                  ? "h-8 px-3 text-xs bg-success text-white hover:bg-success-light shadow-md" 
                  : "h-8 px-3 text-xs border-success/30 text-success hover:bg-success/10 hover:border-success/50"
                }
              >
                <Zap className="h-3 w-3 mr-1" />
                Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
