import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AIAssistButtonProps {
  onGenerate: () => Promise<string>;
  onResult: (text: string) => void;
}

export function AIAssistButton({ onGenerate, onResult }: AIAssistButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const text = await onGenerate();
      onResult(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg bg-nordic-surface-hover px-3 py-1.5 text-xs font-medium text-nordic-text-secondary transition hover:bg-nordic-border disabled:opacity-50"
    >
      <Sparkles className={`h-3.5 w-3.5 ${loading ? "animate-pulse text-nordic-text-tertiary" : "text-nordic-accent"}`} />
      {loading ? "Enhancing..." : "Enhance with AI"}
    </button>
  );
}
