
import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResourceLinks } from './ResourceLinks';
import { ScheduleClass, ScheduleSort, SortField } from '@/types/schedule';
import { format, parseISO } from 'date-fns';

interface DesktopScheduleTableProps {
  data: ScheduleClass[];
  sort: ScheduleSort;
  onSortChange: (field: string) => void;
}

export const DesktopScheduleTable: React.FC<DesktopScheduleTableProps> = ({
  data,
  sort,
  onSortChange
}) => {
  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sort.direction === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-primary" /> : 
      <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
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
              <SortableHeader field="faculty">Faculty</SortableHeader>
              <TableHead className="min-w-[200px]">Resources</TableHead>
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
                <TableCell className="whitespace-nowrap">
                  <div className="text-sm">{classItem.faculty}</div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <ResourceLinks resources={classItem.resources} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
