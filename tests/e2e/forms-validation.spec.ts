import { test, expect } from "@playwright/test";

test.describe("form validation", () => {
  test("contact form rejects malformed client input before submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByPlaceholder("Your name").fill("A");
    await page.getByPlaceholder("Email address").fill("not-an-email");
    await page.getByPlaceholder("Phone number").fill("123");
    await page.getByRole("button", { name: /^submit$/i }).click();

    await expect(page.getByText(/invalid email/i).first()).toBeVisible();
    await expect(page.getByText(/invalid indian phone/i).first()).toBeVisible();
  });

  test("consultation API returns 400 for invalid payload instead of 500", async ({ request }) => {
    const response = await request.post("/api/consultations", {
      data: { name: "", email: "bad", phone: "1", state: "Unknown" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error).toBeTruthy();
  });

  test("setup rejects weak passwords when setup is still available", async ({ request, baseURL }) => {
    const readiness = await request.get("/api/setup");
    const body = await readiness.json();
    test.skip(!body.setupRequired, "First-run setup is already complete.");

    const response = await request.post("/api/setup", {
      data: {
        firstName: "Initial",
        lastName: "Admin",
        email: "admin@example.com",
        password: "weak",
        confirmPassword: "weak",
      },
      headers: { Origin: baseURL! },
    });
    expect(response.status()).toBe(400);
  });
});
