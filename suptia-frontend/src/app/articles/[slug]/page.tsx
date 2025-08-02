import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';

type Props = {
  params: {
    slug: string;
  };
};

async function ArticlePage({ params: { slug } }: Props) {
  const query = groq`
    *[_type == 'ingredientGuide' && slug.current == $slug][0] {
      ...,
      body
    }
  `;

  const article = await client.fetch(query, { slug });

  return (
    <article>
      <h1>{article.title}</h1>
      <PortableText value={article.body} />
    </article>
  );
}

export default ArticlePage;