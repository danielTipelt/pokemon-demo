This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

For unmocked version

```bash
npm run dev
# or
yarn dev
```

For mocked version

```bash
npm run dev-mocked
# or
yarn dev-mocked
```

## Observed issues:

If you run into issues when running locally with MSW active and page keeps rerendering, try to turn off "Bypass on Network" checkbox in "Application/service worker tab"
