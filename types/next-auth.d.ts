import type { UserStatus } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      status: UserStatus;
      mustChangePassword: boolean;
      sessionId: string | null;
      invalidated: boolean;
      firstName: string;
      lastName: string;
    };
    id?: string;
    name?: string | null;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    invalidated?: boolean;
  }

  interface User {
    status: UserStatus;
    mustChangePassword: boolean;
    sessionId: string;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    status?: UserStatus;
    mustChangePassword?: boolean;
    sessionId?: string;
    invalidated?: boolean;
    firstName?: string;
    lastName?: string;
  }
}
