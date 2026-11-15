"use server";
import { auth, signOut } from "@/auth";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import { revokeAllSessions, revokeOtherSessions, revokeSession } from "@/lib/auth-secure/session-security";
import { writeAudit } from "@/lib/auth-secure/audit";
async function current(){const session=await auth();if(!session?.user?.id||session.user.invalidated)throw new Error("Authentication required");return session;}
export async function revokeSessionAction(formData){await requireTrustedMutationOrigin();const session=await current();const id=String(formData.get("sessionId")||"");if(!id)return;await revokeSession(session.user.id,id);await writeAudit({userId:session.user.id,action:"SESSION_REVOKED",entity:"Session",entityId:id,description:"User revoked an active session"});if(id===session.user.sessionId)await signOut({redirectTo:"/auth/login?sessionsRevoked=1"});}
export async function revokeOtherSessionsAction(){await requireTrustedMutationOrigin();const session=await current();await revokeOtherSessions(session.user.id,session.user.sessionId||"");await writeAudit({userId:session.user.id,action:"SESSION_REVOKED",entity:"Session",description:"User revoked other active sessions"});}
export async function revokeAllSessionsAction(){await requireTrustedMutationOrigin();const session=await current();await revokeAllSessions(session.user.id);await writeAudit({userId:session.user.id,action:"SESSION_REVOKED",entity:"Session",description:"User revoked all active sessions"});await signOut({redirectTo:"/auth/login?sessionsRevoked=1"});}
