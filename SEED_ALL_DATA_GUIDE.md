# Full Demo Seed

Run:

```bash
npx prisma generate
npm run db:seed
```

Default local demo login:

- Email: `admin@macniss.local`
- Password: `Macniss@Demo2026!`

For non-local environments, override these values in `.env` with `SEED_USER_EMAIL`,
`SEED_USER_PASSWORD`, `SEED_USER_FIRST_NAME`, `SEED_USER_LAST_NAME`, and
`SEED_USER_PHONE`.

The password is bcrypt-hashed before storage. The user is upserted by email, so the
seed can be rerun. It also seeds projects, services/solutions, testimonials, sample
consultations, and the interior gallery.

Sessions, tokens, audit logs, and rate-limit records are intentionally not fabricated
or globally deleted; those should represent real authentication/security activity.
