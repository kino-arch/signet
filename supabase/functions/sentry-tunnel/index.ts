import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SENTRY_HOST = "o4511482474201088.ingest.de.sentry.io";
const SENTRY_PROJECT_ID = "4511482493206608";

Deno.serve(async (req) => {
  // Add basic CORS headers for browser requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const envelopeBytes = await req.arrayBuffer();
    const envelope = new TextDecoder().decode(envelopeBytes);
    
    // The envelope consists of pieces separated by newlines
    const piece = envelope.split("\n")[0];
    const header = JSON.parse(piece);
    
    const dsn = new URL(header["dsn"]);
    const project_id = dsn.pathname?.replace("/", "");
    
    // Validate DSN and Project ID to prevent abuse
    if (dsn.hostname !== SENTRY_HOST || project_id !== SENTRY_PROJECT_ID) {
      console.error(`Invalid Sentry project or host. Received host: ${dsn.hostname}, project: ${project_id}`);
      throw new Error("Invalid Sentry project or host");
    }

    // Forward to Sentry
    const upstream_sentry_url = `https://${SENTRY_HOST}/api/${project_id}/envelope/`;
    
    const sentryResponse = await fetch(upstream_sentry_url, {
      method: "POST",
      body: envelopeBytes,
    });

    return new Response(JSON.stringify({ status: "forwarded" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: sentryResponse.status,
    });
  } catch (e: any) {
    console.error("Sentry tunnel error:", e);
    return new Response(JSON.stringify({ error: e.message || "Tunnel failed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
