# Macniss Environment Guide

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI`.
3. Generate a unique `AUTH_SECRET`.
4. Add ImageKit credentials if CMS image upload is required.
5. Add Resend credentials if real password-reset email delivery is required.
6. Run `npm run env:check`.
7. Run `npx prisma generate`.
8. Run `npm run db:seed` only on a local/demo database.
9. Run `npm run dev`.

## Production

Use `.env.production.example` only as a variable checklist. Store real values in the hosting provider's encrypted environment/secret manager.

Never:
- commit `.env`;
- reuse the demo seed password;
- run the demo seed against production;
- expose `IMAGEKIT_PRIVATE_KEY`;
- expose `AUTH_SECRET`;
- enable public registration without a deliberate authorization design.

## Tests

The Playwright suite can use:

- `E2E_USER_EMAIL`
- `E2E_USER_PASSWORD`
- `PLAYWRIGHT_BASE_URL`
- `PLAYWRIGHT_PORT`
- `PLAYWRIGHT_SKIP_WEBSERVER`

For local seeded tests, the E2E credentials may match the demo seed user.

## First-run initialization

For a fresh database, start the application and open `/setup`. Create the first CMS account there. Setup automatically disables itself once a user exists.

You can check installation state from the terminal with:

```bash
npm run first-run:status
```

`SETUP_REQUIRED` means the user collection is empty.
