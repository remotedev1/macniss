import { test, expect } from "@playwright/test";

test.describe('public developer website', () => {
  test('homepage presents the Macniss developer brand', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/macniss/i);
    await expect(page.getByRole('link', { name: /projects|developments/i }).first()).toBeVisible();
    await expect(page.getByText(/Macniss/i).first()).toBeVisible();
  });

  const pages: [string, RegExp][] = [
    ['/about-us', /develop places|about macniss/i],
    ['/services', /development partner|services & capabilities/i],
    ['/our-works', /development|project/i],
    ['/interior-gallery', /architecture doesn't stop|interior/i],
    ['/contact', /tell us what you want to build/i],
  ];

  for (const [url, heading] of pages) {
    test(`${url} renders its redesigned content`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByText(heading).first()).toBeVisible();
    });
  }

  test('mobile navigation opens and exposes key routes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    const mainMenu = page.getByRole('navigation', { name: 'Main menu' });
    await expect(mainMenu.getByRole('link', { name: 'About', exact: true })).toBeVisible();
    await expect(mainMenu.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
    await expect(mainMenu.getByRole('link', { name: 'Projects', exact: true })).toBeVisible();
    await expect(mainMenu.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
  });
});
