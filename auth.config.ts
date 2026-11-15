import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost:
    process.env.NODE_ENV !== "production" ||
    process.env.AUTH_TRUST_HOST === "true",
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: "/auth/login", error: "/auth/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async () => null,
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
