import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/auth-secure/authorization";
export async function requireApiAuth(){const session=await getAuthenticatedSession();if(!session)return {response:NextResponse.json({error:"Unauthorized"},{status:401}),session:null};return {response:null,session};}
