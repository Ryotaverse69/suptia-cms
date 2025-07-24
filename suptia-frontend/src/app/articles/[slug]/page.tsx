export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div>
      <h1>テストページ</h1>
      <p>現在のスラッグは: {slug}</p>
    </div>
  );
}

// もし generateStaticParams があれば、それも一時的にコメントアウトするか、
// 以下のようなシンプルな形にしてください。
/*
export async function generateStaticParams() {
  return [{ slug: 'test-slug' }];
}
*/