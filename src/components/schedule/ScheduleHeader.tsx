
import { Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ScheduleHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalClasses: number;
}

export function ScheduleHeader({ searchQuery, onSearchChange, totalClasses }: ScheduleHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Schedule</h1>
          <p className="text-muted-foreground">
            View all past classes, resources, and materials for your courses
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search classes, topics, or faculty..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 glass border-border/40 focus:border-primary/50 transition-colors"
          />
        </div>
        
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {totalClasses} {totalClasses === 1 ? 'class' : 'classes'} found
        </div>
      </div>
    </div>
  );
}
