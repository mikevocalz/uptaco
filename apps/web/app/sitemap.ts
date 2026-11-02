import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap {
  const origin=process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.uptaco.nyc';
  return ['/','/menu','/locations','/locations/harlem','/locations/midtown','/catering','/cafe-partners','/story'].map(route=>({url:`${origin}${route}`,changeFrequency:'weekly' as const,priority:route==='/'?1:0.7}));
}
