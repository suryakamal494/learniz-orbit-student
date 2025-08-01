
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
      scheduled: 'default',
      completed: 'secondary',
      cancelled: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'} className="text-xs">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="lg:hidden space-y-4">
      {data.map((classItem) => (
        <Card key={classItem.id} className="glass border-border/40">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{classItem.subject}</h3>
                <p className="text-sm text-muted-foreground">{classItem.topic}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(classItem.status)}
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
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(classItem.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{classItem.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Book className="h-4 w-4 text-muted-foreground" />
                <span>{classItem.class}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{classItem.batch}</span>
              </div>
            </div>

            {/* Faculty */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Faculty: {classItem.faculty}</p>
              <p className="text-sm text-muted-foreground">Duration: {classItem.duration}</p>
            </div>

            {/* Assignment Buttons */}
            <div className="flex flex-wrap gap-2">
              {classItem.assignments.urlView && (
                <Button
                  onClick={() => handleAssignmentClick('URL View', classItem)}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              )}
              <Button
                onClick={() => handleAssignmentClick('LMS', classItem)}
                variant={classItem.assignments.lmsAssigned ? 'default' : 'outline'}
                size="sm"
                className="h-8 px-3 text-xs"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                LMS
              </Button>
              <Button
                onClick={() => handleAssignmentClick('Notes', classItem)}
                variant={classItem.assignments.notesAssigned ? 'default' : 'outline'}
                size="sm"
                className="h-8 px-3 text-xs"
              >
                <FileText className="h-3 w-3 mr-1" />
                Notes
              </Button>
              <Button
                onClick={() => handleAssignmentClick('Quiz', classItem)}
                variant={classItem.assignments.liveQuizAssigned ? 'default' : 'outline'}
                size="sm"
                className="h-8 px-3 text-xs"
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
