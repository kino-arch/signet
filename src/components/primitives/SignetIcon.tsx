import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

// Allow brand icons or fallback rendering
export type IconName = keyof typeof LucideIcons | string;

export interface SignetIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isBrand?: boolean; // Escape hatch for custom/brand SVGs
  customSvg?: React.ReactNode;
}

export const SignetIcon = forwardRef<SVGSVGElement, SignetIconProps>(
  ({ name, size = 'md', className, isBrand, customSvg, ...props }, ref) => {
    const sizeMap = {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    };

    const dimension = sizeMap[size];

    if (isBrand && customSvg) {
      return (
        <span 
          style={{ width: dimension, height: dimension }} 
          className={cn('inline-flex flex-shrink-0 items-center justify-center', className)}
        >
          {customSvg}
        </span>
      );
    }

    const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in Lucide React`);
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        width={dimension}
        height={dimension}
        strokeWidth={2}
        className={cn('flex-shrink-0', className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
SignetIcon.displayName = 'SignetIcon';
