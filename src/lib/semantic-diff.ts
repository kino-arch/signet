import { embedMany } from "ai";
import { aiGateway } from "./ai-gateway";

/**
 * Computes cosine similarity between two numeric vectors.
 */
function cosineSimilarity(A: number[], B: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < A.length; i++) {
    dotProduct += A[i] * B[i];
    normA += A[i] * A[i];
    normB += B[i] * B[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Computes the semantic trajectory of a resume version update.
 * Vectorizes the previous text vs current text to quantify how much the 
 * underlying meaning has shifted (e.g. going from 'task-oriented' to 'impact-oriented').
 */
export async function computeSemanticTrajectory(previousText: string, currentText: string) {
  if (!previousText || !currentText) {
    return { similarity: 1, shift: 0 };
  }

  try {
    const { embeddings } = await embedMany({
      model: aiGateway.routeEmbeddingModel(),
      values: [previousText, currentText],
    });

    const [prevVec, currVec] = embeddings;
    const similarity = cosineSimilarity(prevVec, currVec);
    const shift = 1 - similarity; // 0 means identical meaning, 1 means completely orthogonal
    
    return { similarity, shift };
  } catch (error) {
    console.error("Failed to compute semantic trajectory:", error);
    return { similarity: 1, shift: 0 };
  }
}
