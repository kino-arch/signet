export function NordicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Accent glow — top center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, #3B82F6 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
