
import { Play, BookOpen, Brain, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Resource } from '@/types/schedule';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ResourceLinksProps {
  resources: Resource[];
  isMobile?: boolean;
}

export function ResourceLinks({ resources, isMobile = false }: ResourceLinksProps) {
  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Play className="h-3 w-3" />;
      case 'lms':
        return <BookOpen className="h-3 w-3" />;
      case 'quiz':
        return <Brain className="h-3 w-3" />;
      default:
        return <ExternalLink className="h-3 w-3" />;
    }
  };

  const getResourceColor = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return 'bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20';
      case 'lms':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20';
      case 'quiz':
        return 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20';
      default:
        return 'bg-muted/50 text-muted-foreground border-border/40 hover:bg-muted';
    }
  };

  const getResourceLabel = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return 'Video Recording';
      case 'lms':
        return 'LMS Content';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Resource';
    }
  };

  if (resources.length === 0) {
    return (
      <div className="text-xs text-muted-foreground italic">
        No resources available
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2">
        {resources.map((resource, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`gap-2 text-xs h-8 ${getResourceColor(resource.type)}`}
            onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
          >
            {getResourceIcon(resource.type)}
            {resource.title}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {resources.map((resource, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 text-xs h-7 px-2 ${getResourceColor(resource.type)}`}
              onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
            >
              {getResourceIcon(resource.type)}
              <span className="hidden sm:inline">{getResourceLabel(resource.type)}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{resource.title}</p>
            <p className="text-xs text-muted-foreground">{getResourceLabel(resource.type)}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
