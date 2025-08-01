
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
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-orange-950/20 rounded-xl border border-border/50 p-6 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Academic Schedule
          </h1>
          <p className="text-muted-foreground font-medium">Manage and organize your teaching schedule with ease</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
            <Input
              placeholder="Search classes, subjects, topics..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background/80 border-2 border-blue-200 dark:border-blue-800/50 focus:border-blue-400 focus:ring-blue-200 dark:focus:border-blue-600 dark:focus:ring-blue-800/20 transition-all font-medium"
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onImportClick}
              variant="outline"
              className="flex items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 border-2 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:border-purple-400 transition-all font-semibold px-6"
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button
              onClick={onCreateClick}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold px-6 border-2 border-blue-400"
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
