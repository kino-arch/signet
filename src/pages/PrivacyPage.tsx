import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import shieldData from "@/assets/animations/shield_activate.json";

export function PrivacyPage() {
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
            <LottieAnimation animationData={shieldData} className="h-16 w-16 mb-4 opacity-80" />
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Last Updated: May 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                1. Information We Collect
              </h2>
              <p>
                At Signet, we treat your professional data with the same security protocols used for Beskar alloys. We collect only the information necessary to forge your resume and optimize it for Applicant Tracking Systems (ATS).
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Account Information:</strong> When you authenticate via Google or create an account, we store your email address and basic profile information.
                </li>
                <li>
                  <strong>Career Data:</strong> Work history, skills, education, and achievements that you input into the Signet Forge.
                </li>
                <li>
                  <strong>Usage Data:</strong> Telemetry regarding how you interact with our platform to improve our AI forging algorithms.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                2. How We Use Your Data
              </h2>
              <p>
                Your data is utilized strictly for your advancement. We use the information we collect to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Generate, format, and optimize your professional resumes.</li>
                <li>Analyze ATS compatibility and suggest improvements via our AI models.</li>
                <li>Process transactions and maintain your Beskar Exchange token balance.</li>
                <li>Send critical operational updates and covert transmissions (which you can opt out of at any time).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                3. Third-Party Services
              </h2>
              <p>
                We do not sell your personal data to data brokers or third-party recruiters. We share your data only with trusted infrastructure partners required to operate our service:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Authentication:</strong> Google (for OAuth login) and Supabase (for secure credential management).
                </li>
                <li>
                  <strong>Payments:</strong> Stripe (for securely processing Beskar token purchases).
                </li>
                <li>
                  <strong>AI Processing:</strong> OpenRouter and partner LLMs (your data is temporarily processed to generate resume bullet points, but is not used to train public models).
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                4. Data Security
              </h2>
              <p>
                Your data is stored in secure, encrypted databases. While no system is impenetrable, our architecture is designed to withstand rigorous external probing. You maintain ownership of your career data and can request complete deletion of your records from our servers at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                5. Contact the Guild
              </h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your data rights, please contact our support team at:{" "}
                <a href="mailto:privacy@signet.com" className="text-primary hover:underline">
                  privacy@signet.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
