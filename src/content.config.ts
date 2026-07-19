import { defineCollection, z } from 'astro:content';

const practiceAreas = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
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
    publishDate: z.string(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});

export const collections = { practiceAreas, faq, articles };
