import { expect, type Page } from "@playwright/test";

export async function loginAsCmsUser(page: Page) {
  const email = process.env.E2E_USER_EMAIL || process.env.SEED_USER_EMAIL;
  const password = process.env.E2E_USER_PASSWORD || process.env.SEED_USER_PASSWORD;
  if (!email || !password) throw new Error("E2E CMS credentials are not configured.");

  await page.goto("/auth/login");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

