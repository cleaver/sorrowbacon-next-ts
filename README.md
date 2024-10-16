# Sorrowbacon Frontend
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Architecture

The site is built with a NextJS frontend and a Backend CMS built on Elixir/Phoenix.
The frontend is pre-rendered and served statically, with dynamic content fetched
from the backend CMS via API calls. (The `revalidateInterval` can be set in `lib/config.ts`.)

## Authentication

There is an `API_KEY` environment variable required to access the backend CMS. See the [backend repo](https://github.com/cleaver/sb_cascade) for more details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
