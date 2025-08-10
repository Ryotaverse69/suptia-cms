import {revalidatePath} from 'next/cache'

// Vercel Scheduled Functions を想定したエンドポイント
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    // 対象ページを必要に応じて追加
    revalidatePath('/')
    revalidatePath('/results')
    // 動的商品詳細はタグ運用が望ましいが、簡易実装としてトップと結果を更新

    return new Response(JSON.stringify({ok: true}), {
      status: 200,
      headers: {'content-type': 'application/json'},
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ok: false, error: e?.message}), {
      status: 500,
      headers: {'content-type': 'application/json'},
    })
  }
}


