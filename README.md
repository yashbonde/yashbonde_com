Minimal portfolio with Home, Blog (MDX + LaTeX), and About pages.

## Getting Started

First, install deps and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Content lives in `content/blog/*.mdx`. Example: `content/blog/hello-math.mdx` shows KaTeX math.

This project uses Next.js App Router with Tailwind v4 inline theme and KaTeX styles.

## Deploy

Any static host or Vercel works. Build with:

```bash
npm run build && npm start
```
