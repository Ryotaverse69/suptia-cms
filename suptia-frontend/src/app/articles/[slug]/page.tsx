// src/app/articles/[slug]/page.tsx

// --- データ取得関数の例 ---
// 本来は lib/sanity.client.ts のような別のファイルに記述します
async function getArticleData(slug: string) {
  // ここに、Sanityから特定のslugの記事データを取得するロジックを記述します。
  // これはあくまで例です。
  console.log(`Sanityから ${slug} のデータを取得中...`);
  // const data = await client.fetch(query, { slug });
  // return data;

  // 仮のデータを返します
  return {
    title: `記事タイトル: ${slug}`,
    content: "ここにSanityから取得した記事の本文が入ります。",
  };
}

// --- 静的パス生成 (任意ですが推奨) ---
// 事前にページを生成しておくことで、表示を高速化します。
export async function generateStaticParams() {
  // ここで、Sanityから全ての記事のスラッグの一覧を取得します。
  // const slugs = await client.fetch(`*[_type == "article"]{ "slug": slug.current }`);
  // return slugs;
  
  // 仮のデータを返します
  return [{ slug: 'test-article-1' }, { slug: 'test-article-2' }];
}


// --- ページコンポーネント本体 ---
// 引数の型は、これが最も確実な書き方です。
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // awaitを使って、データ取得が完了するのを待ちます。
  const article = await getArticleData(slug);

  // データが見つからない場合の対応
  if (!article) {
    return <div>記事が見つかりません。</div>;
  }

  // 取得したデータを使って、最終的にJSX（HTMLのようなもの）を返します。
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}