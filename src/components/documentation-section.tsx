import { Carousel } from "@/components/carousel"
import { Badge } from "@/components/ui/badge"

const slides = [
  { id: "1", image: "/templates/bento-scan.png" },
  { id: "2", image: "/templates/workspace.png" },
  { id: "3", image: "/templates/analytics.png" },
  { id: "4", image: "/hero-dashboard.png" },
].map((slide) => (
  <div
    key={slide.id}
    className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border bg-muted shadow-sm"
  >
    <img
      src={slide.image}
      alt="Template preview"
      className="h-full w-full object-cover"
    />
  </div>
))

export default function DocumentationSection() {
  return (
    <section id="arsenal" className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Background radial layer - semantic */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, var(--primary) 0%, var(--background) 60%)",
          opacity: 0.15,
        }}
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-4 sm:px-6">
        <Badge variant="secondary">Template Datacore</Badge>
        <h2 className="max-w-xl text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          A closer look at our forged resumes
        </h2>
        <p className="max-w-lg text-center text-sm leading-6 text-muted-foreground">
          Explore ATS-optimized layouts, modern aesthetics, and professional framing
          <br className="hidden sm:block" />
          thoughtfully designed to balance beauty and performance.
        </p>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-5xl items-center justify-center border-b px-4 pb-20 sm:px-6">
        <Carousel slides={slides} />
      </div>
    </section>
  )
}
