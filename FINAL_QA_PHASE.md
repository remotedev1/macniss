# Phase 10 — Final QA & Release Hardening

## Functional fixes discovered during QA

- Fixed `Solutions.image` persistence to match Prisma `ImageGallery[]`.
- Fixed the previously empty project archive API.
- Expanded project create/update API support for tagline, client, contractor, architect, dates and estimated cost.
- Expanded the Project CMS form so those richer project fields can be managed instead of existing only in seed data.
- Changed invalid consultation submissions from HTTP 500 to HTTP 400.
- Added consultation status validation.
- Added image MIME and file-size validation.
- Replaced Interior Gallery's potentially unbounded compression loop with bounded compression attempts.

## Test coverage added

- Axe accessibility checks for public/auth pages.
- Keyboard navigation baseline.
- Contact form client validation.
- Consultation API validation.
- Opt-in isolated CRUD coverage.
- Invalid upload MIME validation.

## Destructive-test safety

The CRUD suite runs only when both:

- `E2E_ALLOW_DESTRUCTIVE=true`
- `E2E_DATABASE_ISOLATED=true`

are explicitly set. Use `.env.test.example` as the disposable test-database template.

## Recommended final verification

```bash
npm install
npm run env:check
npx prisma generate
npm run db:validate
npm run routes:check
npx playwright install chromium
npm run test:e2e:final
npm run build
```

Against a disposable database only:

```bash
npm run db:seed
npm run test:e2e:crud
```
