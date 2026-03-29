# Personal Website

Personal site and blog built with [Astro](https://astro.build), deployed to GitHub Pages.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Content | MDX via `@astrojs/mdx` |
| Syntax highlighting | Shiki (bundled with Astro) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Prerequisites

- Node.js 22+
- npm

## Local development

```bash
npm install
npm run dev
```

The site is served at `http://localhost:4321`.

## Project structure

```
src/
├── components/   # Reusable Astro components
├── content/
│   └── blog/     # MDX blog posts
├── layouts/      # Page layouts (BaseLayout, BlogLayout)
├── pages/        # File-based routing
│   ├── index.astro
│   ├── about.astro
│   ├── blog/
│   ├── projects/
│   └── rss.xml.ts
└── styles/
    └── global.css
```

## Build

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at
`.github/workflows/deploy.yml`, which builds the site and deploys the
`dist/` directory to GitHub Pages.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for first-time setup instructions,
including configuring your custom domain.

## Adding content

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for a guide on writing blog
posts and adding projects.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — stack decisions and site design
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — GitHub Pages + custom domain setup
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — adding posts and projects
- [docs/ROADMAP.md](docs/ROADMAP.md) — planned future features
