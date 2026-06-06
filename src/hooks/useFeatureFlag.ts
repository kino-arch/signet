import { useState, useEffect } from 'react';

// Stub for a feature flag provider (LaunchDarkly, Statsig, custom DB, etc.)
// In a real app this would connect to a context or external service
export const useFeatureFlag = (flagName: string) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // For Phase 2 of Constellation, we will default the NEW_EDITOR_UX to 50% rollout,
    // or respect a local storage override for testing.
    const override = localStorage.getItem(`ff_${flagName}`);
    if (override !== null) {
      setIsEnabled(override === 'true');
      return;
    }

    // Default basic 50/50 rollout logic based on random
    // In production, this would be based on user ID hashing
    const roll = Math.random() > 0.5;
    setIsEnabled(roll);
  }, [flagName]);

  return isEnabled;
};
