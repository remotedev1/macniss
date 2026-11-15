import { test, expect } from "../helpers/public-site";

const publicPages = [
  "/",
  "/about-us",
  "/services",
  "/our-works",
  "/interior-gallery",
  "/contact",
];

test.describe("release candidate smoke", () => {
  for (const url of publicPages) {
    test(`${url} has a stable document structure`, async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));

      const response = await page.goto(url);
      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();

      const images = page.locator("img");
      const count = await images.count();
      for (let index = 0; index < count; index += 1) {
        await expect(images.nth(index)).toHaveAttribute("alt", /.*/);
      }

      expect(consoleErrors, `Browser errors on ${url}: ${consoleErrors.join(" | ")}`).toEqual([]);
    });
  }

  test("mobile homepage has no horizontal document overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });

  test("tablet services page remains usable", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/services");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
  });

  test("security headers are present on the public app", async ({ request }) => {
    const response = await request.get("/");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
    expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("dashboard responses are not publicly cacheable", async ({ request }) => {
    const response = await request.get("/dashboard", { maxRedirects: 0 });
    expect([302, 307, 308]).toContain(response.status());
    expect(response.headers()["location"] || "").toContain("/auth/login");
  });
});
