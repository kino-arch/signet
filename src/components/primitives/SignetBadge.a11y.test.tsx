import 'vitest-axe/extend-expect';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { SignetBadge } from './SignetBadge';

expect.extend(matchers);

describe('SignetBadge Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<SignetBadge>New</SignetBadge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
