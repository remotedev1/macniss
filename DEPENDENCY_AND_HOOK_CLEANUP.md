# Hook & Dependency Cleanup

## Fixed dashboard hook/session wiring

- `hooks/use-current-user.ts` now returns `session.user` as `user` and exposes the Auth.js status/update API.
- `app/Providers.tsx` now wraps the application in `SessionProvider`, which is required by `useSession()` and therefore by `useCurrentUser()`.
- `hooks/use-mobile.tsx` is explicitly typed and client-safe.
- Dashboard layout children are typed with `ReactNode`.
- Removed the stale commented `search-context` hook reference.

## Removed unused runtime packages

- `date-fns`
- `react-icons`
- `react-select`
- `react-transition-group`

## Restored missing runtime dependency

- `react-day-picker` — required by `components/ui/calendar.tsx`.

## After pulling this change

Run:

```bash
npm install
npx prisma generate
npm run typecheck
npm run build
```

Do not use `npm ci` until a fresh `package-lock.json` has been generated and committed for this cleaned dependency graph.
