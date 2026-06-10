import { useState, useEffect } from "react";

type ShortcutActions = {
  navigateTo: (stepId: number) => void;
  toggleSidebar: () => void;
  openCommandPalette: () => void;
};

export function useEditorShortcuts({
  navigateTo,
  toggleSidebar,
  openCommandPalette,
}: ShortcutActions) {
  const [pendingG, setPendingG] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "g" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setPendingG(true);
        setTimeout(() => setPendingG(false), 1000);
        return;
      }

      if (pendingG) {
        switch (e.key) {
          case "p":
            navigateTo(1); // Personal
            break;
          case "e":
            navigateTo(2); // Experience
            break;
          case "d":
            navigateTo(3); // Education
            break;
          case "s":
            navigateTo(4); // Design
            break;
        }
        setPendingG(false);
        return;
      }

      // Cmd/Ctrl + .
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }

      // Cmd/Ctrl + k
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openCommandPalette();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pendingG, navigateTo, toggleSidebar, openCommandPalette]);

  return { pendingG };
}
