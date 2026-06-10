import { supabase } from "@/lib/supabase"

export interface SlateContext {
  fieldId: string;
  currentValue: string;
  fullResumeContext?: unknown;
}

export interface CopilotIntent {
  gap: 'missing_quantifier' | 'weak_verb' | 'passive_voice' | 'missing_context' | 'none';
  suggestion: string | null;
}

export const copilotEngine = {
  observe: async (context: SlateContext): Promise<CopilotIntent> => {
    if (!context.currentValue || context.currentValue.length < 10) {
      return { gap: 'none', suggestion: null };
    }

    try {
      // Use the Supabase SDK to get the session token — reliable across v2 key formats.
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token ?? ""

      const response = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ context }),
      });

      if (!response.ok) {
        return { gap: 'none', suggestion: null };
      }

      const result = await response.json();
      return result as CopilotIntent;
    } catch (e) {
      // Copilot failures are non-critical — fail silently so the editor still works.
      return { gap: 'none', suggestion: null };
    }
  }
};

