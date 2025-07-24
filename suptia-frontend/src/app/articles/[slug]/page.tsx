// 別途typeを定義せず、直接コンポーネントの引数で型を指定します
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // ...コンポーネントのロジック
  return (
    <div>
      <h1>Article Slug: {slug}</h1>
      {/* 記事の内容をここに表示 */}
    </div>
  );
}