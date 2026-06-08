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
      className={cn("shrink-0", className)}
    >
      {/* Outer orbit ring */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Inner diamond / signet */}
      <path
        d="M16 6L24 16L16 26L8 16Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      {/* Center punch / seal dot */}
      <circle cx="16" cy="16" r="3" fill="#020617" />
    </svg>
  );
}
