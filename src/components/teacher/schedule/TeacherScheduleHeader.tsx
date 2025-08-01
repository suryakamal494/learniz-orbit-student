
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
    <div className="glass rounded-lg border border-border/40 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Academic Schedule</h1>
          <p className="text-muted-foreground">Manage and organize your teaching schedule</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search classes, subjects, topics..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background/50 border-border/60 focus:border-primary/50"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onImportClick}
              variant="outline"
              className="flex items-center gap-2 hover:bg-accent/80"
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              onClick={onCreateClick}
              className="flex items-center gap-2 gradient-primary"
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
