import { NextResponse } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "@/routes";
import { getSafeRedirectPath } from "@/lib/security/safe-redirect";

function matchesPublic(pathname){return publicRoutes.some(route=>route.includes(":id")?new RegExp("^"+route.replace(":id","[^/]+")+"$").test(pathname):route===pathname);}
function addSecurityHeaders(response){
  response.headers.set("X-Content-Type-Options","nosniff");
  response.headers.set("X-Frame-Options","DENY");
  response.headers.set("Referrer-Policy","strict-origin-when-cross-origin");
  response.headers.set("Cross-Origin-Opener-Policy","same-origin");
  response.headers.set("Permissions-Policy","camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  if(process.env.NODE_ENV==="production") response.headers.set("Strict-Transport-Security","max-age=31536000; includeSubDomains");
  return response;
}
export default function middleware(req){
  const { pathname }=req.nextUrl;
  if(pathname.startsWith("/api/")) return addSecurityHeaders(NextResponse.next());
  if(matchesPublic(pathname)) return addSecurityHeaders(NextResponse.next());
  if(authRoutes.includes(pathname)) {
    const callbackUrl=req.nextUrl.searchParams.get("callbackUrl");
    if(callbackUrl&&getSafeRedirectPath(callbackUrl)!==callbackUrl){const url=req.nextUrl.clone();url.searchParams.set("callbackUrl",DEFAULT_LOGIN_REDIRECT);return addSecurityHeaders(NextResponse.redirect(url));}
    return addSecurityHeaders(NextResponse.next());
  }
  const res=NextResponse.next();
  if(pathname.startsWith("/dashboard")||pathname.startsWith("/settings")){res.headers.set("Cache-Control","private, no-store, max-age=0, must-revalidate");res.headers.append("Vary","Cookie");}
  return addSecurityHeaders(res);
}
export const config={matcher:["/((?!api(?:/|$)|.+\\.[\\w]+$|_next).*)","/"]};
