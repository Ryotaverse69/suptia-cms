import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { Metadata, ResolvingMetadata } from 'next';

// 構造化データ（JSON-LD）を生成するコンポーネント
const JsonLd = ({ data }: any) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

// PagePropsの型定義を追加
interface PageProps {
  params: {
    slug: string;
  };
}

// 静的パスを生成
export async function generateStaticParams() {
  const paths = await client.fetch(`*[_type == "ingredientGuide"]{"slug": slug.current}`);
  return paths.map((p: { slug: any; }) => ({ slug: p.slug }));
}

// メタデータを動的に生成
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = `*[_type == "ingredientGuide" && slug.current == $slug][0]{
    title,
    body
  }`;
  const article: Article = await client.fetch(query, { slug: params.slug });

  // bodyからテキストを抽出し、descriptionを生成
  const description = article.body
    .filter((block: any) => block._type === 'block')
    .map((block: any) => block.children.map((child: any) => child.text).join(' '))
    .join(' ')
    .substring(0, 120) + '...';

  return {
    title: `${article.title} | Suptia 成分ガイド`,
    description: description,
    openGraph: {
      title: `${article.title} | Suptia 成分ガイド`,
      description: description,
      type: 'article',
      // publishedTime: article.publishedAt, // SanityにpublishedAtがあれば追加
      // modifiedTime: article._updatedAt, // Sanityに_updatedAtがあれば追加
    },
    twitter: {
      title: `${article.title} | Suptia 成分ガイド`,
      description: description,
    },
  };
}

interface Article {
  title: string;
  body: any;
  _createdAt: string;
  _updatedAt: string;
}

export default async function ArticlePage({ params }: PageProps) {
  const query = `*[_type == "ingredientGuide" && slug.current == $slug][0]{
    title,
    body,
    _createdAt,
    _updatedAt
  }`;

  const article: Article = await client.fetch(query, { slug: params.slug });

  // 構造化データ
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'author': {
      '@type': 'Organization',
      'name': 'Suptia',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Suptia',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://suptia.com/logo.png', // ロゴ画像のURL
      },
    },
    'datePublished': article._createdAt,
    'dateModified': article._updatedAt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://suptia.com/articles/${params.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <article>
        <h1>{article.title}</h1>
        <PortableText value={article.body} />
      </article>
    </>
  );
}