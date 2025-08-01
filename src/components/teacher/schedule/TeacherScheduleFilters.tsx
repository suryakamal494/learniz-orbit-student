
import React from 'react';
import { CalendarIcon, X, RotateCcw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TeacherScheduleFilters } from '@/types/teacherSchedule';
import { getUniqueClasses, getUniqueBatches } from '@/data/mockTeacherSchedule';

interface TeacherScheduleFiltersProps {
  filters: TeacherScheduleFilters;
  onFiltersChange: (filters: Partial<TeacherScheduleFilters>) => void;
  onClearFilters: () => void;
  totalItems: number;
}

export function TeacherScheduleFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  totalItems
}: TeacherScheduleFiltersProps) {
  const classes = getUniqueClasses();
  const batches = getUniqueBatches();
  
  const hasActiveFilters = filters.class || filters.batch || filters.dateRange.from || filters.dateRange.to;

  return (
    <div className="glass rounded-lg border border-border/40 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">Filters</span>
          {hasActiveFilters && (
            <span className="text-sm text-muted-foreground">
              ({totalItems} result{totalItems !== 1 ? 's' : ''})
            </span>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Class Filter */}
        <div className="space-y-2">
          <Label htmlFor="class" className="text-sm font-medium">Class</Label>
          <Select
            value={filters.class || ''}
            onValueChange={(value) => onFiltersChange({ class: value || undefined })}
          >
            <SelectTrigger className="bg-background/50 border-border/60">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Batch Filter */}
        <div className="space-y-2">
          <Label htmlFor="batch" className="text-sm font-medium">Batch</Label>
          <Select
            value={filters.batch || ''}
            onValueChange={(value) => onFiltersChange({ batch: value || undefined })}
          >
            <SelectTrigger className="bg-background/50 border-border/60">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Batches</SelectItem>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>{batch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date From */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background/50 border-border/60",
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateRange.from}
                onSelect={(date) => onFiltersChange({ 
                  dateRange: { ...filters.dateRange, from: date } 
                })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date To */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background/50 border-border/60",
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateRange.to}
                onSelect={(date) => onFiltersChange({ 
                  dateRange: { ...filters.dateRange, to: date } 
                })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
          {filters.class && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Class: {filters.class}
              <button
                onClick={() => onFiltersChange({ class: undefined })}
                className="ml-1 hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.batch && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Batch: {filters.batch}
              <button
                onClick={() => onFiltersChange({ batch: undefined })}
                className="ml-1 hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.dateRange.from && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              From: {format(filters.dateRange.from, "MMM dd")}
              <button
                onClick={() => onFiltersChange({ 
                  dateRange: { ...filters.dateRange, from: undefined } 
                })}
                className="ml-1 hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.dateRange.to && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              To: {format(filters.dateRange.to, "MMM dd")}
              <button
                onClick={() => onFiltersChange({ 
                  dateRange: { ...filters.dateRange, to: undefined } 
                })}
                className="ml-1 hover:bg-primary/20 rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
