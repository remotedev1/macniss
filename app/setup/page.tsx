import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import FirstRunSetupForm from "@/components/setup/FirstRunSetupForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SetupPage() {
  const userCount = await db.users.count();
  if (userCount > 0) redirect("/auth/login?setup=complete");

  return <FirstRunSetupForm />;
}
