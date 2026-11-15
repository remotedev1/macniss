import { test, expect } from "@playwright/test";

test.describe("first-run setup lifecycle", () => {
  test("setup readiness endpoint returns a boolean", async ({ request }) => {
    const response = await request.get("/api/setup");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(typeof body.setupRequired).toBe("boolean");
  });

  test("setup is disabled after an account already exists", async ({ page, request }) => {
    const readiness = await request.get("/api/setup");
    const body = await readiness.json();

    test.skip(body.setupRequired, "This assertion requires an initialized/seeded database.");

    await page.goto("/setup");
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test("setup cannot create a second CMS account", async ({ request, baseURL }) => {
    const readiness = await request.get("/api/setup");
    const body = await readiness.json();

    test.skip(body.setupRequired, "This assertion requires an initialized/seeded database.");

    const response = await request.post("/api/setup", {
      data: {
        firstName: "Second",
        lastName: "Admin",
        email: "second-admin@example.com",
        password: "AnotherStrongPassword123!",
        confirmPassword: "AnotherStrongPassword123!",
      },
      headers: { Origin: baseURL! },
    });
    expect([409, 403]).toContain(response.status());
  });
});
