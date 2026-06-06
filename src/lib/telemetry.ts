// Simple telemetry wrapper to track interactions in A/B testing
export const telemetry = {
  track: (eventName: string, properties?: Record<string, any>) => {
    // In a real app, send to PostHog/Mixpanel/Amplitude
    console.log(`[Telemetry] Tracked event: ${eventName}`, properties);
    
    if (typeof window !== 'undefined' && (window as any).datadogRum) {
      (window as any).datadogRum.addAction(eventName, properties);
    }
  },
  
  error: (errorName: string, error: Error) => {
    console.error(`[Telemetry] Error tracked: ${errorName}`, error);
  }
};
