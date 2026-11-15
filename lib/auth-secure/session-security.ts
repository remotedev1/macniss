import { db } from "@/lib/db";
const notRevoked = [{ revokedAt: null }, { revokedAt: { isSet: false } }];
export const revokeSession=(userId,sessionId,now=new Date())=>db.session.updateMany({where:{id:sessionId,userId,OR:notRevoked},data:{revokedAt:now}});
export const revokeOtherSessions=(userId,currentSessionId,now=new Date())=>db.session.updateMany({where:{userId,id:{not:currentSessionId},OR:notRevoked},data:{revokedAt:now}});
export const revokeAllSessions=(userId,now=new Date())=>db.session.updateMany({where:{userId,OR:notRevoked},data:{revokedAt:now}});
export const listActiveSessions=(userId)=>db.session.findMany({where:{userId,OR:notRevoked,expiresAt:{gt:new Date()}},orderBy:{lastActiveAt:"desc"}});
