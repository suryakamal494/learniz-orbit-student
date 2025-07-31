
import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

interface TeacherLoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  lines?: number;
  count?: number;
}

export const TeacherLoadingSkeleton: React.FC<TeacherLoadingSkeletonProps> = ({
  className,
  variant = 'rectangular',
  lines = 1,
  count = 1
}) => {
  const baseClasses = "animate-pulse bg-muted/50 rounded";
  
  const variantClasses = {
    text: "h-4",
    rectangular: "h-12",
    circular: "rounded-full aspect-square",
    card: "h-32"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4",
              className
            )}
          />
        ))}
      </div>
    );
  }

  if (count > 1) {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }, (_, i) => (
          <Skeleton
            key={i}
            className={cn(baseClasses, variantClasses[variant], className)}
          />
        ))}
      </div>
    );
  }

  return (
    <Skeleton
      className={cn(baseClasses, variantClasses[variant], className)}
      role="status"
      aria-label="Loading..."
    />
  );
};

export const TeacherCardSkeleton: React.FC = () => {
  return (
    <div className="glass rounded-lg border border-border/40 p-6 space-y-4">
      <div className="flex items-center gap-4">
        <TeacherLoadingSkeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <TeacherLoadingSkeleton variant="text" className="h-6 w-3/4" />
          <TeacherLoadingSkeleton variant="text" className="h-4 w-1/2" />
        </div>
      </div>
      <TeacherLoadingSkeleton variant="text" lines={3} />
      <div className="flex gap-2">
        <TeacherLoadingSkeleton className="w-20 h-8" />
        <TeacherLoadingSkeleton className="w-16 h-8" />
      </div>
    </div>
  );
};

export const TeacherListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border/40">
          <TeacherLoadingSkeleton variant="circular" className="w-10 h-10" />
          <div className="flex-1 space-y-2">
            <TeacherLoadingSkeleton variant="text" className="h-5 w-3/4" />
            <TeacherLoadingSkeleton variant="text" className="h-4 w-1/2" />
          </div>
          <TeacherLoadingSkeleton className="w-16 h-6" />
        </div>
      ))}
    </div>
  );
};

export const TeacherTableSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Desktop skeleton */}
      <div className="hidden lg:block">
        <div className="glass rounded-lg border border-border/40 overflow-hidden">
          <div className="p-4 bg-muted/20">
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <TeacherLoadingSkeleton key={i} variant="text" className="h-6" />
              ))}
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-6 gap-4">
                  {Array.from({ length: 6 }, (_, j) => (
                    <TeacherLoadingSkeleton key={j} variant="text" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="lg:hidden">
        <TeacherCardSkeleton />
      </div>
    </div>
  );
};
