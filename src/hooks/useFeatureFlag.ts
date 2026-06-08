import { useState } from 'react';

// Stub for a feature flag provider (LaunchDarkly, Statsig, custom DB, etc.)
// In a real app this would connect to a context or external service
export const useFeatureFlag = (flagName: string) => {
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    // For Phase 2 of Constellation, we will default the NEW_EDITOR_UX to 50% rollout,
    // or respect a local storage override for testing.
    const override = localStorage.getItem(`ff_${flagName}`);
    if (override !== null) {
      return override === 'true';
    }

    // Default basic 50/50 rollout logic based on random
    // In production, this would be based on user ID hashing
    return Math.random() > 0.5;
  });

  return isEnabled;
};
