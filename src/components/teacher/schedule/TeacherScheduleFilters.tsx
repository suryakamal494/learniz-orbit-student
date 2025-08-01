
import React from 'react';
import { CalendarIcon, X, RotateCcw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TeacherScheduleFilters as TeacherScheduleFiltersType } from '@/types/teacherSchedule';
import { getUniqueClasses, getUniqueBatches } from '@/data/mockTeacherSchedule';

interface TeacherScheduleFiltersComponentProps {
  filters: TeacherScheduleFiltersType;
  onFiltersChange: (filters: Partial<TeacherScheduleFiltersType>) => void;
  onClearFilters: () => void;
  totalItems: number;
}

export function TeacherScheduleFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  totalItems
}: TeacherScheduleFiltersComponentProps) {
  const classes = getUniqueClasses();
  const batches = getUniqueBatches();
  
  const hasActiveFilters = filters.class || filters.batch || filters.dateRange.from || filters.dateRange.to;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900/20 dark:via-blue-950/20 dark:to-purple-950/20 rounded-xl border border-border/50 p-5 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-foreground text-lg">Filters</span>
          {hasActiveFilters && (
            <span className="text-sm text-white font-bold bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full shadow-sm">
              {totalItems} result{totalItems !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="sm"
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/20 border-2 border-orange-300 dark:border-orange-700 font-semibold"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Class Filter */}
        <div className="space-y-2">
          <Label htmlFor="class" className="text-sm font-bold text-blue-700 dark:text-blue-300">Class</Label>
          <Select
            value={filters.class || 'all'}
            onValueChange={(value) => onFiltersChange({ class: value === 'all' ? undefined : value })}
          >
            <SelectTrigger className="bg-background/80 border-2 border-blue-200 dark:border-blue-800/50 hover:border-blue-300 focus:border-blue-500 transition-colors font-medium">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Batch Filter */}
        <div className="space-y-2">
          <Label htmlFor="batch" className="text-sm font-bold text-purple-700 dark:text-purple-300">Batch</Label>
          <Select
            value={filters.batch || 'all'}
            onValueChange={(value) => onFiltersChange({ batch: value === 'all' ? undefined : value })}
          >
            <SelectTrigger className="bg-background/80 border-2 border-purple-200 dark:border-purple-800/50 hover:border-purple-300 focus:border-purple-500 transition-colors font-medium">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>{batch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date From */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-green-700 dark:text-green-300">From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-medium bg-background/80 border-2 border-green-200 dark:border-green-800/50 hover:border-green-300 focus:border-green-500 transition-colors",
                  !filters.dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
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
          <Label className="text-sm font-bold text-orange-700 dark:text-orange-300">To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-medium bg-background/80 border-2 border-orange-200 dark:border-orange-800/50 hover:border-orange-300 focus:border-orange-500 transition-colors",
                  !filters.dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
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
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/30">
          {filters.class && (
            <div className="flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-700 rounded-full text-sm font-semibold">
              Class: {filters.class}
              <button
                onClick={() => onFiltersChange({ class: undefined })}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.batch && (
            <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-700 rounded-full text-sm font-semibold">
              Batch: {filters.batch}
              <button
                onClick={() => onFiltersChange({ batch: undefined })}
                className="ml-1 hover:bg-purple-200 dark:hover:bg-purple-800/50 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.dateRange.from && (
            <div className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-2 border-green-300 dark:border-green-700 rounded-full text-sm font-semibold">
              From: {format(filters.dateRange.from, "MMM dd")}
              <button
                onClick={() => onFiltersChange({ 
                  dateRange: { ...filters.dateRange, from: undefined } 
                })}
                className="ml-1 hover:bg-green-200 dark:hover:bg-green-800/50 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.dateRange.to && (
            <div className="flex items-center gap-1 px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-2 border-orange-300 dark:border-orange-700 rounded-full text-sm font-semibold">
              To: {format(filters.dateRange.to, "MMM dd")}
              <button
                onClick={() => onFiltersChange({ 
                  dateRange: { ...filters.dateRange, to: undefined } 
                })}
                className="ml-1 hover:bg-orange-200 dark:hover:bg-orange-800/50 rounded-full p-1 transition-colors"
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
