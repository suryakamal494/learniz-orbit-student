
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ResourceLinks } from './ResourceLinks';
import { ScheduleClass, ScheduleSort, SortField } from '@/types/schedule';
import { format, parseISO } from 'date-fns';

interface ScheduleTableProps {
  data: ScheduleClass[];
  sort: ScheduleSort;
  onSortChange: (field: string) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ScheduleTable({
  data,
  sort,
  onSortChange,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange
}: ScheduleTableProps) {
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

  if (data.length === 0) {
    return (
      <div className="text-center py-12 glass rounded-lg border border-border/40">
        <div className="space-y-3">
          <div className="text-4xl">📚</div>
          <h3 className="text-lg font-medium text-foreground">No classes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters to find more classes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block glass rounded-lg border border-border/40 overflow-hidden">
        <Table>
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
                <TableCell className="font-medium">
                  <div className="space-y-1">
                    <div>{format(parseISO(classItem.date), 'MMM dd, yyyy')}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(parseISO(classItem.date), 'EEEE')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{classItem.time}</div>
                    <div className="text-xs text-muted-foreground">{classItem.duration}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-primary">{classItem.class}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{classItem.batch}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{classItem.subject}</div>
                </TableCell>
                <TableCell className="max-w-[250px]">
                  <div className="text-sm line-clamp-2" title={classItem.topic}>
                    {classItem.topic}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{classItem.faculty}</div>
                </TableCell>
                <TableCell>
                  <ResourceLinks resources={classItem.resources} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((classItem, index) => (
          <div 
            key={classItem.id} 
            className="glass rounded-lg border border-border/40 p-4 space-y-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="font-semibold text-primary text-lg">{classItem.subject}</div>
                <div className="text-sm text-muted-foreground">
                  {format(parseISO(classItem.date), 'MMM dd, yyyy')} • {classItem.time}
                </div>
              </div>
              <div className="text-xs bg-muted/50 px-2 py-1 rounded">
                {classItem.duration}
              </div>
            </div>

            <div className="text-sm line-clamp-2">{classItem.topic}</div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Class</div>
                <div className="font-medium">{classItem.class}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Batch</div>
                <div className="font-medium">{classItem.batch}</div>
              </div>
            </div>

            <div>
              <div className="text-muted-foreground text-sm mb-1">Faculty</div>
              <div className="font-medium">{classItem.faculty}</div>
            </div>

            <div>
              <div className="text-muted-foreground text-sm mb-2">Resources</div>
              <ResourceLinks resources={classItem.resources} isMobile />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Show</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-16 h-8 glass border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-border/40">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>of {totalItems} classes</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
