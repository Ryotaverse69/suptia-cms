# Suptia (サプティア)

サプリ比較サイト基盤。Next.js(App Router) + TypeScript + Tailwind + shadcn/ui、CMS は Sanity。

## セットアップ

- Node.js: 20.x を推奨（LTS）
- パッケージマネージャ: npm
- Sanity CLI: `npm i -g sanity`
- Vercel アカウント（デプロイ用）

### リポジトリ取得と依存関係

```bash
# 取得（例）
# git clone <this-repo>
cd suptia-cms

# Sanity Studio
cd suptia
npm i

# Frontend
cd ../suptia-frontend
npm i
```

### 環境変数

| 変数名 | 用途 | 例 | 必須 | 備考 |
| --- | --- | --- | :---: | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity プロジェクトID | `fny3jdcg` | ✓ | `suptia/sanity.config.ts` と一致させる |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity データセット | `production` | ✓ | 公開データ参照用 |
| `NEXT_BASE_URL` | E2E の baseURL 上書き | `http://localhost:3000` | - | Playwright 設定の上書きに使用可 |
| `ANALYZE` | バンドル解析有効化 | `true` | - | `npm run analyze` で使用 |
| `NEXT_PUBLIC_E2E` | E2E モード | `1` | - | `/results` のモック描画に使用（テスト専用） |
| `E2E` | E2E モード(SSR) | `1` | - | サーバー側分岐（テスト専用） |

.env は `suptia-frontend/` 直下に配置してください。

## 開発コマンド

フロントエンド（`suptia-frontend/`）:

```bash
npm run dev         # Next 開発サーバ
npm run build       # 本番ビルド
npm run start       # 本番サーバ（ローカル）
npm run lint        # ESLint
npm run test        # vitest（単体）
npm run test:e2e    # Playwright（E2E）
npm run analyze     # バンドル解析（First Load JS を可視化）
npm run yakuji:check # 薬機法ガード（/content 配下の表現チェック）
```

Sanity Studio（`suptia/`）:

```bash
npm run dev         # Sanity Studio ローカル
npm run build       # Studio ビルド
```

## デプロイ（Vercel）

1. Vercel で本リポジトリをインポート
2. プロジェクトの環境変数に「環境変数」表の値を設定
3. `suptia-frontend/` をフレームワーク Next.js としてデプロイ
4. ISR は `revalidate = 60s`（App Router）で自動更新
5. スケジュール実行（任意）
   - Vercel の「Scheduled」機能で、日次などの Cron を作成
   - GET `https://<your-domain>/server/cron/revalidate` を叩くよう設定（本番ドメインに合わせる）

## 更新フロー

- コンテンツ更新: Sanity Studio（`suptia/`）で編集→Publish
- フロント: ISR により最大 60 秒で自動反映
- 価格情報: 現状はモック（`src/server/price-providers.ts`）。将来、楽天API/PA-API に差し替え可能なインターフェイス
- 手動更新: 必要に応じて revalidate エンドポイントを Cron で実行

## 薬機法チェック運用

- 対象: `suptia-frontend/content/` 配下の `.md`, `.mdx`, `.markdown`, `.json`
- 実行: `cd suptia-frontend && npm run yakuji:check`
- 判定: NG 表現（例「治る」「予防できる」「確実に」「効く（断定）」）を検出し、CI 失敗（exit code 1）
- 表現例: 「治る」→「改善が示唆される」、「確実に」→「一定の可能性で」、「効く」→「一部研究で示唆」

## パフォーマンス運用

- 目標: Lighthouse Performance ≥ 90 / LCP < 2.5s / First Load JS < 180kB
- 対策:
  - `next/image` と `priority` の活用（LCP 改善）
  - `@next/bundle-analyzer` で `npm run analyze`、不要依存の削減
  - App Router のストリーミングと ISR（60s）
  - クライアント JS 削減（不要なクライアントコンポーネントを削除）

## テスト

- 単体: vitest（`src/lib/**`/`tests/**`）
- E2E: Playwright（`tests/e2e/**`）。`npm run test:e2e` は開発サーバを起動してフローを検証します。

---

必要に応じて追加の環境変数やインフラ設定をこの README に追記してください。
