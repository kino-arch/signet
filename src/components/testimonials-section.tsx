"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Working with this team elevated our entire product experience. Every interaction now feels intentional and beautifully crafted.",
    name: "Aarav Mehta",
    company: "Founder, Nova Labs",
    image: "https://github.com/shadcn.png",
    initials: "AM",
  },
  {
    quote:
      "Their design thinking completely reshaped our platform. The clarity, usability, and visual polish exceeded our expectations.",
    name: "Emily Carter",
    company: "Head of Product, Lumina",
    image: "https://github.com/vercel.png",
    initials: "EC",
  },
  {
    quote:
      "From branding to interface design, the attention to detail was exceptional. Our launch received incredible feedback from users.",
    name: "Daniel Kim",
    company: "CEO, Horizon Tech",
    initials: "DK",
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => setTransitioning(false), 100)
      }, 300)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const navigate = (index: number) => {
    setTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setTransitioning(false), 100)
    }, 300)
  }

  const current = testimonials[active]

  return (
    <section id="runes" className="w-full py-16 md:py-24">
      {/* Header */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-4 sm:px-6">
        <Badge variant="outline" className="font-mono tracking-wider border-primary/30 text-primary bg-primary/5">
          [ MISSION REPORTS ]
        </Badge>
        <h2 className="max-w-xl text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl uppercase">
          Verified Success Records
        </h2>
        <p className="max-w-lg text-center text-sm leading-6 text-muted-foreground">
          We partner with ambitious individuals
          <br className="hidden sm:block" />
          to forge professional narratives that land interviews.
        </p>
      </div>

      {/* Testimonial card */}
      <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-start gap-8 border-y border-border/50 px-4 py-12 sm:px-6 md:flex-row md:items-center md:px-12 md:py-16">
        <Avatar
          className="h-24 w-24 shrink-0 border border-border/50 transition-all duration-700 grayscale hover:grayscale-0 ring-offset-background hover:ring-2 hover:ring-primary hover:ring-offset-2"
          style={{
            opacity: transitioning ? 0.5 : 1,
            transform: transitioning ? "scale(0.95)" : "scale(1)",
          }}
        >
          {current.image && <AvatarImage src={current.image} alt={current.name} />}
          <AvatarFallback className="text-lg font-semibold">
            {current.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 flex-col gap-4">
          <blockquote
            className="text-xl font-medium leading-relaxed tracking-tight transition-all duration-500 md:text-2xl"
            style={{
              filter: transitioning ? "blur(4px)" : "blur(0px)",
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div
            className="flex items-center gap-2 transition-all duration-500"
            style={{
              filter: transitioning ? "blur(4px)" : "blur(0px)",
            }}
          >
            <span className="text-sm font-semibold">{current.name}</span>
            <span className="text-sm text-muted-foreground">
              — {current.company}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <Button
            size="icon"
            variant="outline"
            aria-label="Previous Testimonial"
            onClick={() =>
              navigate(
                (active - 1 + testimonials.length) % testimonials.length
              )
            }
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            aria-label="Next Testimonial"
            onClick={() =>
              navigate((active + 1) % testimonials.length)
            }
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
