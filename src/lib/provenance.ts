import type { GhostBullet } from "./ghost-schema";

/**
 * Generates a SHA-256 hash for a bullet's contents to guarantee zero-trust provenance.
 * This ensures that if a bullet claims to be "user_verified" or "inferred", 
 * its exact text and attributes haven't been tampered with.
 */
export async function generateProvenanceHash(bullet: Omit<GhostBullet, 'provenanceHash'>): Promise<string> {
  const dataString = JSON.stringify({
    text: bullet.text,
    provenance: bullet.provenance,
    confidence: bullet.confidence,
    originalClaim: bullet.originalClaim
  });
  
  const msgBuffer = new TextEncoder().encode(dataString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Seals a GhostBullet by computing and appending its cryptographic hash.
 */
export async function sealBullet(bullet: Omit<GhostBullet, 'provenanceHash'>): Promise<GhostBullet> {
  const hash = await generateProvenanceHash(bullet);
  return {
    ...bullet,
    provenanceHash: hash
  };
}
