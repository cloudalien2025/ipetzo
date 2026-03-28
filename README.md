This is the iPetzo web app, built with [Next.js](https://nextjs.org).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The primary app routes live in `src/app`. The homepage is currently `src/app/page.tsx`, and the health endpoint is `src/app/api/health/route.ts`.

The repo is organized so future foundation lanes have stable homes:

- `src/app`: routes, layouts, and API handlers only
- `src/components`: UI and interactive components
- `src/lib`: shared helpers, adapters, config, and utilities
- `src/server`: server-side orchestration and domain logic
- `src/types`: domain and API contracts
- `docs`: product and engineering notes

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment

Copy `.env.example` to `.env.local` and fill in only the providers needed for the lane you are working on.
