import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://harperai.com';

export const GET: APIRoute = async () => {
  // Static pages
  const staticPages = [
    '',
    'product',
    'pricing',
    'customers',
    'about',
    'demo',
    'trial',
    'solutions/sales',
    'solutions/customer-success',
    'solutions/revenue-operations',
    'solutions/enterprise',
  ];

  // Get dynamic content (case studies)
  const caseStudies = await getCollection('case-studies');

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page ? `/${page}` : ''}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('product') || page.includes('pricing') ? '0.9' : '0.8'}</priority>
  </url>`).join('')}
  ${caseStudies.map(study => `
  <url>
    <loc>${SITE_URL}/case-studies/${study.slug}</loc>
    <lastmod>${study.data.publishedDate ? new Date(study.data.publishedDate).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};