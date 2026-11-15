"use server";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import { ForgotPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { issueSecurityToken } from "@/lib/auth-secure/tokens";
import { consumeSecurityRateLimit } from "@/lib/auth-secure/security-rate-limit";
import { sendPasswordResetEmail } from "@/lib/mail";
export const forgotPassword=async(values)=>{await requireTrustedMutationOrigin();const parsed=ForgotPasswordSchema.safeParse(values);if(!parsed.success)return{success:"If that account exists, a reset link has been sent."};const email=parsed.data.email.trim().toLowerCase();const allowed=await consumeSecurityRateLimit({scope:"password-reset",identity:email,windowMs:3600000,maxAttempts:3,blockMs:3600000});if(!allowed)return{success:"If that account exists, a reset link has been sent."};const user=await db.users.findUnique({where:{email}});if(user&&!user.isDeleted&&user.status==="ACTIVE"){const token=await issueSecurityToken({userId:user.id,email:user.email,type:"PASSWORD_RESET"});await sendPasswordResetEmail({email:user.email,token:token.raw});}return{success:"If that account exists, a reset link has been sent."};};
