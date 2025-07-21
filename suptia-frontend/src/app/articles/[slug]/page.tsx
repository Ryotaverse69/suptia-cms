import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const paths = await client.fetch(`*[_type == "ingredientGuide"]{"slug": slug.current}`);
  return paths.map((p: { slug: any; }) => ({ slug: p.slug }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "ingredientGuide" && slug.current == $slug][0]{
    title,
    body
  }`;

  const article = await client.fetch(query, { slug: params.slug });

  return (
    <div>
      <h1>{article.title}</h1>
      <PortableText value={article.body} />
    </div>
  );
}
