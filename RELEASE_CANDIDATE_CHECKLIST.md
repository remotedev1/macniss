# Macniss Release Candidate Checklist

## Before deployment

- [ ] Copy production environment variables from `.env.production.example` into the hosting provider's encrypted secret manager.
- [ ] Use a production MongoDB database and unique `AUTH_SECRET`.
- [ ] Configure `NEXT_PUBLIC_APP_URL` to the canonical HTTPS domain.
- [ ] Configure ImageKit production keys.
- [ ] Configure Resend/email sender domain if password-recovery email is required.
- [ ] Do not configure or run demo seed credentials against production.
- [ ] Run `npm install`.
- [ ] Run `npm run env:check`.
- [ ] Run `npx prisma generate`.
- [ ] Run `npm run db:validate`.
- [ ] Run `npm run routes:check`.
- [ ] Run `npx playwright install chromium`.
- [ ] Run `npm run test:e2e`.
- [ ] Run `npm run build`.

## First production start

If the production database contains no users:

1. deploy with the final environment values;
2. open `/setup`;
3. create the first CMS account;
4. verify `/setup` redirects to login afterward;
5. sign in and change/verify all organization content;
6. verify `/robots.txt` and `/sitemap.xml`.

## Operational checks

- [ ] Dashboard is unavailable anonymously.
- [ ] CMS mutation APIs return 401/403 without authentication.
- [ ] ImageKit signing is protected.
- [ ] Password reset email uses the production domain.
- [ ] Active sessions can be revoked.
- [ ] Contact form stores enquiries successfully.
- [ ] Project images load from the configured ImageKit endpoint.
- [ ] Public pages have no browser console errors.
- [ ] Mobile navigation works at 390px.
- [ ] Tablet layout works at 768px.
- [ ] No `.env` file is committed.
