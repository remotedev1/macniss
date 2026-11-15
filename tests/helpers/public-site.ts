import { test as base } from "@playwright/test";
import { resolve } from "node:path";

export const test = base.extend({
  page: async ({ page }, use) => {
    if (process.env.PLAYWRIGHT_OFFLINE_IMAGES === "1") {
      await page.route("https://images.unsplash.com/**", (route) =>
        route.fulfill({
          path: resolve("public/images/modern-house.jpg"),
          contentType: "image/jpeg",
        }),
      );
    }
    await use(page);
  },
});

export { expect } from "@playwright/test";
