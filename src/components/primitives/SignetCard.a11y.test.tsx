import 'vitest-axe/extend-expect';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { SignetCard } from './SignetCard';

expect.extend(matchers);

describe('SignetCard Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <SignetCard>
        <h2>Card Title</h2>
        <p>Card Content</p>
      </SignetCard>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
