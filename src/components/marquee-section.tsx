import Marquee from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { SignetWell } from "@/components/layout/SignetWell"

const reviews = [
  {
    name: "Din Djarin",
    username: "@mando",
    body: "This is the way. The ATS bypass modules are flawless.",
    img: "bg-primary/10 border-primary/30 text-primary",
  },
  {
    name: "Bo-Katan Kryze",
    username: "@nighthowl",
    body: "Exceptional architecture. Reclaiming my career trajectory was effortless.",
    img: "bg-secondary/10 border-secondary/30 text-secondary",
  },
  {
    name: "Boba Fett",
    username: "@daimyo",
    body: "A formidable asset. It slices through corporate defenses like a vibroblade.",
    img: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
  },
  {
    name: "Fennec Shand",
    username: "@assassin",
    body: "Sharp, precise, and lethal. Exactly what I need for high-value targets.",
    img: "bg-destructive/10 border-destructive/30 text-destructive",
  },
  {
    name: "Paz Vizsla",
    username: "@heavyinfantry",
    body: "Built like beskar. It withstood every automated parsing test we threw at it.",
    img: "bg-accent/10 border-accent/30 text-accent",
  },
  {
    name: "Armorer",
    username: "@forge",
    body: "You have forged something truly indestructible. The layout is perfectly balanced.",
    img: "bg-muted-foreground/10 border-muted-foreground/30 text-muted-foreground",
  },
]

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300",
        "border-border/40 bg-background/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5"
      )}
    >
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(0,117,149,0.05)_100%)]"></div>
      <div className="flex flex-row items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs font-bold",
            img
          )}
        >
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold tracking-tight text-foreground">
            {name}
          </figcaption>
          <p className="font-mono text-xs font-medium text-muted-foreground">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
        "{body}"
      </blockquote>
    </figure>
  )
}

export function MarqueeSection() {
  return (
    <SignetWell size="full" className="p-0">
      <div className="relative mx-auto flex w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden py-4 sm:py-8">
        <Marquee pauseOnHover className="[--duration:40s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Side Gradients for seamless fading into the global background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 max-w-48 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 max-w-48 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </SignetWell>
  )
}
