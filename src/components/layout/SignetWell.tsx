import React from 'react';
import { cn } from '@/lib/utils';

export type SignetWellSize = 'narrow' | 'default' | 'wide' | 'full';

export interface SignetWellProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SignetWellSize;
}

export function SignetWell({ children, size = 'default', className, ...props }: SignetWellProps) {
  const sizes: Record<SignetWellSize, string> = {
    narrow: 'max-w-3xl',   // 768px — focused content (forms, settings)
    default: 'max-w-5xl',  // 1024px — standard pages
    wide: 'max-w-7xl',     // 1280px — dashboards, data-heavy
    full: 'max-w-full',    // edge cases only (requires CTO approval comment)
  };
  
  return (
    <div className={cn('mx-auto px-6 w-full', sizes[size], className)} {...props}>
      {children}
    </div>
  );
}
