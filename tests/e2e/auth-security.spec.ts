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
    let callbackCount = 0;
    let signalSecondAttempt: () => void = () => {};
    let releaseSecondAttempt: () => void = () => {};
    const secondAttemptStarted = new Promise<void>((resolve) => {
      signalSecondAttempt = resolve;
    });
    const secondAttemptGate = new Promise<void>((resolve) => {
      releaseSecondAttempt = resolve;
    });

    await page.route('**/api/auth/callback/credentials**', async (route) => {
      callbackCount += 1;
      if (callbackCount === 2) {
        signalSecondAttempt();
        await secondAttemptGate;
      }
      await route.continue();
    });

    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('not-a-user@example.com');
    await page.getByLabel(/password/i).fill('InvalidPassword123!');
    const error = page.getByText(/invalid email or password|authentication failed/i).first();
    const signInButton = page.getByRole('button', { name: /^sign in$/i });

    await signInButton.click();
    await expect(error).toBeVisible();

    await page.getByLabel(/password/i).fill('AnotherInvalidPassword123!');
    await expect(error).toBeVisible();

    await signInButton.click();
    await secondAttemptStarted;
    await expect(error).toBeHidden();
    releaseSecondAttempt();
    await expect(error).toBeVisible();
  });

  for (const endpoint of ['/api/projects', '/api/solutions', '/api/testimonials', '/api/interior-gallery']) {
    test(`anonymous mutation is blocked: ${endpoint}`, async ({ request }) => {
      const response = await request.post(endpoint, { multipart: { title: 'Unauthorized test' } });
      expect([401, 403]).toContain(response.status());
    });
  }
});
