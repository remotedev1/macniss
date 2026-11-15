import { db } from "@/lib/db";
export async function writeAudit(input) {
  try { await db.auditLog.create({ data: { ...input, metadata: input.metadata ?? undefined } }); }
  catch (error) { console.error("Security audit write failed", error); }
}
