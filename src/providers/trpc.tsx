import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink, createTRPCProxyClient } from "@trpc/client"
import React, { useState } from "react"
import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "../api/router"
import { supabase } from "../lib/supabase"

export const trpc = createTRPCReact<AppRouter>()

// Vanilla client for use outside of React (e.g. Zustand)
export const vanillaTrpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
      headers: async () => {
        const { data } = await supabase.auth.getSession()
        return {
          Authorization: data?.session?.access_token
            ? `Bearer ${data.session.access_token}`
            : "",
        }
      },
    }),
  ],
})

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/trpc",
          headers: async () => {
            const { data } = await supabase.auth.getSession()
            return {
              Authorization: data?.session?.access_token
                ? `Bearer ${data.session.access_token}`
                : "",
            }
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
