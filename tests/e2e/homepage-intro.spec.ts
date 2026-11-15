import { test, expect } from "@playwright/test";

test("the architectural film draws the site, rises, holds and can be replayed", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /from ground to landmark/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore projects" })).toHaveAttribute("href", "/our-works");
  await expect(page.getByText("Illustrative imagery · Karnataka")).toHaveCount(0);
  const stage = page.locator(".home-build-stage");
  const variable = (name: string) => stage.evaluate((element, name) => element.style.getPropertyValue(name), name);
  const pause = page.getByRole("button", { name: "Pause building sequence" });
  await expect(pause).toBeVisible();
  await expect.poll(async () => Number(await variable("--draw-footprint"))).toBeLessThan(.8);
  await expect(page.locator(".home-survey-wide")).not.toHaveCSS("opacity", "0");
  await pause.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Resume building sequence" })).toBeFocused();
  const pausedAt = await variable("--draw-footprint");
  await page.waitForTimeout(300);
  expect(await variable("--draw-footprint")).toBe(pausedAt);
  await page.keyboard.press("Enter");
  const survey = page.locator(".home-survey-wide");
  const concrete = survey.locator('[data-structure-path="concrete"]');
  await expect(concrete).toHaveAttribute("d", /M.+Z/, { timeout: 6000 });
  await expect(survey.locator('[data-structure-path="tips"]')).toHaveAttribute("d", /M.+L/);
  const replay = page.getByRole("button", { name: "Replay building sequence" });
  await expect(replay).toBeVisible({ timeout: 12000 });
  await expect(stage).toHaveAttribute("data-playback", "finished");
  await expect(page.locator(".home-build-shot")).toHaveCSS("visibility", "hidden");
  await replay.click();
  await expect(pause).toBeVisible();
  await page.reload();
  await expect(pause).toBeVisible();
  await page.getByRole("link", { name: "Explore projects" }).click();
  await page.waitForURL("**/our-works");
  await page.goBack();
  await expect(pause).toBeVisible();
});

for (const preference of ["reduced motion", "data saving"]) {
  test(`a mobile visitor using ${preference} gets only the completed poster`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    if (preference === "reduced motion") await page.emulateMedia({ reducedMotion: "reduce" });
    else await page.addInitScript(() => Object.defineProperty(navigator, "connection", {
      value: Object.assign(new EventTarget(), { saveData: true }),
    }));

    const art: string[] = [];
    page.on("request", (request) => {
      if (/\/images\/home\/draw-[\w-]+\.webp$/.test(request.url())) art.push(request.url());
    });
    await page.goto("/");
    const poster = page.locator(".home-build-stage img");
    await expect.poll(() => poster.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.getByRole("button", { name: /building sequence/i })).toHaveCount(0);
    expect(art).toHaveLength(1);
    expect(art[0]).toMatch(/draw-landmark-mobile\.webp$/);
    await page.getByRole("link", { name: "Start a project" }).click();
    await expect(page).toHaveURL(/#consultation-form$/);
    await expect(page.getByRole("heading", { name: "Request a consultation" })).toBeInViewport();
  });
}
