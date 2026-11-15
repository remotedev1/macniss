"use server";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import { auth, signOut } from "@/auth";
import { revokeSession } from "@/lib/auth-secure/session-security";
import { writeAudit } from "@/lib/auth-secure/audit";
export const logout=async()=>{await requireTrustedMutationOrigin();const session=await auth();if(session?.user?.id&&session.user.sessionId){await revokeSession(session.user.id,session.user.sessionId);await writeAudit({userId:session.user.id,action:"LOGOUT",entity:"Session",entityId:session.user.sessionId,description:"User signed out"});}await signOut({redirectTo:"/auth/login"});};
