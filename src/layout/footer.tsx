import { Hexagon, Globe, Mail, MessageCircle } from "lucide-react"

export default function FooterSection() {
  return (
    <div className="flex w-full flex-col items-start justify-start pt-10">
      <div className="flex h-auto flex-col items-stretch justify-between self-stretch pt-0 pr-0 pb-8 md:flex-row">
        <div className="flex h-auto flex-col items-start justify-start gap-8 p-4 md:p-8">
          <div className="flex items-center justify-start gap-3 self-stretch">
              <Hexagon className="text-primary" />
          </div>
          <div className="text-sm font-medium">
            <h1 className="text-lg font-medium">Design without limits</h1>
            <p className="max-w-md text-muted-foreground">
              I create digital experiences that connect and inspire. I build
              apps, websites, brands, and products end-to-end.
            </p>
          </div>
          <div className="flex items-start justify-start gap-6 text-muted-foreground">
            <Globe className="h-6 w-6 cursor-pointer transition-colors hover:text-primary" />
            <MessageCircle className="h-6 w-6 cursor-pointer transition-colors hover:text-primary" />
            <Mail className="h-6 w-6 cursor-pointer transition-colors hover:text-primary" />
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-start justify-start gap-6 self-stretch p-4 sm:flex-row sm:justify-between md:gap-8 md:p-8">
          <div className="flex min-w-40 flex-1 flex-col items-start justify-start gap-3">
            <div className="self-stretch text-sm leading-5 font-medium">
              Product
            </div>
            <div className="flex flex-col items-start justify-end gap-2">
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Features
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Pricing
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Live Previews
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                Real-time Previews
              </div>
              <div className="cursor-pointer text-sm leading-5 font-normal text-muted-foreground transition-colors hover:text-primary">
                AI Agents
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
