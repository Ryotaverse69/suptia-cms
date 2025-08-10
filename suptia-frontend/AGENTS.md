# AGENTS — フロントエンド（Next.js）

## 目的
ユーザーが直感的に「最適なサプリ」を比較・選択できるUI/UXを提供。

## 非機能要件
- Next.js App Router + TypeScript
- Tailwind + shadcn/ui
- ISR/SSGで高速配信
- 構造化データをページに埋め込み（Product, Offer, FAQPage等）

## 表示優先順位
1. 実効コスト/日
2. 危険成分アラート
3. 総合スコア（4内訳）

## 禁止事項
- Core Web Vitalsを悪化させる画像/スクリプト
- ロジックとUIの混在（lib/ にロジック集約）
