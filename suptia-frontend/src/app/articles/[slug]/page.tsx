import { client } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

export async function generateStaticParams() {
  const paths = await client.fetch(`*[_type == "ingredientGuide"]{"slug": slug.current}`);
  return paths.map((p: { slug: any; }) => ({ slug: p.slug }));
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default async function ArticlePage({ params }: PageProps) {
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = "" } = context.params as { slug: string };
  const query = `*[_type == "ingredientGuide" && slug.current == $slug][0]{
    title,
    body
  }`;
  const article = await client.fetch(query, { slug });
  return {
    props: {
      article,
      params: { slug }
    }
  }
}
