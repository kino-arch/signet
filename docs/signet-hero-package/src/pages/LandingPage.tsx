import { Header } from "@/layout/Header";
import { Hero } from "@/components/sections/hero/Hero";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header transparent />
      <main>
        <Hero />
        {/* Additional sections mount here */}
      </main>
    </div>
  );
}
