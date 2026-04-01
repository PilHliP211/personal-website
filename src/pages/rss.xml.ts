import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedBlogPosts } from '../lib/content';
import { SITE } from '../site.config';

export async function GET(context: APIContext) {
  const posts = await getPublishedBlogPosts();

  return rss({
    title: `${SITE.title} | Blog`,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
