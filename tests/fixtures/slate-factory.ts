/**
 * Shared test fixture factory — used by BOTH Vitest unit tests and Playwright E2E specs.
 * Single source of truth: import from here instead of duplicating test data per suite.
 *
 * Contract: never import application runtime code here — keep this pure data.
 */

export interface MockSlate {
  id: string
  title: string
  targetRole: string
  targetCompany: string
  humanScore: number
  atsScore: number
  createdAt: string
  updatedAt: string
}

export const createMockSlate = (overrides?: Partial<MockSlate>): MockSlate => ({
  id: crypto.randomUUID(),
  title: 'Untitled Slate',
  targetRole: '',
  targetCompany: '',
  humanScore: 0,
  atsScore: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

export const createFilledSlate = (overrides?: Partial<MockSlate>): MockSlate =>
  createMockSlate({
    title: 'Senior Frontend Engineer @ Spotify',
    targetRole: 'Senior Frontend Engineer',
    targetCompany: 'Spotify',
    humanScore: 87,
    atsScore: 91,
    ...overrides,
  })
