# Deployment

The site is deployed to GitHub Pages via a GitHub Actions workflow. Every push
to `main` triggers a build and deploy.

---

## First-time setup

### 1. Enable GitHub Pages in the repository settings

1. Go to **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.

   > Do not select "Deploy from a branch". The workflow uses the modern
   > `actions/deploy-pages` approach, which requires "GitHub Actions" as the source.

### 2. Set your custom domain in the code

Two places need updating:

**`CNAME`** (repo root) — replace `YOUR_DOMAIN_HERE` with your domain:
```
blog.example.com
```

**`astro.config.mjs`** — replace the placeholder `site` value:
```js
export default defineConfig({
  site: 'https://blog.example.com',
  // ...
});
```

The `site` value is used for canonical URLs, the RSS feed, and the sitemap.
If it's wrong, RSS readers and search engines will index incorrect links.

### 3. Add a CNAME DNS record at your registrar

| Type | Host | Value |
|------|------|-------|
| `CNAME` | `blog` (or `@` for apex) | `<your-github-username>.github.io` |

DNS propagation typically takes a few minutes to a few hours.

### 4. Wait for TLS provisioning

Once DNS propagates, GitHub Pages automatically provisions a free TLS
certificate via Let's Encrypt. You'll see a green checkmark in
**Settings → Pages** when it's ready. Enable **Enforce HTTPS** there.

---

## How the workflow works

File: `.github/workflows/deploy.yml`

```
push to main
  └── build job
        ├── actions/checkout@v4
        ├── actions/setup-node@v4 (Node 20, npm cache)
        ├── npm ci
        ├── npm run build  →  dist/
        └── actions/upload-pages-artifact@v3  →  Pages artifact

  └── deploy job (needs: build)
        └── actions/deploy-pages@v4  →  live site
```

The `concurrency` setting prevents a mid-flight deploy from being cancelled
if another push arrives — the new build queues behind the in-progress one.

---

## Manual deploy

The workflow includes `workflow_dispatch`, so you can trigger a deploy manually
from the **Actions** tab in GitHub without pushing a commit.

---

## Environment variables and secrets

The current build requires no secrets. If you add a third-party integration
(e.g. an analytics key, a CMS API token) in the future:

1. Add the secret in **Settings → Secrets and variables → Actions**.
2. Reference it in the workflow as `${{ secrets.MY_SECRET }}`.
3. Pass it to the build step as an environment variable:
   ```yaml
   - name: Build with Astro
     run: npm run build
     env:
       PUBLIC_ANALYTICS_ID: ${{ secrets.ANALYTICS_ID }}
   ```

---

## Local preview of the production build

```bash
npm run build
npm run preview
```

This serves the `dist/` directory locally so you can verify the production
output before pushing.
