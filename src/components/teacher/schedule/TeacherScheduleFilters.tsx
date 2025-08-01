
import { useState } from 'react';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { TeacherScheduleFilters as TeacherScheduleFiltersType } from '@/types/teacherSchedule';
import { getUniqueTeacherSubjects, getUniqueTeacherClasses, getUniqueTeacherBatches } from '@/data/mockTeacherSchedule';

interface TeacherScheduleFiltersProps {
  filters: TeacherScheduleFiltersType;
  onFiltersChange: (filters: Partial<TeacherScheduleFiltersType>) => void;
  onClearAll: () => void;
}

export function TeacherScheduleFilters({ filters, onFiltersChange, onClearAll }: TeacherScheduleFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);

  const subjects = getUniqueTeacherSubjects();
  const classes = getUniqueTeacherClasses();
  const batches = getUniqueTeacherBatches();

  const hasActiveFilters = Boolean(
    filters.subject || 
    filters.class || 
    filters.batch || 
    filters.dateRange.from || 
    filters.dateRange.to
  );

  const activeFiltersCount = [
    filters.subject,
    filters.class,
    filters.batch,
    filters.dateRange.from,
    filters.dateRange.to
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2 glass border-border/40"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 glass rounded-lg border border-border/40">
          {/* Subject Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Select
              value={filters.subject || 'all'}
              onValueChange={(value) => onFiltersChange({ subject: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="glass border-border/40">
                <SelectValue placeholder="All subjects" />
              </SelectTrigger>
              <SelectContent className="glass border-border/40">
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Class</label>
            <Select
              value={filters.class || 'all'}
              onValueChange={(value) => onFiltersChange({ class: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="glass border-border/40">
                <SelectValue placeholder="All classes" />
              </SelectTrigger>
              <SelectContent className="glass border-border/40">
                <SelectItem value="all">All classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Batch Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Batch</label>
            <Select
              value={filters.batch || 'all'}
              onValueChange={(value) => onFiltersChange({ batch: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="glass border-border/40">
                <SelectValue placeholder="All batches" />
              </SelectTrigger>
              <SelectContent className="glass border-border/40">
                <SelectItem value="all">All batches</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date From Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">From Date</label>
            <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal glass border-border/40",
                    !filters.dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    format(filters.dateRange.from, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass border-border/40" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.from}
                  onSelect={(date) => {
                    onFiltersChange({ 
                      dateRange: { ...filters.dateRange, from: date } 
                    });
                    setDateFromOpen(false);
                  }}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Date To Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To Date</label>
            <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal glass border-border/40",
                    !filters.dateRange.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.to ? (
                    format(filters.dateRange.to, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass border-border/40" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.to}
                  onSelect={(date) => {
                    onFiltersChange({ 
                      dateRange: { ...filters.dateRange, to: date } 
                    });
                    setDateToOpen(false);
                  }}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}
