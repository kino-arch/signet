import { Header } from "@/layout/header";

// Registry Components
import { HeroDemo } from "@/components/ui/hero-demo";
import { FeatureCards } from "@/components/feature-cards";
import { LogoSection } from "@/components/logo-section";
import { BentoSection } from "@/components/bento-section";
import DocumentationSection from "@/components/documentation-section";
import TestimonialsSection from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { DirectoryFooter } from "@/components/landing/DirectoryFooter";

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <div className="relative flex w-full flex-col items-center justify-start">
        <div className="relative flex min-h-screen w-full max-w-7xl flex-col items-start justify-start">
          
          {/* Vertical Borders */}
          <div className="bg-muted absolute top-0 left-4 z-0 h-full w-px sm:left-6 md:left-8 lg:left-0"></div>
          <div className="bg-muted absolute top-0 right-4 z-0 h-full w-px sm:right-6 md:right-8 lg:right-0"></div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-4 self-stretch overflow-hidden border-x sm:gap-6 md:gap-8">
            <Header />
            
            {/* Main content landmark */}
            <main id="main-content" className="w-full flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
              <HeroDemo />
              <FeatureCards />
              <LogoSection />
              <BentoSection />
              <DocumentationSection />
              <TestimonialsSection />
              <PricingSection />
              <FAQSection />
              <CTASection />
            </main>
            <DirectoryFooter />
            
          </div>
        </div>
      </div>
    </div>
  );
}
