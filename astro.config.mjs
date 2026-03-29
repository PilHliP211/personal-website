import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE.url,
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  // Trailing slashes on all URLs prevents 404s on GitHub Pages direct access
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      // Built-in syntax highlighting via Shiki — no extra package needed
      theme: 'github-dark',
      wrap: true,
    },
  },
});
