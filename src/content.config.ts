import { defineCollection, z } from 'astro:content';

const practiceAreas = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
  }),
});

const faq = defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number(),
  }),
});

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    // Sorting compares these as strings, so the format has to be exact; the
    // CMS date widget is configured to write YYYY-MM-DD.
    publishDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishDate must be YYYY-MM-DD')
      .refine((value) => !Number.isNaN(Date.parse(value)), 'publishDate is not a real date'),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Slugs of the articles to suggest under this one, in order.
    related: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});

export const collections = { practiceAreas, faq, articles };
