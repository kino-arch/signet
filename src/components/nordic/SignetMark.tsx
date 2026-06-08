import { cn } from "@/lib/utils";

interface SignetMarkProps {
  className?: string;
  size?: number;
}

export function SignetMark({ className, size = 32 }: SignetMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]", className)}
    >
      <defs>
        <linearGradient id="signetGlow" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-nordic-accent-hover)" />
          <stop offset="0.5" stopColor="var(--color-nordic-accent)" />
          <stop offset="1" stopColor="var(--color-nordic-accent-hover)" />
        </linearGradient>
      </defs>
      
      {/* Outer orbits */}
      <circle cx="16" cy="16" r="14" stroke="url(#signetGlow)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4" />
      <circle cx="16" cy="16" r="11" stroke="url(#signetGlow)" strokeWidth="0.5" strokeOpacity="0.8" />
      
      {/* Core diamond */}
      <path
        d="M16 4L28 16L16 28L4 16Z"
        fill="url(#signetGlow)"
        fillOpacity="0.15"
        stroke="url(#signetGlow)"
        strokeWidth="1.5"
      />
      
      {/* Inner star / compass */}
      <path
        d="M16 8L18 14L24 16L18 18L16 24L14 18L8 16L14 14Z"
        fill="url(#signetGlow)"
      />
      <circle cx="16" cy="16" r="2" fill="var(--color-nordic-text)" />
    </svg>
  );
}
