# First-Run Setup

Macniss now includes a self-disabling `/setup` route.

## Fresh installation

1. Copy `.env.example` to `.env`.
2. Configure `MONGODB_URI`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`, and ImageKit/email values as needed.
3. Run:

```bash
npm install
npm run env:check
npx prisma generate
npm run db:push
npm run dev
```

4. Open `http://localhost:3000/setup`.
5. Create the first CMS account.
6. Sign in at `/auth/login`.

As soon as any user exists, `/setup` redirects to login and `POST /api/setup` returns `409`.

## Existing databases

If a user already exists, first-run setup is considered complete automatically. No migration or setup account is created.

## Demo content

`npm run db:seed` remains a development/demo utility and may create/update the configured seed user. Do not run the demo seed against production.
