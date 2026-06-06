import { Command as Apple, Code as Github, Briefcase as LinkedIn, MessageCircle as X } from "lucide-react"

export default function FooterSection() {
  return (
    <div className="flex w-full flex-col items-start justify-start pt-10">
      <div className="flex h-auto flex-col items-stretch justify-between self-stretch pt-0 pr-0 pb-8 md:flex-row">
        <div className="flex h-auto flex-col items-start justify-start gap-8 p-4 md:p-8">
          <div className="flex items-center justify-start gap-3 self-stretch">
            <div className="text-center text-xl leading-4 font-semibold">
              <Apple className="text-primary" />
            </div>
          </div>
          <div className="text-sm font-medium">
            <h1 className="text-lg font-medium">Signet</h1>
            <p className="max-w-md text-muted-foreground">
              The AI-powered resume builder for modern professionals. Transform
              your career trajectory today.
            </p>
          </div>
          <div className="flex items-start justify-start gap-6">
            <LinkedIn className="w-6" />
            <X className="w-6" />
            <Github className="w-6" />
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-start justify-start gap-6 self-stretch p-4 sm:flex-row sm:justify-between md:gap-8 md:p-8">
          <div className="flex min-w-40 flex-1 flex-col items-start justify-start gap-3">
            <div className="self-stretch text-sm leading-5 font-medium">
              Product
            </div>
            <div className="flex flex-col items-start justify-end gap-2">
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Resume Builder
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Templates
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                AI Cover Letters
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Pricing
              </div>
            </div>
          </div>

          <div className="flex min-w-40 flex-1 flex-col items-start justify-start gap-3">
            <div className="text-sm leading-5 font-medium">Company</div>
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                About us
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Our team
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Careers
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Brand
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Contact
              </div>
            </div>
          </div>

          <div className="flex min-w-40 flex-1 flex-col items-start justify-start gap-3">
            <div className="text-sm leading-5 font-medium">Resources</div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="cursor-pointer self-stretch text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Terms of use
              </div>
              <div className="cursor-pointer self-stretch text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                API Reference
              </div>
              <div className="cursor-pointer self-stretch text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Documentation
              </div>
              <div className="cursor-pointer self-stretch text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Community
              </div>
              <div className="cursor-pointer self-stretch text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
