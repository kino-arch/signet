import OpenAI from "openai"
import { config } from "dotenv"

// Load environment variables from .env.local
config({ path: ".env.local" })

const MOCK_AI = process.env.MOCK_AI === "true"

// Primary: Mistral API
const primaryClient = new OpenAI({
  baseURL: "https://api.mistral.ai/v1",
  apiKey: process.env.MISTRAL_API_KEY || "dummy",
})

// Secondary fallback: NVIDIA NIM
const fallbackClient = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.VITE_NVIDIA_API_KEY || "dummy",
})

interface AiOptions {
  userKey?: string
  temperature?: number
}

export const aiClient = {
  async getChatCompletionStream(
    systemPrompt: string,
    userPrompt: string,
    model = "mistral-large-latest",
    options?: AiOptions
  ) {
    const isMock = !options?.userKey && MOCK_AI
    if (isMock) {
      return this.getMockStream()
    }

    if (
      !options?.userKey &&
      !process.env.MISTRAL_API_KEY &&
      !process.env.VITE_NVIDIA_API_KEY
    ) {
      throw new Error(
        "Missing API Key. Please configure your API Keys in .env.local."
      )
    }

    // Attempt Mistral First
    try {
      const response = await primaryClient.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      })
      return response
    } catch (err) {
      console.warn("Mistral API failed, using NVIDIA NIM fallback:", err)
      // Fallback to NVIDIA NIM
      const response = await fallbackClient.chat.completions.create({
        model: "mistralai/mistral-large-3-675b-instruct-2512",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      })
      return response
    }
  },

  async getChatCompletionText(
    systemPrompt: string,
    userPrompt: string,
    model = "mistral-large-latest",
    options?: AiOptions
  ) {
    const isMock = !options?.userKey && MOCK_AI
    if (isMock) {
      return "This is a mock AI response for deterministic local development. It is fully humanized and ATS-optimized."
    }

    if (
      !options?.userKey &&
      !process.env.MISTRAL_API_KEY &&
      !process.env.VITE_NVIDIA_API_KEY
    ) {
      throw new Error(
        "Missing API Key. Please configure your API Keys in .env.local."
      )
    }

    try {
      const response = await primaryClient.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      })
      return response.choices[0]?.message?.content || ""
    } catch (err) {
      console.warn(
        "Mistral API failed for Text, using NVIDIA NIM fallback:",
        err
      )
      const response = await fallbackClient.chat.completions.create({
        model: "mistralai/mistral-large-3-675b-instruct-2512",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      })
      return response.choices[0]?.message?.content || ""
    }
  },

  async getChatCompletionJSON(
    systemPrompt: string,
    userPrompt: string,
    model = "mistral-large-latest",
    options?: AiOptions
  ) {
    const isMock = !options?.userKey && MOCK_AI
    if (isMock) {
      return this.getMockJSON()
    }

    if (
      !options?.userKey &&
      !process.env.MISTRAL_API_KEY &&
      !process.env.VITE_NVIDIA_API_KEY
    ) {
      throw new Error(
        "Missing API Key. Please configure your API Keys in .env.local."
      )
    }

    const req = {
      model,
      response_format: { type: "json_object" as const },
      messages: [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: userPrompt },
      ],
      ...(options?.temperature !== undefined && {
        temperature: options.temperature,
      }),
    }

    try {
      const res = await primaryClient.chat.completions.create(req)
      return JSON.parse(res.choices[0].message.content || "{}")
    } catch (err) {
      console.warn(
        "Mistral API failed for JSON, using NVIDIA NIM fallback:",
        err
      )
      const res = await fallbackClient.chat.completions.create({
        ...req,
        model: "mistralai/mistral-large-3-675b-instruct-2512",
        // Nvidia NIM might not officially support response_format for all models, but it's OpenAI compatible
      })
      return JSON.parse(res.choices[0].message.content || "{}")
    }
  },

  // Mock Generators
  async *getMockStream() {
    const mockContent =
      "This is a mock AI streaming response for deterministic local development."
    const words = mockContent.split(" ")

    for (const word of words) {
      yield {
        choices: [{ delta: { content: word + " " } }],
      }
      await new Promise((r) => setTimeout(r, 50))
    }
  },

  getMockJSON() {
    return {
      categories: [
        {
          name: "Frontend Development",
          keywords: ["React", "TypeScript", "Next.js", "TailwindCSS"],
        },
        {
          name: "Backend & APIs",
          keywords: ["Node.js", "SQL", "REST", "GraphQL"],
        },
        {
          name: "Tools & Practices",
          keywords: ["Git", "CI/CD", "Agile", "Code Review"],
        },
      ],
    }
  },
}
