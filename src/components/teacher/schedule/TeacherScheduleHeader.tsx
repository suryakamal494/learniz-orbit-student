
import { Search, Download, Copy, FileSpreadsheet, FileText, Printer, Upload, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TeacherScheduleHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalClasses: number;
  onCreateClass: () => void;
  onImportClasses: () => void;
  onExport: (type: 'copy' | 'csv' | 'excel' | 'pdf' | 'print') => void;
}

export function TeacherScheduleHeader({ 
  searchQuery, 
  onSearchChange, 
  totalClasses,
  onCreateClass,
  onImportClasses,
  onExport 
}: TeacherScheduleHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Schedule</h1>
          <p className="text-muted-foreground">
            Manage and view all scheduled online classes for your batches
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={onImportClasses}
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={onCreateClass}
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="glass border-border/40">
              <DropdownMenuItem onClick={() => onExport('copy')} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('csv')} className="gap-2">
                <FileText className="h-4 w-4" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('excel')} className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')} className="gap-2">
                <FileText className="h-4 w-4" />
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('print')} className="gap-2">
                <Printer className="h-4 w-4" />
                Print
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by subject, topic, class, or batch..."
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
    </div>
  );
}
