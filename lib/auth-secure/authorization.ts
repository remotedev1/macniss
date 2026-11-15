import type { Session } from "next-auth";

export function isUsableSession(
  session: Session | null | undefined,
): session is Session {
  return Boolean(session?.user?.id && !session.user.invalidated);
}

export async function getAuthenticatedSession(): Promise<Session | null> {
  const { auth } = await import("@/auth");
  const session = await auth();
  return isUsableSession(session) ? session : null;
}

export async function requireSession(): Promise<Session> {
  const session = await getAuthenticatedSession();
  if (!session) {
    const error = new Error("Authentication required") as Error & {
      status?: number;
    };
    error.status = 401;
    throw error;
  }
  return session;
}
