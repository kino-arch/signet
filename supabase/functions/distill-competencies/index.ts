import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { rawText } = await req.json();

    if (!rawText) {
      throw new Error("Missing rawText");
    }

    const nvidiaApiKey = Deno.env.get("NVIDIA_API_KEY");
    if (!nvidiaApiKey) {
      throw new Error("Missing NVIDIA_API_KEY");
    }

    const systemPrompt = `You are an ATS (Applicant Tracking System) keyword extraction engine. 
The user will provide a raw, unstructured description of their skills, tools, and competencies.
Your job is to extract these into a JSON array of concise, industry-standard resume keywords.
Do NOT include explanations. Return ONLY a JSON array of strings.
Example output: ["React", "Node.js", "Project Management", "Agile Methodologies"]`;

    const nvidiaResponse = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${nvidiaApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-large-3-675b-instruct-2512",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: rawText },
        ],
        temperature: 0.1,
        max_tokens: 1024,
        response_format: { type: "json_object" } // Using standard completion since we just want a list, but wait, mistral-large-3 might not support json_object in nvidia NIM. Let's just ask for JSON array.
      }),
    });

    if (!nvidiaResponse.ok) {
      const errorText = await nvidiaResponse.text();
      console.error("Nvidia NIM error:", errorText);
      throw new Error(`AI engine error: ${nvidiaResponse.status}`);
    }

    const data = await nvidiaResponse.json();
    let content = data.choices[0].message.content.trim();
    
    // Strip markdown code blocks if present
    if (content.startsWith("\`\`\`json")) {
      content = content.replace(/\`\`\`json\n?/, "").replace(/\`\`\`$/, "").trim();
    } else if (content.startsWith("\`\`\`")) {
      content = content.replace(/\`\`\`\n?/, "").replace(/\`\`\`$/, "").trim();
    }

    let keywords: string[] = [];
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        keywords = parsed;
      } else if (parsed.keywords && Array.isArray(parsed.keywords)) {
        keywords = parsed.keywords;
      }
    } catch (e) {
      console.error("Failed to parse JSON from AI:", content);
      throw new Error("AI returned invalid format");
    }

    return new Response(JSON.stringify({ keywords }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
