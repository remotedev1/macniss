const DEFAULT_REDIRECT = "/dashboard";

export function getSafeRedirectPath(value: unknown, fallback = DEFAULT_REDIRECT): string {
  if (typeof value !== "string") return fallback;

  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return fallback;
  }

  return path;
}
