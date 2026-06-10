import { createMistral } from '@ai-sdk/mistral'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import type { LanguageModel, EmbeddingModel } from 'ai'

function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv[key]) {
      return metaEnv[key];
    }
  } catch (e) {}
  return undefined;
}

export const mistral = createMistral({ apiKey: getEnv('VITE_MISTRAL_API_KEY') || getEnv('MISTRAL_API_KEY') || 'dummy' })
export const gemini  = createGoogleGenerativeAI({ apiKey: getEnv('VITE_GEMINI_API_KEY') || getEnv('GEMINI_API_KEY') || getEnv('GOOGLE_API_KEY') || 'dummy' })
export const openai = createOpenAI({ apiKey: getEnv('VITE_OPENAI_API_KEY') || getEnv('OPENAI_API_KEY') || 'dummy' })

export type AITaskType = 'stream' | 'embed' | 'generateObject' | 'transcribe'
export type ComplianceLevel = 'global' | 'EU'
export type CostBudget = 'premium' | 'minimal'
export type LatencySLO = 'fast' | 'standard'

export interface AITask {
  type: AITaskType
  compliance?: ComplianceLevel
  costBudget?: CostBudget
  latencySLO?: LatencySLO
  pii?: boolean
  batchSize?: number
}

export const aiGateway = {
  route: (task: AITask) => {
    // 1. Compliance Routing (e.g. EU data stays in EU)
    if (task.compliance === 'EU' || task.pii) {
      return mistral('mistral-large-latest')
    }
    
    // 2. Transcription
    if (task.type === 'transcribe') {
      return openai.transcription('whisper-1')
    }

    // 3. Embeddings
    if (task.type === 'embed') {
      return mistral.textEmbeddingModel('mistral-embed')
    }

    // 4. Cost/Latency Routing for Stream/Object
    if (task.latencySLO === 'fast' && task.costBudget !== 'minimal') {
      return openai('gpt-4o-mini')
    }

    if (task.costBudget === 'minimal') {
      return mistral('mistral-large-latest')
    }

    // Default Fallback Stack
    return mistral('mistral-large-latest')
  },

  /**
   * Strict variant that guarantees a LanguageModel return type.
   * Use this anywhere generateText / generateObject / streamText is called.
   */
  routeLanguageModel: (task: Omit<AITask, 'type'>): LanguageModel => {
    if (task.compliance === 'EU' || task.pii) {
      return mistral('mistral-large-latest') as LanguageModel
    }
    if (task.latencySLO === 'fast' && task.costBudget !== 'minimal') {
      return openai('gpt-4o-mini') as LanguageModel
    }
    if (task.costBudget === 'minimal') {
      return mistral('mistral-large-latest') as LanguageModel
    }
    return mistral('mistral-large-latest') as LanguageModel
  },

  /**
   * Strict variant that guarantees an EmbeddingModel return type.
   * Use this anywhere embedMany / embed is called.
   */
  routeEmbeddingModel: (task?: Pick<AITask, 'compliance' | 'pii'>): EmbeddingModel => {
    if (task?.compliance === 'EU' || task?.pii) {
      return mistral.textEmbeddingModel('mistral-embed') as EmbeddingModel
    }
    return mistral.textEmbeddingModel('mistral-embed') as EmbeddingModel
  }
}
