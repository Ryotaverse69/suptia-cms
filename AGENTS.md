# AGENTS.md — サプティア（SUPTIA）

## 目的（1行）
安全 × 価格 × 説明可能性を満たす「サプリ意思決定エンジン」を、軽量・高速・合法で実装せよ。

## 技術スタック
- Next.js(App Router, TS), Tailwind, shadcn/ui, Sanity, Vercel(ISR)
- テスト: vitest + playwright / Lint: ESLint + TypeScript strict

## 非機能要件（必須）
- Core Web Vitals: LCP < 2.5s / CLS < 0.1 / INP < 200ms
- バンドル: First Load JS < 180 kB（analyze-bundle基準）
- アクセシビリティ: 重要ボタンは`aria-label`必須、コントラストAA以上
- データ: 個人情報を保存しない。環境変数はVercel管理

## 禁止事項
- 薬機法NG表現（例: 治る/確実/予防/劇的/唯一 など）。断定を避け、示唆・可能性で表現
- 不要な巨大依存（UIキット追加・日付ライブラリ乱立）
- 価格やエビデンスをLLMの想像で生成すること（必ずデータ起点）
- 1コミットで大規模変更（分割せよ）

## 優先順位
安全性 > 正確性 > 速度 > 見た目

## 主要ドメイン定義（短縮版）
- **実効コスト/日** = (商品価格 ÷ 容量) × 推奨摂取量（mg/日に正規化）
- **総合スコア** = 0.35×エビデンス + 0.30×安全 + 0.25×コスト効率 + 0.10×実用性（0–100）
- **危険成分アラート**: RED(禁忌)/YELLOW(注意)/GREEN(問題なし)

## 出力ルール（AIへの指示）
- 回答は**変更差分のコードのみ**。説明は次プロンプトで求められるまで不要
- 1ステップ=1ファイル原則。型安全＆Lintエラー0
- 追加テストを同時生成（vitest/playwright）

## 受け入れ基準（DoD）
- `npm run build` 通過、`npm run test` 緑
- Lighthouse Performance ≥ 90（ローカル想定）
- 主要導線のイベント計測実装済（search_performed等）

## 参考
- /scripts/claims-guard.ts（薬機法NG判定）
- /src/lib/pricing.ts（実効コスト/日・スコア）
- /src/lib/alerts.ts（危険成分アラート）
