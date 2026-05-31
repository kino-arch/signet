import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Globe, Mail, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Templates", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API Specs", href: "/ats-specs" },
      { name: "Documentation", href: "#" }
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Manifesto", href: "#" }
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "#" }
    ],
  },
];

export function DirectoryFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border/40 bg-card/50 py-16 backdrop-blur-sm md:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Comm-Link */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <span className="font-heading text-2xl font-bold text-primary">Signet</span>
              <Badge variant="outline" className="text-xs">Est. 2026</Badge>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building professional resumes for the modern job market. Engineered to bypass Applicant Tracking Systems.
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-foreground">
                Subscribe to Updates
              </p>
              <div className="flex max-w-sm gap-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-background/50"
                />
                <Button variant="default" size="icon" aria-label="Subscribe">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-bold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-border/40" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          <div className="flex gap-4 text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary" aria-label="Global Network">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" className="transition-colors hover:text-primary" aria-label="Developer Console">
              <Terminal className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2026 Signet. All rights reserved.</span>
          </div>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
