"use server";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import { ResetPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { consumeSecurityToken } from "@/lib/auth-secure/tokens";
import { hashPassword } from "@/lib/auth-secure/password";
import { revokeAllSessions } from "@/lib/auth-secure/session-security";
import { writeAudit } from "@/lib/auth-secure/audit";
export const resetPassword=async(values,token)=>{await requireTrustedMutationOrigin();const parsed=ResetPasswordSchema.safeParse(values);if(!token||!parsed.success)return{error:parsed.error?.issues?.[0]?.message||"Invalid reset request."};const record=await consumeSecurityToken(token,"PASSWORD_RESET");if(!record?.userId)return{error:"This reset link is invalid or has expired."};await db.users.update({where:{id:record.userId},data:{password:await hashPassword(parsed.data.password),mustChangePassword:false,failedLoginAttempts:0,lockedUntil:null}});await revokeAllSessions(record.userId);await writeAudit({userId:record.userId,action:"PASSWORD_CHANGED",entity:"Users",entityId:record.userId,description:"Password reset completed; sessions revoked"});return{success:"Password updated. You can sign in now."};};
