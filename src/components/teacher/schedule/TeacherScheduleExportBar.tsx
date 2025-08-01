
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
    <div className="bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 dark:from-teal-950/20 dark:via-blue-950/20 dark:to-purple-950/20 rounded-xl border border-border/50 p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground font-medium">Showing </span>
          <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/30 px-2 py-1 rounded-md">{totalItems}</span>
          <span className="text-muted-foreground font-medium"> schedule{totalItems !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/20 transition-colors border-2 border-teal-300 dark:border-teal-700 font-semibold"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors border-2 border-blue-300 dark:border-blue-700 font-semibold">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
              <DropdownMenuItem onClick={() => onExport('csv')} className="hover:bg-green-50 dark:hover:bg-green-950/20 font-medium">
                <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('excel')} className="hover:bg-teal-50 dark:hover:bg-teal-950/20 font-medium">
                <FileSpreadsheet className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')} className="hover:bg-red-50 dark:hover:bg-red-950/20 font-medium">
                <FileText className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors border-2 border-purple-300 dark:border-purple-700 font-semibold"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
