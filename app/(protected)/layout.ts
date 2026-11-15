import { redirect } from "next/navigation";
import { getAuthenticatedSession } from "@/lib/auth-secure/authorization";
export default async function ProtectedLayout({children}){
  const session=await getAuthenticatedSession();
  if(!session) redirect("/auth/login");
  if(session.user.mustChangePassword) redirect("/auth/change-password");
  return children;
}
