/**
 * Shared AI Client — Cascading Model Chain
 *
 * Provides a unified interface for all Signet edge functions to call LLMs.
 * Attempts providers in order: NVIDIA NIM → Google Gemini → OpenAI.
 * Each call tries the next provider on 429/500/502/503/timeout.
 *
 * Usage:
 *   import { callAI } from "../_shared/ai-client.ts";
 *   const result = await callAI({ system: "...", user: "...", stream: false });
 */

// ─── Provider Definitions ────────────────────────────────────────────────────

interface AIProvider {
  name: string
  envKey: string
  endpoint: string
  model: string
  buildHeaders: (apiKey: string) => Record<string, string>
  buildBody: (params: AICallParams, model: string) => Record<string, unknown>
  parseResponse: (data: unknown) => string
}

interface AICallParams {
  system: string
  user: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  responseFormat?: "json" | "text"
}

interface AIResult {
  content: string
  modelUsed: string
  providerUsed: string
  latencyMs: number
}

const PROVIDERS: AIProvider[] = [
  // ── Primary: NVIDIA NIM ────────────────────────────────────────────────
  {
    name: "nvidia",
    envKey: "NVIDIA_API_KEY",
    endpoint: "https://integrate.api.nvidia.com/v1/chat/completions",
    model: "mistralai/mistral-large-3-675b-instruct-2512",
    buildHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    }),
    buildBody: (params, model) => ({
      model,
      messages: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
      temperature: params.temperature ?? 0.1,
      max_tokens: params.maxTokens ?? 2048,
      stream: params.stream ?? false,
      ...(params.responseFormat === "json" ? {} : {}),
    }),
    parseResponse: (data: any) => data.choices[0].message.content,
  },

  // ── Fallback: Google Gemini ────────────────────────────────────────────
  {
    name: "gemini",
    envKey: "GEMINI_API_KEY",
    endpoint:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    model: "gemini-2.5-flash",
    buildHeaders: (_key) => ({
      "Content-Type": "application/json",
    }),
    buildBody: (params, _model) => ({
      systemInstruction: { parts: [{ text: params.system }] },
      contents: [{ role: "user", parts: [{ text: params.user }] }],
      generationConfig: {
        temperature: params.temperature ?? 0.1,
        maxOutputTokens: params.maxTokens ?? 2048,
        ...(params.responseFormat === "json"
          ? { responseMimeType: "application/json" }
          : {}),
      },
    }),
    parseResponse: (data: any) => data.candidates[0].content.parts[0].text,
  },

  // ── Tertiary: OpenAI ───────────────────────────────────────────────────
  {
    name: "openai",
    envKey: "OPENAI_API_KEY",
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    buildHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    }),
    buildBody: (params, model) => ({
      model,
      messages: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
      temperature: params.temperature ?? 0.1,
      max_tokens: params.maxTokens ?? 2048,
      stream: params.stream ?? false,
      ...(params.responseFormat === "json"
        ? { response_format: { type: "json_object" } }
        : {}),
    }),
    parseResponse: (data: any) => data.choices[0].message.content,
  },
]

// ─── Retryable status codes ──────────────────────────────────────────────────
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504])
const TIMEOUT_MS = 30_000

// ─── Main Entry Point ────────────────────────────────────────────────────────

/**
 * Call the AI model chain with automatic cascading fallback.
 * Returns the first successful response from any provider.
 *
 * @throws Error if ALL providers fail.
 */
export async function callAI(params: AICallParams): Promise<AIResult> {
  const errors: Array<{ provider: string; error: string }> = []

  for (const provider of PROVIDERS) {
    const apiKey = Deno.env.get(provider.envKey)
    if (!apiKey) {
      errors.push({
        provider: provider.name,
        error: `${provider.envKey} not configured`,
      })
      continue
    }

    const start = performance.now()

    try {
      const endpoint =
        provider.name === "gemini"
          ? `${provider.endpoint}?key=${apiKey}`
          : provider.endpoint

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

      const response = await fetch(endpoint, {
        method: "POST",
        headers: provider.buildHeaders(apiKey),
        body: JSON.stringify(provider.buildBody(params, provider.model)),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        if (RETRYABLE_STATUSES.has(response.status)) {
          errors.push({
            provider: provider.name,
            error: `HTTP ${response.status}: ${errorText.slice(0, 200)}`,
          })
          continue // Try next provider
        }
        // Non-retryable error (400, 401, 403) — don't cascade, it's a user/config issue
        throw new Error(
          `${provider.name} returned ${response.status}: ${errorText.slice(0, 200)}`
        )
      }

      // Handle streaming responses — pass through raw body
      if (params.stream) {
        return {
          content: "", // Streaming — content is in the raw response body
          modelUsed: provider.model,
          providerUsed: provider.name,
          latencyMs: performance.now() - start,
        }
      }

      const data = await response.json()
      const content = provider.parseResponse(data)

      return {
        content,
        modelUsed: provider.model,
        providerUsed: provider.name,
        latencyMs: Math.round(performance.now() - start),
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        errors.push({
          provider: provider.name,
          error: "Request timed out after 30s",
        })
        continue
      }
      // If it's a non-retryable error we threw above, rethrow
      if (err instanceof Error && !err.message.includes("timed out")) {
        // Check if it's a cascading error or a hard stop
        const isRetryable = errors.length > 0
        if (!isRetryable) throw err
      }
      errors.push({
        provider: provider.name,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  // All providers exhausted
  throw new Error(
    `All AI providers failed:\n${errors
      .map((e) => `  [${e.provider}] ${e.error}`)
      .join("\n")}`
  )
}

/**
 * Stream-aware variant that returns the raw Response for SSE proxying.
 * Used by reforge-datacore which needs to pipe SSE tokens to the client.
 */
export async function callAIStream(
  params: Omit<AICallParams, "stream">
): Promise<{
  response: Response
  modelUsed: string
  providerUsed: string
}> {
  const errors: Array<{ provider: string; error: string }> = []

  for (const provider of PROVIDERS) {
    // Skip Gemini for streaming — its API uses a different streaming format
    if (provider.name === "gemini") continue

    const apiKey = Deno.env.get(provider.envKey)
    if (!apiKey) {
      errors.push({
        provider: provider.name,
        error: `${provider.envKey} not configured`,
      })
      continue
    }

    try {
      const response = await fetch(provider.endpoint, {
        method: "POST",
        headers: provider.buildHeaders(apiKey),
        body: JSON.stringify(
          provider.buildBody({ ...params, stream: true }, provider.model)
        ),
      })

      if (!response.ok) {
        const errorText = await response.text()
        if (RETRYABLE_STATUSES.has(response.status)) {
          errors.push({
            provider: provider.name,
            error: `HTTP ${response.status}: ${errorText.slice(0, 200)}`,
          })
          continue
        }
        throw new Error(
          `${provider.name} returned ${response.status}: ${errorText.slice(0, 200)}`
        )
      }

      return {
        response,
        modelUsed: provider.model,
        providerUsed: provider.name,
      }
    } catch (err) {
      errors.push({
        provider: provider.name,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  throw new Error(
    `All streaming AI providers failed:\n${errors
      .map((e) => `  [${e.provider}] ${e.error}`)
      .join("\n")}`
  )
}
