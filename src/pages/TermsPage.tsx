import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to the Forge
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Last Updated: May 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Signet (the "Service"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, you must not use our platform. These terms form a binding code of conduct between you and Signet.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                2. Description of Service
              </h2>
              <p>
                Signet provides AI-assisted resume building, formatting, and ATS-optimization tools. We grant you a personal, non-exclusive, non-transferable license to use our platform to forge your professional documents. We reserve the right to modify, suspend, or discontinue any part of the Service at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                3. User Responsibilities
              </h2>
              <p>
                As a user of Signet, you agree to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide accurate and truthful information regarding your professional experience.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Refrain from attempting to reverse engineer, disrupt, or exploit the platform's infrastructure or AI models.</li>
                <li>Accept that while our tools optimize for Applicant Tracking Systems, we do not guarantee employment, interviews, or specific outcomes.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                4. Beskar Exchange & Payments
              </h2>
              <p>
                Certain premium features, such as advanced AI re-forging and deep ATS diagnostics, require the expenditure of internal tokens ("Beskar").
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Tokens are purchased via our secure payment provider (Stripe) and are non-refundable once used.</li>
                <li>Token packages are billed at the time of purchase in your local currency, based on real-time or fallback exchange rates.</li>
                <li>Signet reserves the right to adjust the token cost of specific AI operations based on underlying compute costs.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                5. Intellectual Property
              </h2>
              <p>
                You retain all rights to the personal data and resume content you input into the Service. However, the design, code, AI prompts, templates, and branding (including the "Signet" name and logo) are the exclusive intellectual property of Signet and may not be copied or reproduced without explicit authorization.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                6. Limitation of Liability
              </h2>
              <p>
                Signet is provided "as is" without warranties of any kind. In no event shall Signet, its founders, or affiliates be liable for any indirect, incidental, or consequential damages resulting from your use of the Service, including but not limited to missed employment opportunities or data loss.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
