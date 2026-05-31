import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="comms" className="relative w-full overflow-hidden border-t">
      {/* Subtle radial gradient — semantic tokens only */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, var(--primary) 0%, var(--background) 60%)",
          opacity: 0.15,
        }}
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Ready to forge your legacy?
        </h2>
        <p className="max-w-lg text-base leading-7 text-muted-foreground">
          Let's build professional narratives that command attention,
          <br className="hidden sm:block" />
          bypass filters, and land the interviews you deserve.
        </p>
        <Button size="lg">Start Forging Now</Button>
      </div>
    </section>
  )
}
