import { defineCollection, z } from 'astro:content';

const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    company: z.string(),
    industry: z.string(),
    size: z.string(),
    logo: z.string(),
    heroImage: z.string(),
    featured: z.boolean().default(false),
    publishedDate: z.date(),
    metrics: z.object({
      meetingsBooked: z.string(),
      responseRate: z.string(),
      timeSaved: z.string(),
      roi: z.string(),
    }),
    challenge: z.string(),
    solution: z.string(),
    results: z.array(z.string()),
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
      image: z.string().optional(),
    }),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};