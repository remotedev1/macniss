import { test, expect } from "@playwright/test";

test.describe('authentication and API security', () => {
  test('anonymous dashboard access is redirected to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('anonymous documentation access is protected', async ({ page, request }) => {
    await page.goto('/dashboard/documentation');
    await expect(page).toHaveURL(/\/auth\/login/);

    const response = await request.get('/api/openapi');
    expect([401, 403]).toContain(response.status());
  });

  test('external login callback URLs are rejected', async ({ page }) => {
    await page.goto('/auth/login?callbackUrl=https%3A%2F%2Fevil.example%2Fphishing');
    await expect(page).toHaveURL(/\/auth\/login\?callbackUrl=%2Fdashboard$/);
  });

  test('invalid login is rejected without exposing account details', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('not-a-user@example.com');
    await page.getByLabel(/password/i).fill('InvalidPassword123!');
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page.getByText(/invalid email or password|authentication failed/i).first()).toBeVisible();
  });

  for (const endpoint of ['/api/projects', '/api/solutions', '/api/testimonials', '/api/interior-gallery']) {
    test(`anonymous mutation is blocked: ${endpoint}`, async ({ request }) => {
      const response = await request.post(endpoint, { multipart: { title: 'Unauthorized test' } });
      expect([401, 403]).toContain(response.status());
    });
  }
});
