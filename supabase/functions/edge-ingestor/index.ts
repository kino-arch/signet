import { serve } from "https://deno.land/std@0.192.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"
import { DatacoreSchema } from "../_shared/types/datacore.ts"

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { rawText } = await req.json()
    if (!rawText) throw new Error("Missing rawText payload")

    // Security Protocol: Require Supabase JWT
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error("Missing authorization header")

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    })
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error("Unauthorized request")

    // Invoke Nvidia NIM API
    const NVIDIA_API_KEY = Deno.env.get("NVIDIA_API_KEY")
    if (!NVIDIA_API_KEY) throw new Error("Server configuration error: Missing NVIDIA_API_KEY")

    const systemPrompt = `You are a strict data extraction AI for the Signet Platform. 
Your mission is to map the user's unstructured text perfectly into the required JSON schema. 
Do not include any other conversational text or markdown formatting. Output ONLY the raw JSON object.

Schema rules:
1. "executive_summary": Must be a high-impact, 3-sentence summary devoid of corporate filler words.
2. "mission_history.timeline": start_date format is YYYY-MM. end_date is YYYY-MM or 'PRESENT'.
3. "mission_history.metrics": Must be quantifiable, action-oriented bullet points starting with a strong verb.
4. "core_competencies": maximum 8 soft_skills, maximum 12 technical_stack items.

Required JSON Structure:
{
  "identity": { "full_name": "string", "professional_title": "string", "contact_matrix": { "email": "string", "phone": "string", "location": "string", "linkedin_url": "string" }, "executive_summary": "string" },
  "mission_history": [ { "company": "string", "role": "string", "timeline": { "start_date": "string", "end_date": "string" }, "location": "string", "metrics": ["string"] } ],
  "strategic_reserves": [ { "institution": "string", "degree": "string", "graduation_year": "string" } ],
  "core_competencies": { "soft_skills": ["string"], "technical_stack": ["string"] }
}`

    console.log(`[ TELEMETRY ] Initiating Nvidia NIM Ingestor for user ${user.id}...`)

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Unstructured Text:\n\n${rawText}` }
        ],
        temperature: 0.1,
        max_tokens: 3000,
        response_format: { type: "json_object" }
      })
    })

    if (!response.ok) {
      console.error(`[ ERROR ] Nvidia API Failed: ${response.status} ${response.statusText}`)
      throw new Error(`NVIDIA API Error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    
    // Parse and strictly validate with Zod
    const parsedJson = JSON.parse(content)
    const validatedData = DatacoreSchema.parse(parsedJson)

    console.log(`[ TELEMETRY ] Datacore extraction successful. Returning validated schema.`)

    return new Response(JSON.stringify(validatedData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error(`[ ERROR ] Edge-Ingestor Execution Failed:`, error)
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
