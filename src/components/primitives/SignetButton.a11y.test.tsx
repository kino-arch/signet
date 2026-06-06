import 'vitest-axe/extend-expect';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { SignetButton } from './SignetButton';

expect.extend(matchers);

describe('SignetButton Accessibility', () => {
  it('should have no accessibility violations (default)', async () => {
    const { container } = render(<SignetButton>Click me</SignetButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (loading)', async () => {
    const { container } = render(<SignetButton isLoading>Click me</SignetButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (disabled)', async () => {
    const { container } = render(<SignetButton disabled>Click me</SignetButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
