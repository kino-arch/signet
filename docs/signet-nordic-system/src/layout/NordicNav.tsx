import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignetMark } from "@/components/nordic/SignetMark";
import { Menu, X } from "lucide-react";

export function NordicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-nordic-border shadow-nordic-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <SignetMark className="text-nordic-accent" size={28} />
            <span className="text-lg font-semibold tracking-tight text-nordic-text">
              Signet
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Features
            </a>
            <a href="#templates" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Pricing
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Log in
            </Link>
            <Link to="/dashboard" className="nordic-btn-primary text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-nordic-text-secondary hover:text-nordic-text"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-nordic-border px-6 py-4 space-y-3">
          <a href="#features" className="block text-sm font-medium text-nordic-text-secondary">Features</a>
          <a href="#templates" className="block text-sm font-medium text-nordic-text-secondary">Templates</a>
          <a href="#pricing" className="block text-sm font-medium text-nordic-text-secondary">Pricing</a>
          <div className="pt-3 border-t border-nordic-border-subtle space-y-2">
            <Link to="/login" className="block text-sm font-medium text-nordic-text-secondary">Log in</Link>
            <Link to="/dashboard" className="block w-full text-center nordic-btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
