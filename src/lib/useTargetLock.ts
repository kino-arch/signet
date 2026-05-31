import { useState } from 'react';
import { FunctionsFetchError, FunctionsRelayError, FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useForgeStore } from '../store/useForgeStore';

export type TargetLockStatus = 'idle' | 'scanning' | 'analyzing' | 'complete' | 'error';

export interface CompanyIntel {
  company: {
    name: string;
    description: string;
    industry: string;
    culture_signals: string[];
    recent_news?: string[];
  };
  job: {
    title: string;
    description: string;
    requirements: string[];
    detected_keywords: string[];
  };
  interview_insights: string[];
}

export interface TargetLockBriefing {
  company_dna: {
    personality: string;
    tone_recommendation: string;
    culture_keywords: string[];
    avoid_terms: string[];
  };
  resume_strategy: {
    summary_directive: string;
    summary_draft: string;
    experience_framing: string;
    skills_priority: string[];
    skills_to_add: string[];
    keyword_injection_targets: string[];
    metrics_emphasis: string;
  };
  advantage_cards: {
    title: string;
    insight: string;
    action: string;
  }[];
  fit_radar: {
    technical_match: number;
    culture_alignment: number;
    experience_level: number;
    industry_relevance: number;
    keyword_coverage: number;
  };
  interview_hooks: {
    likely_questions: string[];
    talking_points: string[];
    company_challenges_to_reference: string[];
  };
}

// ─── Retry helper ─────────────────────────────────────────────────────────────
// FunctionsFetchError is a transient network-level error (CORS preflight race,
// Cloudflare 502, etc.). We retry up to 3 times with exponential backoff.
async function invokeWithRetry(
  fnName: string,
  body: Record<string, unknown>,
  maxRetries = 3
): Promise<{ data: any; error: any }> {
  let lastError: any = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0) {
      // Exponential backoff: 800ms, 1600ms
      await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt - 1)));
    }

    const result = await supabase.functions.invoke(fnName, { body });

    // Only retry on fetch-level (network/CORS) errors — not on HTTP errors
    // from the function itself, which are final.
    if (result.error instanceof FunctionsFetchError) {
      lastError = result.error;
      console.warn(`[Target Lock] Attempt ${attempt + 1}/${maxRetries} — FunctionsFetchError, retrying…`, result.error.message);
      continue;
    }

    return result;
  }

  // All retries exhausted
  return { data: null, error: lastError };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTargetLock() {
  const [status, setStatus] = useState<TargetLockStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [error, setError] = useState<string | null>(null);

  const setBriefing = useForgeStore((state) => state.setTargetLockBriefing);
  const setCompany = useForgeStore((state) => state.setTargetLockCompany);

  const activateTargetLock = async (companyName: string, jobTitle?: string, autoDeploy: boolean = false) => {
    setStatus('scanning');
    setError(null);
    setProgress(10);
    setProgressLabel('ESTABLISHING SECURE LINK...');

    // Animate progress phases while waiting for the edge function
    const phases = [
      { progress: 30, label: 'SCANNING COMPANY REGISTRY...' },
      { progress: 55, label: 'ANALYZING CULTURE SIGNALS...' },
      { progress: 72, label: 'BUILDING STRATEGY MATRIX...' },
    ];
    let phaseIndex = 0;
    const progressInterval = setInterval(() => {
      if (phaseIndex < phases.length) {
        const phase = phases[phaseIndex];
        setProgress(phase.progress);
        setProgressLabel(phase.label);
        if (phase.progress >= 55) setStatus('analyzing');
        phaseIndex++;
      }
    }, 1800);

    try {
      const { data, error: invokeError } = await invokeWithRetry(
        'target-lock',
        { companyName, jobTitle }
      );

      clearInterval(progressInterval);

      // ── Error discrimination ───────────────────────────────────────────────
      if (invokeError) {
        if (invokeError instanceof FunctionsFetchError) {
          // Network-level failure (CORS, DNS, connection refused) — after retries
          throw new Error(
            'Unable to reach the Target Lock service. Please check your network connection and try again.'
          );
        } else if (invokeError instanceof FunctionsRelayError) {
          // Supabase relay / CDN issue
          throw new Error(
            'The Target Lock service is temporarily unavailable. Please try again in a moment.'
          );
        } else if (invokeError instanceof FunctionsHttpError) {
          // The edge function returned an HTTP error — extract its message
          let message = invokeError.message;
          try {
            const body = await invokeError.context.json();
            if (body?.error) message = body.error;
          } catch {
            // ignore JSON parse failure on error body
          }
          throw new Error(message);
        } else {
          // Unknown error type
          throw new Error(invokeError.message || 'An unexpected error occurred.');
        }
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setProgress(100);
      setProgressLabel('TARGET ACQUIRED');
      setStatus('complete');
      setBriefing(data.briefing);
      setCompany(companyName, jobTitle);

      if (autoDeploy) {
        return { ...data, autoDeployed: true };
      }

      return data;
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error('[Target Lock] Final error:', err);
      setStatus('error');
      setError(err.message || 'Failed to engage Target Lock. Please try again.');
    }
  };

  const reset = () => {
    setStatus('idle');
    setProgress(0);
    setProgressLabel('');
    setError(null);
  };

  return { status, progress, progressLabel, error, activateTargetLock, reset };
}
