import type { Preview } from "@storybook/react-vite"
import React from "react"
import "../src/index.css"
import "@fontsource-variable/syne"
import "@fontsource-variable/schibsted-grotesk"
import "@fontsource-variable/onest"
import "@fontsource-variable/spline-sans-mono"
import { ThemeProvider } from "../src/components/theme-provider"
import { MotionConfig } from "framer-motion"
import { createMemoryRouter, RouterProvider } from "react-router-dom"

// Synchronously force dark mode before React renders to prevent CSS transition flashes
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: { width: '375px', height: '812px' },
  },
  tablet: {
    name: 'Tablet',
    styles: { width: '768px', height: '1024px' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '1280px', height: '900px' },
  },
  wide: {
    name: 'Wide',
    styles: { width: '1440px', height: '900px' },
  },
};

const withRouter = (Story: React.ComponentType) => {
  const router = createMemoryRouter([
    { path: "/", element: <Story /> },
    { path: "*", element: <Story /> },
  ], {
    initialEntries: ['/forge/content'] // Force deterministic route for active NavLinks
  });
  return <RouterProvider router={router} />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#020617" },
      ],
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: 'desktop',
    },
    a11y: {
      test: "error",
      config: {
        rules: [
          { id: 'color-contrast', enabled: true }
        ]
      }
    },
    chromatic: { delay: 500 },
  },
  decorators: [
    (Story) => (
      <MotionConfig reducedMotion="always">
        <ThemeProvider defaultTheme="dark">
          {withRouter(Story)}
        </ThemeProvider>
      </MotionConfig>
    ),
    (Story) => (
      <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-200 antialiased">
        <Story />
      </div>
    ),
  ],
}

export default preview
