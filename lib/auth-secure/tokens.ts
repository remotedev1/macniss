import { createHash, randomBytes } from "node:crypto";
import { db } from "@/lib/db";
const hash=(v)=>createHash("sha256").update(v).digest("hex");
export async function issueSecurityToken({userId,email,type}){const raw=randomBytes(32).toString("base64url");const ttl=type==="PASSWORD_RESET"?30*60*1000:24*60*60*1000;const expiresAt=new Date(Date.now()+ttl);await db.token.updateMany({where:{email,type,used:false},data:{used:true}});await db.token.create({data:{userId,email,type,token:hash(raw),expiresAt}});return{raw,expiresAt};}
export async function consumeSecurityToken(raw,type){const token=await db.token.findFirst({where:{token:hash(raw),type,used:false,expiresAt:{gt:new Date()}}});if(!token)return null;const updated=await db.token.updateMany({where:{id:token.id,used:false},data:{used:true}});return updated.count===1?token:null;}
