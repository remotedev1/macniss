import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "../helpers/public-site";

test.describe("inner page flows with demo data", () => {
  test.skip(process.env.PLAYWRIGHT_MACNISS_SEEDED_QA !== "1", "Requires a disposable database populated by db:seed.");
  test.use({ viewport: { width: 390, height: 844 }, contextOptions: { reducedMotion: "reduce" } });

  test("filters projects and opens a project detail", async ({ page }) => {
    await page.goto("/our-works");
    await expect(page.getByRole("heading", { name: "Verdant Villas" })).toBeVisible();
    await page.getByRole("button", { name: "Completed", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Verdant Villas" })).toHaveCount(0);
    await page.getByRole("button", { name: /^residential$/i }).click();
    await expect(page.getByText("2 projects shown")).toBeVisible();

    const portfolio = await new AxeBuilder({ page }).analyze();
    expect(portfolio.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual([]);

    await page.getByRole("link", { name: /Courtyard House/ }).first().click();
    await expect(page).toHaveURL(/\/our-works\/[\da-f]{24}$/);
    await expect(page.getByRole("heading", { level: 1, name: "Courtyard House" })).toBeVisible();
    const details = await new AxeBuilder({ page }).analyze();
    expect(details.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual([]);
    await page.getByRole("link", { name: "Discuss your project" }).click();
    await expect(page).toHaveURL(/\/contact#enquiry$/);
  });

  test("shows a project-specific 404 for a missing project", async ({ page }) => {
    const response = await page.goto("/our-works/000000000000000000000000");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Project not found." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Return to developments" })).toHaveAttribute("href", "/our-works");
  });

  test("traps focus in the gallery viewer and restores it on close", async ({ page }) => {
    await page.goto("/interior-gallery");
    const opener = page.getByRole("button", { name: "Open interior image 1 of 5" });
    await opener.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Interior image viewer" });
    const close = dialog.getByRole("button", { name: "Close image viewer" });
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "Next image" })).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("img", { name: "Interior image 2 of 5" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
  });

  test("submits a valid consultation and shows confirmation", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Enter Your Name").fill("Inner Pages QA");
    await page.getByLabel("Enter Your Email").fill("macniss-qa@example.test");
    await page.getByLabel("Enter Your Phone Number").fill("9876543210");
    await page.getByRole("combobox", { name: "Choose State" }).click();
    await page.getByRole("option", { name: "Karnataka" }).click();
    const submitted = page.waitForResponse((response) =>
      response.url().endsWith("/api/consultations") && response.request().method() === "POST",
    );
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    const response = await submitted;
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({ success: true, data: { id: expect.any(String), status: "PENDING" } });
    await expect(page.getByText("Submitted — we will contact you soon")).toBeVisible();
    await expect(page.getByLabel("Enter Your Name")).toHaveValue("");
  });
});
