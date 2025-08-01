
import React from 'react';
import { MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TeacherScheduleClass } from '@/types/teacherSchedule';
import { format, parseISO } from 'date-fns';

interface TeacherMobileScheduleCardProps {
  classItem: TeacherScheduleClass;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignLMS: (id: string) => void;
  onAssignNotes: (id: string) => void;
  onAssignLiveQuiz: (id: string) => void;
}

export const TeacherMobileScheduleCard: React.FC<TeacherMobileScheduleCardProps> = ({ 
  classItem, 
  index,
  onEdit,
  onDelete,
  onAssignLMS,
  onAssignNotes,
  onAssignLiveQuiz
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-muted/50 text-muted-foreground border-border/40';
    }
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
            <div className={`text-xs px-2 py-1 rounded border ${getStatusColor(classItem.status)}`}>
              {classItem.status}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-border/40">
                <DropdownMenuItem onClick={() => onEdit(classItem.id)} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(classItem.id)} 
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
          <div className="text-muted-foreground text-sm mb-1">Duration</div>
          <div className="font-medium">{classItem.duration}</div>
        </div>

        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Meeting & Resources</div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs h-8 w-full justify-start"
            onClick={() => window.open(classItem.meetingUrl, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="h-3 w-3" />
            URL View
          </Button>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAssignLMS(classItem.id)}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
            >
              Assign LMS
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button
              onClick={() => onAssignNotes(classItem.id)}
              className="text-xs text-green-600 hover:text-green-800 hover:underline"
            >
              Assign Notes
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <button
              onClick={() => onAssignLiveQuiz(classItem.id)}
              className="text-xs text-purple-600 hover:text-purple-800 hover:underline"
            >
              Assign Live Quiz
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
