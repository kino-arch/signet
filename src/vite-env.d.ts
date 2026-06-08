/// <reference types="vite/client" />

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
