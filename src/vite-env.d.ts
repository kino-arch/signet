/// <reference types="vite/client" />

// Ambient declarations for side-effect-only font imports that lack type definitions
declare module "@fontsource-variable/syne" {}
declare module "@fontsource-variable/schibsted-grotesk" {}
declare module "@fontsource-variable/onest" {}
declare module "@fontsource-variable/spline-sans-mono" {}



import 'vitest';

declare module 'vitest' {
  // Extends vitest's matcher interface with the custom axe accessibility assertion.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<R = unknown> {
    toHaveNoViolations(): Promise<void>;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): Promise<void>;
  }
}
