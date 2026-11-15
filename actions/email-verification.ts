"use server";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import { db } from "@/lib/db";
import { consumeSecurityToken } from "@/lib/auth-secure/tokens";
import { writeAudit } from "@/lib/auth-secure/audit";
export const emailVerification=async(token)=>{await requireTrustedMutationOrigin();const record=await consumeSecurityToken(token,"EMAIL_VERIFICATION");if(!record?.userId)return{error:"This verification link is invalid or has expired."};await db.users.update({where:{id:record.userId},data:{emailVerified:new Date()}});await writeAudit({userId:record.userId,action:"UPDATE",entity:"Users",entityId:record.userId,description:"Email address verified"});return{success:"Email verified!"};};
