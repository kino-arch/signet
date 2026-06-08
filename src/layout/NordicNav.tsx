import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignetMark } from "@/components/nordic/SignetMark";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Templates", href: "#templates" },
  { name: "FAQ", href: "#faq" },
];

export function NordicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={mobileOpen && "active"}
        className={cn(
          "fixed z-50 w-full transition-all duration-300",
          scrolled && "bg-nordic-bg/80 border-b border-nordic-border backdrop-blur-xl shadow-nordic-sm"
        )}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-4 lg:gap-0">
            {/* Logo and Mobile Toggle */}
            <div className="flex w-full justify-between gap-6 lg:w-auto">
              <Link to="/" aria-label="home" className="flex items-center gap-2.5">
                <SignetMark className="text-nordic-accent" size={28} />
                <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  Signet
                </span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
                className="relative z-20 block cursor-pointer p-2 lg:hidden text-nordic-text-secondary hover:text-nordic-text"
              >
                {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>

            {/* Desktop Centered Nav */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors rounded-none hover:bg-nordic-surface-hover"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu & Actions */}
            <div
              className={cn(
                "bg-nordic-surface data-[state=active]:block lg:data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-6 rounded-none border border-nordic-border p-6 shadow-nordic-md md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
              )}
            >
              {/* Mobile Links */}
              <div className="lg:hidden w-full">
                <ul className="space-y-4 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="block font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 lg:w-fit lg:items-center">
                <div className="w-full sm:w-auto">
                  <Link
                    to="/login"
                    className="nordic-btn-ghost text-sm w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
                <div className="w-full sm:w-auto">
                  <Link
                    to="/dashboard"
                    className="nordic-btn-primary text-sm w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
