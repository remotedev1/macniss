# Phase 8 Cleanup Register

## Added
- self-disabling `/setup` first-run administrator flow;
- `/api/setup` readiness + initial account endpoint;
- first-run setup documentation;
- setup regression tests.

## Removed
- public registration page/form/server action;
- obsolete action-based login wrapper (login uses the secure API flow);
- unused legacy user helper;
- unused window-dimension hook;
- unused legacy UI components: CardSkeleton, CustomDropDown, CustomSelect, Drawer, GlobalContainer, Heading, Image-model, RadioCard, ThemeToggle;
- obsolete phase-by-phase redesign notes superseded by current operational documentation;
- unused `SettingsSchema`, `RegisterSchema`, and stale `process.title` import.

## Corrected
- `/contact` is explicitly public in route policy;
- `/setup` is explicitly public but self-disables after initialization;
- environment templates no longer advertise obsolete public registration configuration.

The cleanup intentionally retained shared UI primitives and CMS feature code unless an exact import/reference scan showed the file was unused.

## Phase 9 dependency cleanup

Removed unreferenced packages: drizzle-orm, rate-limiter-flexible, react-fast-marquee, react-use, swiper, uuid, cmdk, @radix-ui/react-scroll-area.
