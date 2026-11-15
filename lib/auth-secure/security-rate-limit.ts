import crypto from "node:crypto";
import { db } from "@/lib/db";
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
export async function consumeSecurityRateLimit({ scope, identity, windowMs, maxAttempts, blockMs }) {
  const key = digest(`${scope}|${String(identity).toLowerCase()}`); const now = new Date();
  const bucket = await db.securityRateLimit.findUnique({ where: { key } });
  if (bucket?.blockedUntil && bucket.blockedUntil > now) return false;
  if (!bucket || now.getTime() - bucket.windowStartedAt.getTime() >= windowMs) {
    await db.securityRateLimit.upsert({ where:{key}, update:{count:1,windowStartedAt:now,blockedUntil:null,scope}, create:{key,scope,count:1,windowStartedAt:now} }); return true;
  }
  const count = bucket.count + 1;
  await db.securityRateLimit.update({ where:{key}, data:{count,blockedUntil:count > maxAttempts ? new Date(now.getTime()+blockMs) : null} });
  return count <= maxAttempts;
}
export async function clearSecurityRateLimit(scope, identity) { await db.securityRateLimit.deleteMany({ where: { key: digest(`${scope}|${String(identity).toLowerCase()}`) } }); }
