import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { SignetMark } from "@/components/branding/SignetMark";
import { Link } from "react-router-dom";

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = true }: HeaderProps) {
  const scrolled = useScrolled(20);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        scrolled || !transparent
          ? "border-b border-slate-800/60 bg-slate-950/80 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <SignetMark className="text-cyan-400" size={28} />
          <span className="text-lg font-semibold tracking-tight text-white">
            Signet
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Features
          </a>
          <a
            href="#templates"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Templates
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Pricing
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
          >
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
