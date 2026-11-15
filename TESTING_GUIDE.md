# Macniss Automated Test Baseline

This phase adds Playwright E2E coverage for the public site, authentication/security boundary, and protected CMS.

## Install

```bash
npm install
npx playwright install chromium
```

## Prepare test data

Use the repeatable seed before authenticated tests:

```bash
npx prisma generate
npm run db:seed
```

For authenticated CMS tests, set credentials in `.env` or the shell. Prefer dedicated E2E credentials outside local development:

```env
E2E_USER_EMAIL="admin@macniss.local"
E2E_USER_PASSWORD="Macniss@Demo2026!"
```

The tests also accept `SEED_USER_EMAIL` and `SEED_USER_PASSWORD`.

## Run

```bash
npm run test:e2e
```

Useful modes:

```bash
npm run test:e2e:headed
npm run test:e2e:ui
npm run test:e2e:report
```

## Coverage added

- homepage and key public sub-pages
- mobile navigation
- anonymous dashboard redirect
- invalid-login behavior
- unauthenticated mutation protection for projects, capabilities, testimonials and gallery
- authenticated CMS page loading for developments, enquiries, capabilities, testimonials and gallery
- session/security settings navigation

Authenticated CMS tests are skipped automatically when credentials are not supplied; public/security tests still run.

## Final QA suites

```bash
npm run test:e2e:a11y
npm run test:e2e:forms
npm run test:e2e:final
```

### Isolated CRUD

CRUD tests are intentionally blocked unless both safety flags are enabled:

```env
E2E_ALLOW_DESTRUCTIVE="true"
E2E_DATABASE_ISOLATED="true"
```

Use a disposable MongoDB database such as `macniss_e2e_test`, seed it, and then run:

```bash
npm run db:seed
npm run test:e2e:crud
```

Never enable destructive tests against development data you care about, staging, or production.

The isolated CRUD suite covers:
- project create/update/archive/unarchive/delete;
- capability create/archive/unarchive/delete;
- testimonial create/update/archive;
- consultation creation/status workflow;
- invalid image MIME rejection.

The accessibility suite uses axe and treats critical/serious violations as release blockers.
