import CTASection from "@/components/cta-section"

import FooterSection from "@/layout/footer"
import { Header } from "@/layout/header"
import HeroSection01 from "@/components/sections/hero/hero-01"
import { SignetFeatureGrid } from "@/components/sections/bento-grid/SignetFeatureGrid"
import { SignetTestimonials } from "@/components/sections/testimonials/SignetTestimonials"
import PricingSection03 from "@/components/sections/pricing/pricing-03"
import { Seo } from "@/components/seo/Seo"
import { SkipLink } from "@/components/system/SkipLink"
import { useAnalyticsTracker } from "@/hooks/useAnalytics"

export function LandingPage() {
  useAnalyticsTracker()

  return (
    <>
      <SkipLink />
      <Seo
        title="Forge Your Identity"
        description="Transform scattered experience into a polished, ATS-optimized resume. AI-powered resume builder for professionals who want to stand out."
        canonical="https://signet.app"
        ogImage="https://signet.app/og-landing.png"
      />
      <div className="relative flex min-h-safe w-full flex-col items-center justify-start overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <div className="relative flex w-full flex-col items-center justify-start">
          <div className="relative flex min-h-safe w-full max-w-7xl flex-col items-start justify-start">
            <div className="absolute top-0 left-4 z-0 h-full w-px bg-muted sm:left-6 md:left-8 lg:left-0"></div>

            <div className="absolute top-0 right-4 z-0 h-full w-px bg-muted sm:right-6 md:right-8 lg:right-0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden border-x sm:gap-6 md:gap-8">
              <div className="relative h-8 self-stretch overflow-hidden">
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <div className="relative h-full w-full">
                    {Array.from({ length: 300 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-4 w-full origin-top-left -rotate-45 outline-[0.5px] outline-offset-[-0.25px] outline-primary/40"
                        style={{
                          top: `${i * 16 - 120}px`,
                          left: "-100%",
                          width: "300%",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <Header />
              <main id="main-content" className="flex w-full flex-col items-center justify-center">
                <HeroSection01 />
                <SignetFeatureGrid />
                <SignetTestimonials />
                <PricingSection03 />
                <CTASection />
              </main>
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
