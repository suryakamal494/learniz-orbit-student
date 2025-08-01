
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
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Academic Schedule
          </h1>
          <p className="text-muted-foreground">Manage and organize your teaching schedule</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search classes, subjects, topics..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onImportClick}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              onClick={onCreateClick}
              className="flex items-center gap-2"
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
