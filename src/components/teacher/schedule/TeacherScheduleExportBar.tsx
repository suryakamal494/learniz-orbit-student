
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
    <div className="glass rounded-lg border border-border/40 p-4 mb-6 bg-gradient-to-r from-accent-teal/5 to-accent-orange/5">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Showing </span>
          <span className="font-semibold text-primary">{totalItems}</span>
          <span className="text-muted-foreground"> schedule{totalItems !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="text-accent-teal hover:text-accent-teal-light hover:bg-accent-teal/10 transition-colors"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-light hover:bg-primary/10 transition-colors">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onExport('csv')} className="hover:bg-success/10">
                <FileSpreadsheet className="h-4 w-4 mr-2 text-success" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('excel')} className="hover:bg-accent-teal/10">
                <FileSpreadsheet className="h-4 w-4 mr-2 text-accent-teal" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')} className="hover:bg-error/10">
                <FileText className="h-4 w-4 mr-2 text-error" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            onClick={handlePrint}
            variant="ghost"
            size="sm"
            className="text-accent-orange hover:text-accent-orange-light hover:bg-accent-orange/10 transition-colors"
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
