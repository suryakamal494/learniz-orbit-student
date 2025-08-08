
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { BatchReportFilters } from '@/types/batchReport';
import { cn } from '@/lib/utils';

interface ReportFiltersProps {
  filters: BatchReportFilters;
  onFiltersChange: (filters: Partial<BatchReportFilters>) => void;
  onClearFilters: () => void;
  batches: string[];
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  batches
}) => {
  const hasActiveFilters = filters.batch || filters.dateRange?.from || filters.dateRange?.to;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/20 rounded-lg border border-border/40">
      <div className="flex-1">
        <Select
          value={filters.batch || ''}
          onValueChange={(value) => 
            onFiltersChange({ batch: value || undefined })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select batch (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            {batches.map((batch) => (
              <SelectItem key={batch} value={batch}>
                {batch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, 'LLL dd, y')} -{' '}
                    {format(filters.dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(filters.dateRange.from, 'LLL dd, y')
                )
              ) : (
                'Pick date range'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange?.from && filters.dateRange?.to ? {
                from: filters.dateRange.from,
                to: filters.dateRange.to
              } : undefined}
              onSelect={(range) => 
                onFiltersChange({ 
                  dateRange: {
                    from: range?.from,
                    to: range?.to
                  }
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="outline" size="icon" onClick={onClearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
