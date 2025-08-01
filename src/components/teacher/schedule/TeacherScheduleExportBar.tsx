
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
    toast.success('Data copied to clipboard');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Showing </span>
          <span className="font-medium text-foreground">{totalItems}</span>
          <span className="text-muted-foreground"> schedule{totalItems !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
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
            variant="outline"
            size="sm"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
