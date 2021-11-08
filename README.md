This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This command has been modified to start `category-server` as well

## Products

The provided Node.js implementation to serve `category.json` was replaced by an Express server
to avoid CORS issues in the browser. The endpoint is still `http://localhost:8000` to fetch
the products data

## Avoiding making a second request for the detail view

I use react-query for caching.
