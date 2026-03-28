import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Replace with your actual domain once you've set up GitHub Pages
  site: 'https://YOUR_DOMAIN_HERE',
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
