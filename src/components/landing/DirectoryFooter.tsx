import { Link } from "react-router-dom";
import { SignetMark } from "@/components/nordic/SignetMark";

export function DirectoryFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-nordic-bg">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-y border-nordic-border py-8 md:flex-row md:py-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <SignetMark className="text-nordic-text" size={24} />
            <span className="text-lg font-semibold tracking-tight text-nordic-text">
              Signet
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a href="#features" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Features
            </a>
            <a href="#templates" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Pricing
            </a>
            <Link to="/login" className="text-sm font-medium text-nordic-text-secondary hover:text-nordic-text transition-colors">
              Log in
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row text-sm text-nordic-text-secondary">
          <div>&copy; {currentYear} Signet. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-nordic-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-nordic-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-nordic-text transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
