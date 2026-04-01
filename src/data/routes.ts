export interface RouteConfig {
  href: `/${string}`;
  title: string;
  description: string;
  label?: string;
  showInNav?: boolean;
}

export const ROUTES = {
  home: {
    href: '/',
    title: 'Home',
    description: 'Phillip Byram - developer building applications and tools for the web.',
  },
  projects: {
    href: '/projects/',
    title: 'Projects',
    description: "Things I've built, open source and otherwise.",
    label: 'Projects',
    showInNav: true,
  },
  blog: {
    href: '/blog/',
    title: 'Blog',
    description: "Writing on software, tools, and whatever I'm currently building.",
    label: 'Blog',
    showInNav: true,
  },
  about: {
    href: '/about/',
    title: 'About',
    description: 'A little about me, what I work on, and how to get in touch.',
    label: 'About',
    showInNav: true,
  },
} as const satisfies Record<string, RouteConfig>;

export const NAV_ROUTES = [ROUTES.projects, ROUTES.blog, ROUTES.about] as const;
