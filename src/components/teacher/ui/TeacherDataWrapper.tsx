
import React from 'react';
import { TeacherLoadingSkeleton } from './TeacherLoadingSkeleton';

interface TeacherDataWrapperProps<T> {
  data: T[] | null | undefined;
  loading?: boolean;
  error?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  children: (data: T[]) => React.ReactNode;
  className?: string;
}

export function TeacherDataWrapper<T>({
  data,
  loading = false,
  error = null,
  emptyTitle = "No data available",
  emptyDescription = "There's nothing to display at the moment.",
  emptyIcon = <div className="text-4xl">📋</div>,
  loadingComponent,
  errorComponent,
  children,
  className = ""
}: TeacherDataWrapperProps<T>) {
  // Loading state
  if (loading) {
    return (
      <div className={className}>
        {loadingComponent || <TeacherLoadingSkeleton variant="card" count={3} />}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={className}>
        {errorComponent || (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
              <div className="text-3xl">⚠️</div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className={className}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50 mb-4">
            {emptyIcon}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{emptyTitle}</h3>
          <p className="text-muted-foreground max-w-md">
            {emptyDescription}
          </p>
        </div>
      </div>
    );
  }

  // Populated state
  return (
    <div className={className}>
      {children(data)}
    </div>
  );
}
