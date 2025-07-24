
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'

const query = `*[_type == "ingredientGuide"]{
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;

interface Article {
  slug: string;
  updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://suptia.com'; // あとで本番環境のURLに変更

  const articles: Article[] = await client.fetch(query);

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...articleUrls,
  ]
}
