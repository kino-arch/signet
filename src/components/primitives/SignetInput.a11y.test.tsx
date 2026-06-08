import 'vitest-axe/extend-expect';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import { SignetInput } from './SignetInput';

expect.extend(matchers);

describe('SignetInput Accessibility', () => {
  it('should have no accessibility violations (default)', async () => {
    const { container } = render(<SignetInput label="Username" id="username" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with error)', async () => {
    const { container } = render(<SignetInput label="Username" error="Username is required" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with helper text)', async () => {
    const { container } = render(<SignetInput label="Username" helperText="Enter your preferred username" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
