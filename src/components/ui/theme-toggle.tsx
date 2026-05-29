import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group/theme cursor-pointer rounded-full border border-border/60 bg-background/80 text-foreground/70 shadow-sm transition-all duration-300 hover:border-primary/40 hover:text-primary active:scale-95"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary transition-transform duration-500 group-hover/theme:rotate-90" />
      ) : (
        <Moon className="h-4 w-4 text-primary transition-transform duration-500 group-hover/theme:-rotate-12" />
      )}
    </Button>
  );
}
