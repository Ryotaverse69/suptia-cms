// 型の名前を `PageProps` から `Props` に変更
type Props = {
  params: {
    slug: string;
  };
};

// コンポーネントの引数に新しい型名を適用
export default async function ArticlePage({ params }: Props) {
  const { slug } = params;

  // ...コンポーネントのロジック
  return (
    <div>
      <h1>Article Slug: {slug}</h1>
    </div>
  );
}