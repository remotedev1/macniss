import { test, expect } from "../helpers/public-site";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/about-us", "/services", "/our-works", "/interior-gallery", "/contact", "/auth/login"];

test.describe("accessibility baseline", () => {
  for (const url of pages) {
    test(`${url} has no critical or serious axe violations`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page }).analyze();
      expect(consoleErrors, `Browser errors on ${url}: ${consoleErrors.join(" | ")}`).toEqual([]);
      const blocking = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact),
      );

      expect(
        blocking,
        blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`).join("\n"),
      ).toEqual([]);
    });
  }

  test("mobile menu remains keyboard-operable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: /open menu/i });
    await menu.focus();
    await page.keyboard.press("Enter");
    const mainMenu = page.getByRole("navigation", { name: "Main menu" });
    await expect(mainMenu.getByRole("link", { name: "Projects", exact: true })).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
  });
});
