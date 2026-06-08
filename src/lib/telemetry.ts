// Simple telemetry wrapper to track interactions in A/B testing
export const telemetry = {
  track: (eventName: string, properties?: Record<string, unknown>) => {
    // In a real app, send to PostHog/Mixpanel/Amplitude
    console.log(`[Telemetry] Tracked event: ${eventName}`, properties);
    
    if (typeof window !== 'undefined' && (window as { datadogRum?: { addAction: (e: string, p?: Record<string, unknown>) => void } }).datadogRum) {
      (window as { datadogRum?: { addAction: (e: string, p?: Record<string, unknown>) => void } }).datadogRum!.addAction(eventName, properties);
    }
  },
  
  error: (errorName: string, error: Error) => {
    console.error(`[Telemetry] Error tracked: ${errorName}`, error);
  }
};
