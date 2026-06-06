import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const SENTRY_HOST = "o4511482474201088.ingest.de.sentry.io"
const SENTRY_PROJECT_ID = "4511482493206608"

Deno.serve(async (req) => {
  // Add basic CORS headers for browser requests
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  }

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    })
  }

  const origin = req.headers.get("origin")
  // Whitelist could be dynamic, for now we allow localhost and kino-arch domains
  if (
    origin &&
    !origin.includes("localhost") &&
    !origin.includes("kino-arch")
  ) {
    return new Response("Forbidden origin", {
      status: 403,
      headers: corsHeaders,
    })
  }

  const contentLength = parseInt(req.headers.get("content-length") || "0", 10)
  if (contentLength > 1024 * 1024) {
    // 1MB cap
    return new Response("Payload too large", {
      status: 413,
      headers: corsHeaders,
    })
  }

  try {
    const envelopeBytes = await req.arrayBuffer()
    const envelope = new TextDecoder().decode(envelopeBytes)

    // The envelope consists of pieces separated by newlines
    const piece = envelope.split("\n")[0]
    const header = JSON.parse(piece)

    const dsn = new URL(header["dsn"])
    const project_id = dsn.pathname?.replace("/", "")

    // Validate DSN and Project ID to prevent abuse
    if (dsn.hostname !== SENTRY_HOST || project_id !== SENTRY_PROJECT_ID) {
      console.error(
        `Invalid Sentry project or host. Received host: ${dsn.hostname}, project: ${project_id}`
      )
      throw new Error("Invalid Sentry project or host")
    }

    // Forward to Sentry
    const upstream_sentry_url = `https://${SENTRY_HOST}/api/${project_id}/envelope/`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const sentryResponse = await fetch(upstream_sentry_url, {
      method: "POST",
      body: envelopeBytes,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!sentryResponse.ok) {
      return new Response("Bad gateway", { status: 502, headers: corsHeaders })
    }

    return new Response(JSON.stringify({ status: "forwarded" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: sentryResponse.status,
    })
  } catch (e: unknown) {
    let safeMessage = "Tunnel failed"
    if (e instanceof Error) {
      safeMessage = e.name === "AbortError" ? "Gateway timeout" : e.message
    }
    const status = safeMessage === "Gateway timeout" ? 504 : 500

    console.error("Sentry tunnel error:", safeMessage)
    return new Response(JSON.stringify({ error: safeMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status,
    })
  }
})
