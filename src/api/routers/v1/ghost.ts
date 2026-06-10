import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { generateObject } from "ai";
import { aiGateway } from "@/lib/ai-gateway";
import { BulletSchema, JobTailorResponseSchema } from "@/lib/ghost-schema";

const ghostApi = new Hono();

// Add CORS to allow headless access from external platforms
ghostApi.use("*", cors({
  origin: "*",
  allowMethods: ["POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}));

// Basic API Key Middleware for external extensions
ghostApi.use("*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  const expectedKey = import.meta.env.VITE_GHOST_API_KEY || "dev-key";
  
  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== expectedKey) {
    return c.json({ success: false, error: "Unauthorized. Invalid Ghost API Key." }, 401);
  }
  
  await next();
});

/**
 * Headless endpoint to reforge a resume bullet.
 * Uses strict Zod schema extraction via generateObject for maximum integration safety.
 */
ghostApi.post("/reforge", async (c) => {
  const body = await c.req.json();
  const { originalBullet, targetRole } = body;

  const ReforgeRequestSchema = z.object({
    improvedBullet: BulletSchema,
    confidenceScore: z.number(),
    suggestedMetrics: z.array(z.string())
  });

  try {
    const { object } = await generateObject({
      model: aiGateway.routeLanguageModel({ latencySLO: 'fast', costBudget: 'premium' }),
      schema: ReforgeRequestSchema,
      system: `You are a headless ATS optimization engine. Your goal is to reforge the provided resume bullet to maximize its impact for the target role: ${targetRole}. Return structured data only.`,
      prompt: `Original bullet: ${originalBullet}`
    });

    return c.json({ success: true, data: object });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * Headless endpoint to optimize a full resume against a job description.
 */
ghostApi.post("/optimize", async (c) => {
  const body = await c.req.json();
  const { resumeText, jobDescription } = body;

  try {
    const { object } = await generateObject({
      model: aiGateway.routeLanguageModel({ latencySLO: 'standard' }),
      schema: JobTailorResponseSchema,
      system: `You are an ATS matching engine. Compare the user's resume against the provided Job Description. Identify missing keywords, weak bullets, and output structured gaps.`,
      prompt: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`
    });

    return c.json({ success: true, data: object });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return c.json({ success: false, error: error.message }, 500);
  }
});

export { ghostApi };
