/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  // class-based dark mode: Tailwind dark: variants activate when <html> has class="dark"
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
