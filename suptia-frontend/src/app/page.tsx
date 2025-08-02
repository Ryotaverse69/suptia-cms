import { client } from '@/lib/sanity.client';

async function getArticles() {
  const query = `*[_type == "post" && defined(slug.current)] { title, slug, category }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return [];
  }
}

type Article = {
  title: string;
  slug: { current: string };
  category: string;
};

export default async function Home() {
  const articles: Article[] = await getArticles();
  const ingredientGuides = articles.filter(article => article.category === 'Ingredient Guide');
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold">サプティア (SUPTIA)</h1>
      <p className="text-xl my-8">誰もが自分にピッタリの安くて安全なサプリメントに出会える。</p>
      <section className="mt-12 text-center">
        <h2 className="text-2xl mb-4">Ingredient Guide</h2>
        {ingredientGuides.length === 0 ? (
          <p>記事がありません。Sanity Studioで「Ingredient Guide」カテゴリを設定し、公開してください。</p>
        ) : (
          <ul className="list-none space-y-2">
            {ingredientGuides.map((article) => (
              <li key={article.slug.current}>
                <a href={`/guides/${article.slug.current}`} className="text-blue-500 hover:underline">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
