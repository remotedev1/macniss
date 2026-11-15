import { consumeSecurityRateLimit, clearSecurityRateLimit } from "./security-rate-limit";
const WINDOW_MS=15*60*1000, MAX_ATTEMPTS=10, BLOCK_MS=15*60*1000;
export const assertLoginRateLimit=(identity,ip)=>consumeSecurityRateLimit({scope:"login",identity:`${identity.toLowerCase()}|${ip||"unknown"}`,windowMs:WINDOW_MS,maxAttempts:MAX_ATTEMPTS,blockMs:BLOCK_MS});
export const clearLoginRateLimit=(identity,ip)=>clearSecurityRateLimit("login",`${identity.toLowerCase()}|${ip||"unknown"}`);
