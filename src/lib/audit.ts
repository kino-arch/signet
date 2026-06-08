import { supabaseAdmin } from "@/lib/supabaseAdmin"

export interface AuditParams {
  userId: string
  action: string
  resourceType: string
  resourceId: string
  ipAddress?: string | null
  userAgent?: string | null
  metadata?: Record<string, unknown>
}

export async function logAuditEvent(params: AuditParams): Promise<void> {
  const { error } = await supabaseAdmin.from("audit_logs").insert({
    user_id: params.userId,
    action: params.action,
    resource_type: params.resourceType,
    resource_id: params.resourceId,
    ip_address: params.ipAddress,
    user_agent: params.userAgent,
    metadata: params.metadata ?? {},
  })

  if (error) {
    console.error("[AUDIT] Failed to write audit log:", error)
  }
}
