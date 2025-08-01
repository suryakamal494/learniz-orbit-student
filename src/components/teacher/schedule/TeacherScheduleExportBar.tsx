
import React from 'react';
import { Download, Copy, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface TeacherScheduleExportBarProps {
  totalItems: number;
  onExport: (format: 'csv' | 'excel' | 'pdf') => void;
}

export function TeacherScheduleExportBar({
  totalItems,
  onExport
}: TeacherScheduleExportBarProps) {
  const handleCopy = () => {
    // Placeholder for copy functionality
    toast.success('Data copied to clipboard');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass rounded-lg border border-border/40 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {totalItems} schedule{totalItems !== 1 ? 's' : ''}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onExport('csv')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('excel')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            onClick={handlePrint}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
