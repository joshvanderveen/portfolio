import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts: one Markdown file per post in src/content/blog/, named after its address under /blog/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Page title for search results; defaults to the title.
    seoTitle: z.string().optional(),
    description: z.string().max(155),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
