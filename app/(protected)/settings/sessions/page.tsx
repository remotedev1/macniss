import { auth } from "@/auth";
import { listActiveSessions } from "@/lib/auth-secure/session-security";
import { revokeAllSessionsAction, revokeOtherSessionsAction, revokeSessionAction } from "@/actions/session-security";
import { AdminPageHeader } from "@/components/backOffice/navigation/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  const session = await auth();
  const sessions = await listActiveSessions(session.user.id);

  return (
    <>
      <AdminPageHeader eyebrow="Account" title="Active sessions" description="Review where you’re signed in and revoke sessions you no longer use." publicHref={undefined} />
      <div className="mb-5 flex flex-wrap gap-3">
        <form action={revokeOtherSessionsAction}><Button variant="outline">Revoke other sessions</Button></form>
        <form action={revokeAllSessionsAction}><Button variant="destructive">Revoke all sessions</Button></form>
      </div>
      <ul className="grid gap-3">
        {sessions.map((item) => (
          <li key={item.id}>
            <Card className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
              <div className="min-w-0 break-words">
                <p className="font-bold">{item.id === session.user.sessionId ? "Current session" : "Signed-in session"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.userAgent || "Unknown device"}</p>
                <p className="mt-1 text-xs text-muted-foreground">IP: {item.ipAddress || "Unknown"} · Expires {item.expiresAt.toLocaleString()}</p>
              </div>
              <form action={revokeSessionAction}>
                <input type="hidden" name="sessionId" value={item.id} />
                <Button variant="outline" size="sm">Revoke</Button>
              </form>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
