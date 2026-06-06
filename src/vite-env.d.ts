/// <reference types="vite/client" />
/// <reference types="vitest" />

import 'vitest';
import type { AxeResults } from 'vitest-axe';

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): Promise<void>;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): Promise<void>;
  }
}
