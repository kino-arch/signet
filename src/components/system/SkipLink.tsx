

export const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded"
    style={{
      backgroundColor: 'var(--theme-bg-end)',
      color: 'var(--signet-glow)',
      boxShadow: '0 0 0 2px var(--signet-glow)'
    }}
  >
    Skip to main content
  </a>
)
