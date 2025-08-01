
import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TeacherScheduleClass, TeacherScheduleSort } from '@/types/teacherSchedule';
import { format, parseISO } from 'date-fns';

interface TeacherDesktopScheduleTableProps {
  data: TeacherScheduleClass[];
  sort: TeacherScheduleSort;
  onSortChange: (field: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignLMS: (id: string) => void;
  onAssignNotes: (id: string) => void;
  onAssignLiveQuiz: (id: string) => void;
}

export const TeacherDesktopScheduleTable: React.FC<TeacherDesktopScheduleTableProps> = ({
  data,
  sort,
  onSortChange,
  onEdit,
  onDelete,
  onAssignLMS,
  onAssignNotes,
  onAssignLiveQuiz
}) => {
  const getSortIcon = (field: string) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sort.direction === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-primary" /> : 
      <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead className="cursor-pointer hover:bg-muted/50 transition-colors">
      <Button
        variant="ghost"
        className="h-auto p-0 font-medium text-left justify-start gap-2 hover:bg-transparent"
        onClick={() => onSortChange(field)}
      >
        {children}
        {getSortIcon(field)}
      </Button>
    </TableHead>
  );

  return (
    <div className="glass rounded-lg border border-border/40 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-muted/20">
            <TableRow className="hover:bg-transparent border-border/40">
              <SortableHeader field="date">Date</SortableHeader>
              <SortableHeader field="time">Time</SortableHeader>
              <SortableHeader field="class">Class</SortableHeader>
              <SortableHeader field="batch">Batch</SortableHeader>
              <SortableHeader field="subject">Subject</SortableHeader>
              <SortableHeader field="topic">Topic</SortableHeader>
              <TableHead className="min-w-[200px]">URL</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((classItem, index) => (
              <TableRow 
                key={classItem.id} 
                className="hover:bg-muted/30 transition-colors border-border/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-medium whitespace-nowrap min-w-[120px]">
                  <div className="space-y-1">
                    <div>{format(parseISO(classItem.date), 'MMM dd, yyyy')}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(parseISO(classItem.date), 'EEEE')}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap min-w-[100px]">
                  <div className="space-y-1">
                    <div className="font-medium">{classItem.time}</div>
                    <div className="text-xs text-muted-foreground">{classItem.duration}</div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="font-medium text-primary">{classItem.class}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="text-sm">{classItem.batch}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="font-medium">{classItem.subject}</div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="text-sm truncate" title={classItem.topic}>
                    {classItem.topic}
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs h-7 w-full justify-start"
                      onClick={() => window.open(classItem.meetingUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <ExternalLink className="h-3 w-3" />
                      URL View
                    </Button>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => onAssignLMS(classItem.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline text-left"
                      >
                        Assign LMS
                      </button>
                      <button
                        onClick={() => onAssignNotes(classItem.id)}
                        className="text-xs text-green-600 hover:text-green-800 hover:underline text-left"
                      >
                        Assign Notes
                      </button>
                      <button
                        onClick={() => onAssignLiveQuiz(classItem.id)}
                        className="text-xs text-purple-600 hover:text-purple-800 hover:underline text-left"
                      >
                        Assign Live Quiz
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
