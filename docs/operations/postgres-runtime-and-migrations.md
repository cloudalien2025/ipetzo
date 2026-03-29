## PostgreSQL Runtime And Migrations

This repo uses two PostgreSQL connection intents:

- `DATABASE_URL`: runtime app connection used by Next.js server code through `src/server/db/prisma.ts`
- `DIRECT_URL`: direct Prisma CLI connection for migrations and introspection when a non-pooled URL is available

Prisma CLI behavior:

- `prisma.config.ts` prefers `DIRECT_URL`
- Prisma CLI falls back to `DATABASE_URL` if `DIRECT_URL` is unset
- `prisma generate` must remain CI-safe without live database credentials, so `prisma.config.ts` falls back to a local placeholder URL for generate/build flows

Runtime behavior:

- app runtime requires `DATABASE_URL`
- if `DATABASE_URL` is missing, the DB health route reports `not-configured` instead of failing at build time
- runtime code forces `sslmode=require` when it is missing from `DATABASE_URL`

SSL note:

- DigitalOcean Managed PostgreSQL is expected to use TLS
- `DATABASE_SSL_REJECT_UNAUTHORIZED=false` is a temporary local runtime exception only for hosts whose CA store cannot validate the managed certificate chain
- that exception is localized to the Node/Prisma runtime adapter and should not be treated as the long-term default for migrations or future environments

Migration convention:

- use `DIRECT_URL` for Prisma migration and introspection commands when DigitalOcean provides a direct/non-pooled connection string
- do not add live database credentials to CI just to satisfy `prisma generate`
