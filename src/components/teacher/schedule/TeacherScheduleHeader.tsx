
import React from 'react';
import { Plus, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TeacherScheduleHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  onImportClick: () => void;
}

export function TeacherScheduleHeader({
  searchValue,
  onSearchChange,
  onCreateClick,
  onImportClick
}: TeacherScheduleHeaderProps) {
  return (
    <div className="glass rounded-lg border border-border/40 p-6 mb-6 bg-gradient-to-r from-primary/10 via-accent-teal/10 to-accent-orange/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent-teal to-accent-orange bg-clip-text text-transparent mb-2">
            Academic Schedule
          </h1>
          <p className="text-muted-foreground">Manage and organize your teaching schedule with ease</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
            <Input
              placeholder="Search classes, subjects, topics..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background/80 border-primary/30 focus:border-primary/60 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onImportClick}
              variant="outline"
              className="flex items-center gap-2 hover:bg-accent-teal/10 border-accent-teal/30 text-accent-teal hover:border-accent-teal/50 transition-all"
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              onClick={onCreateClick}
              className="flex items-center gap-2 gradient-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
