import "dotenv/config";

const required = ["MONGODB_URI", "AUTH_SECRET", "NEXT_PUBLIC_APP_URL"];
const missing = required.filter((key) => !process.env[key] || process.env[key].startsWith("REPLACE_"));

if (process.env.AUTH_SECRET && process.env.AUTH_SECRET.length < 32) {
  console.error("AUTH_SECRET must contain at least 32 characters.");
  process.exit(1);
}

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

if (process.env.NODE_ENV === "production") {
  const unsafe = [];
  if (process.env.SEED_USER_PASSWORD) unsafe.push("SEED_USER_PASSWORD is configured");
  if (process.env.E2E_USER_PASSWORD) unsafe.push("E2E_USER_PASSWORD is configured");
  if (unsafe.length) {
    console.error(`Unsafe production environment configuration: ${unsafe.join("; ")}`);
    process.exit(1);
  }
}

console.log("Environment configuration looks valid.");
