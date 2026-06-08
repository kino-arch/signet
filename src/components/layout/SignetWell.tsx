import React from 'react';
import { cn } from '@/lib/utils';

export type SignetWellSize = 'narrow' | 'default' | 'hero' | 'wide' | 'full';

export interface SignetWellProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SignetWellSize;
}

export function SignetWell({ children, size = 'default', className, ...props }: SignetWellProps) {
  const sizes: Record<SignetWellSize, string> = {
    narrow: 'max-w-3xl',   // 768px — focused content (forms, settings)
    default: 'max-w-5xl',  // 1024px — standard pages
    hero: 'max-w-6xl',     // 1152px — landing page sections, matches hero width
    wide: 'max-w-7xl',     // 1280px — dashboards, data-heavy
    full: 'max-w-full',    // edge cases only (requires CTO approval comment)
  };
  
  return (
    <div className={cn('mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 w-full', sizes[size], className)} {...props}>
      {children}
    </div>
  );
}
