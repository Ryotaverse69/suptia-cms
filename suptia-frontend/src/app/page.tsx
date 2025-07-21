import Link from 'next/link';
import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";

const query = `*[_type == "ingredientGuide"]{
  title,
  "slug": slug.current,
  body[] {
    _type,
    children[] {
      _type,
      text,
      marks
    }
  }
}`;

interface Article {
  title: string;
  slug: string;
  body: any[];
}

export default async function HomePage() {
  const articles: Article[] = await client.fetch(query);

  // For debugging purposes, you can uncomment the line below
  // console.log('Fetched articles:', articles);

  return (
    <div>
      <h1>成分ガイド記事一覧</h1>
      <p>誰もが自分にピッタリの安くて安全なサプリメントに出会える。</p>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <h2>{article.title}</h2>
            </Link>
            <PortableText value={article.body} />
          </li>
        ))}
      </ul>
    </div>
  );
}
