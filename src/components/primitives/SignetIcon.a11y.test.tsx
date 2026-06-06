import 'vitest-axe/extend-expect';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { SignetIcon } from './SignetIcon';

expect.extend(matchers);

describe('SignetIcon Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <button aria-label="Settings">
        <SignetIcon name="Settings" />
      </button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
