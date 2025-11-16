# Checkmate Testsite

Blank Next.js (TypeScript) app that mirrors the libraries and tooling from `checkmate-fe-user`.

## Quick start

```bash
npm install
npm run dev
```

HTTPS local (self-signed):
```bash
npm run setup:ssl
npm run dev:https
```

## Scripts
- `dev`: Next.js dev server (http)
- `dev:https`: Next.js dev server over HTTPS (requires certificates)
- `setup:ssl`: Generate self-signed certs to `certs/`
- `build`, `start`
- `lint`, `check-types`, `test` (Vitest), `test:e2e` (Playwright)

## Notes
- Tailwind configured with `src/app/globals.css`
- `next-intl` plugin wired with a minimal config in `src/libs/i18n.ts`
- Base path is `/lms` (matching original setup)


