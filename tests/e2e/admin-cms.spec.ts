import { test, expect } from "@playwright/test";

const email = process.env.E2E_USER_EMAIL || process.env.SEED_USER_EMAIL;
const password = process.env.E2E_USER_PASSWORD || process.env.SEED_USER_PASSWORD;

test.describe('authenticated CMS', () => {
  test.skip(!email || !password, 'Set E2E_USER_EMAIL/E2E_USER_PASSWORD (or seed credentials) to run authenticated CMS tests.');

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  const cmsPages: [string, RegExp][] = [
    ['/dashboard/projects', /developments/i],
    ['/dashboard/consultations', /project enquiries/i],
    ['/dashboard/solutions', /services & capabilities/i],
    ['/dashboard/testimonials', /testimonials/i],
    ['/dashboard/interior-gallery', /interior gallery/i],
  ];

  for (const [url, title] of cmsPages) {
    test(`${url} loads inside the redesigned CMS`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByTestId('admin-page-header')).toBeVisible();
      await expect(page.getByTestId('admin-page-header').getByText(title).first()).toBeVisible();
    });
  }

  test('session security pages remain accessible', async ({ page }) => {
    await page.goto('/settings/sessions');
    await expect(page.locator('main')).toBeVisible();
    await page.goto('/settings/security');
    await expect(page.locator('main')).toBeVisible();
  });
});

// CRUD writes are intentionally not automated against shared/staging data in this baseline.
// Add a disposable test database before enabling destructive create/edit/archive/delete E2E scenarios.
