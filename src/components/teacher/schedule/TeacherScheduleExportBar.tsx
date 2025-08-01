
import { Copy, Download, FileText, Printer, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeacherScheduleExportBarProps {
  totalItems: number;
}

export function TeacherScheduleExportBar({ totalItems }: TeacherScheduleExportBarProps) {
  const handleExport = (type: string) => {
    // TODO: Implement actual export functionality
    console.log(`Exporting ${totalItems} records as ${type}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/40">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mr-4">
        <span>Export {totalItems} records:</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('copy')}
          className="gap-2 text-xs"
        >
          <Copy className="h-3 w-3" />
          Copy
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('csv')}
          className="gap-2 text-xs"
        >
          <FileText className="h-3 w-3" />
          CSV
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('excel')}
          className="gap-2 text-xs"
        >
          <FileSpreadsheet className="h-3 w-3" />
          Excel
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('pdf')}
          className="gap-2 text-xs"
        >
          <Download className="h-3 w-3" />
          PDF
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport('print')}
          className="gap-2 text-xs"
        >
          <Printer className="h-3 w-3" />
          Print
        </Button>
      </div>
    </div>
  );
}
