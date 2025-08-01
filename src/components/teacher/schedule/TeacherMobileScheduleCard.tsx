
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, BookOpen, FileText, Zap, Edit, Trash2 } from 'lucide-react';
import { TeacherScheduleClass } from '@/types/teacherSchedule';
import { format, parseISO } from 'date-fns';

interface TeacherMobileScheduleCardProps {
  classItem: TeacherScheduleClass;
  index: number;
}

export const TeacherMobileScheduleCard: React.FC<TeacherMobileScheduleCardProps> = ({ 
  classItem, 
  index 
}) => {
  const handleEdit = () => {
    console.log('Edit class:', classItem.id);
  };

  const handleDelete = () => {
    console.log('Delete class:', classItem.id);
  };

  const handleAssignment = (type: string) => {
    console.log(`Assign ${type} to class:`, classItem.id);
  };

  return (
    <Card 
      className="glass border border-border/40 animate-fade-in w-full overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-semibold text-primary text-lg truncate">
              {classItem.subject}
            </h3>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(classItem.date), 'MMM dd, yyyy')} • {classItem.time}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs bg-muted/50 px-2 py-1 rounded shrink-0">
              {classItem.duration}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-border/40">
                <DropdownMenuItem onClick={handleEdit} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete} 
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="text-sm line-clamp-2 text-foreground">
          {classItem.topic}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="min-w-0">
            <div className="text-muted-foreground mb-1">Class</div>
            <div className="font-medium truncate">{classItem.class}</div>
          </div>
          <div className="min-w-0">
            <div className="text-muted-foreground mb-1">Batch</div>
            <div className="font-medium truncate">{classItem.batch}</div>
          </div>
        </div>

        <div>
          <div className="text-muted-foreground text-sm mb-1">Faculty</div>
          <div className="font-medium truncate">{classItem.faculty}</div>
        </div>

        <div>
          <div className="text-muted-foreground text-sm mb-2">URL & Assignments</div>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs w-full justify-start"
              onClick={() => window.open(classItem.urlView, '_blank')}
            >
              <Eye className="h-3 w-3" />
              URL View
            </Button>
            <div className="grid grid-cols-3 gap-1">
              <Button
                variant={classItem.assignedLMS ? "default" : "outline"}
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleAssignment('lms')}
              >
                <BookOpen className="h-3 w-3" />
                LMS
              </Button>
              <Button
                variant={classItem.assignedNotes ? "default" : "outline"}
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleAssignment('notes')}
              >
                <FileText className="h-3 w-3" />
                Notes
              </Button>
              <Button
                variant={classItem.assignedLiveQuiz ? "default" : "outline"}
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleAssignment('quiz')}
              >
                <Zap className="h-3 w-3" />
                Quiz
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
