import { test, expect } from "@playwright/test";

test.describe("public API contracts", () => {
  test("solutions public read returns a successful JSON response", async ({ request }) => {
    const response = await request.get("/api/solutions");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"] || "").toContain("application/json");
  });

  test("projects public read returns a successful JSON response", async ({ request }) => {
    const response = await request.get("/api/projects");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"] || "").toContain("application/json");
  });

  test("interior gallery public read returns JSON", async ({ request }) => {
    const response = await request.get("/api/interior-gallery");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"] || "").toContain("application/json");
  });

  test("protected image signing rejects anonymous requests", async ({ request }) => {
    const response = await request.get("/api/imagekit-auth");
    expect([401, 403]).toContain(response.status());
  });
});
