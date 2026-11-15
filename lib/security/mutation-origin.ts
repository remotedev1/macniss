import { headers } from "next/headers";

export async function requireTrustedMutationOrigin() {
  const requestHeaders = headers();
  const origin = requestHeaders.get("origin");
  const host = (requestHeaders.get("x-forwarded-host") || requestHeaders.get("host"))
    ?.split(",")[0]
    .trim();

  if (!origin || !host) throw new Error("Untrusted mutation origin");

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    throw new Error("Untrusted mutation origin");
  }

  if (originUrl.host.toLowerCase() !== host.toLowerCase()) {
    throw new Error("Untrusted mutation origin");
  }

  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  if (forwardedProtocol && originUrl.protocol !== `${forwardedProtocol}:`) {
    throw new Error("Untrusted mutation origin");
  }
}
