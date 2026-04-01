export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const PROJECTS = [
  {
    title: 'Ralph',
    description:
      "CLI coding runner inspired by Geoffrey Huntley's Ralph, built with Bun and the OpenAI Agents SDK for iterative autonomous development workflows.",
    url: 'https://github.com/PilHliP211/Ralph',
    tags: ['TypeScript', 'Bun', 'OpenAI Agents SDK'],
  },
  {
    title: 'Todoer',
    description:
      'Multi-tenant to-do application with a reward system, SMS authentication, and Google Cloud deployment.',
    url: 'https://github.com/PilHliP211/Todoer',
    tags: ['TypeScript', 'GCP', 'SMS Auth'],
  },
  {
    title: 'Personal Website',
    description:
      "The Astro site you're on now, with MDX content collections, RSS, and a lightweight publishing stack deployed to GitHub Pages.",
    url: 'https://github.com/PilHliP211/personal-website',
    tags: ['Astro', 'Tailwind CSS', 'MDX'],
  },
] satisfies Project[];
