const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

Deno.serve(async (req) => {
  // 1. Handle CORS preflight requests from the browser
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Extract standard Edge Runtime headers
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown'
  const country = req.headers.get('cf-ipcountry') || req.headers.get('x-vercel-ip-country') || 'Unknown'

  // 3. Return the encrypted datacore package to the client
  return new Response(
    JSON.stringify({ 
      ip_address: ip, 
      threat_origin: country,
      status: 'SECURE_UPLINK'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
})
