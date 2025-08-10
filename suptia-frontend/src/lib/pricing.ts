/**
 * 型: 成分用量
 */
export type IngredientDose = {
  ingredientSlug: string
  amount: number
  unit: 'mg' | 'mcg' | 'g'
}

/** 内部ユーティリティ */
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

/**
 * g / mcg を mg に変換
 * @param amount 値
 * @param unit 'mg'|'mcg'|'g'
 * @returns mg に換算した数値
 */
export function toMg(amount: number, unit: IngredientDose['unit']): number {
  if (!Number.isFinite(amount)) return NaN
  switch (unit) {
    case 'mg':
      return amount
    case 'g':
      return amount * 1000
    case 'mcg':
      return amount / 1000
    default: {
      return NaN
    }
  }
}

export type EffectiveCostPerDayInput = {
  priceJPY: number
  servingsPerContainer: number
  dosePerServingMg: number
  recommendedDailyMg: number
}

/**
 * 推奨摂取量を満たすための 1 日あたり実効コスト（JPY）
 * cost/day = (priceJPY / servingsPerContainer) * (recommendedDailyMg / dosePerServingMg)
 * エッジケース:
 * - recommendedDailyMg <= 0 → 0 を返す
 * - dosePerServingMg <= 0 または servingsPerContainer <= 0 → Infinity を返す
 */
export function effectiveCostPerDay(input: EffectiveCostPerDayInput): number {
  const {priceJPY, servingsPerContainer, dosePerServingMg, recommendedDailyMg} = input
  if (recommendedDailyMg <= 0) return 0
  if (dosePerServingMg <= 0 || servingsPerContainer <= 0) return Infinity
  const costPerServing = priceJPY / servingsPerContainer
  const servingsPerDay = recommendedDailyMg / dosePerServingMg
  return costPerServing * servingsPerDay
}

export type Weights = {
  evidence: number
  safety: number
  cost: number
  practicality: number
}

export const DEFAULT_WEIGHTS: Weights = {
  evidence: 0.35,
  safety: 0.3,
  cost: 0.25,
  practicality: 0.1,
}

export type ScoreProductInput = {
  weights?: Weights
  evidenceScore: number // 0-100
  safetyScore: number // 0-100
  costJPYPerDay: number // 実効コスト（小さいほど良い）
  practicalityScore: number // 0-100
}

/**
 * 市場中央値コスト（JPY/day）を算出
 * products から effectiveCostPerDay を計算し、その中央値を返す
 */
export type MedianInputProduct = Pick<
  EffectiveCostPerDayInput,
  'priceJPY' | 'servingsPerContainer' | 'dosePerServingMg' | 'recommendedDailyMg'
>

export function medianCostJPYPerDay(products: MedianInputProduct[]): number {
  const costs = products
    .map((p) => effectiveCostPerDay(p))
    .filter((v) => Number.isFinite(v)) as number[]
  if (costs.length === 0) return NaN
  costs.sort((a, b) => a - b)
  const mid = Math.floor(costs.length / 2)
  return costs.length % 2 === 0 ? (costs[mid - 1] + costs[mid]) / 2 : costs[mid]
}

/**
 * 総合スコア（0-100）
 * 総合 = w_e*evidence + w_s*safety + w_c*cost効率 + w_p*practicality
 * cost効率 = clamp((marketMedian / costJPYPerDay) * 100, 0, 100)
 * weights が未指定の場合は {0.35, 0.30, 0.25, 0.10}
 * @param input 指標値
 * @param options.marketMedianCostJPYPerDay 市場中央値（省略時は costJPYPerDay を使用 → コスト効率=100）
 */
export function scoreProduct(
  input: ScoreProductInput,
  options?: {marketMedianCostJPYPerDay?: number}
): number {
  const weights = normalizeWeights(input.weights ?? DEFAULT_WEIGHTS)
  const {evidenceScore, safetyScore, costJPYPerDay, practicalityScore} = input
  const marketMedian = options?.marketMedianCostJPYPerDay ?? costJPYPerDay
  const costEfficiencyPct = costJPYPerDay <= 0 ? 100 : clamp((marketMedian / costJPYPerDay) * 100, 0, 100)

  const evidence = clamp(evidenceScore, 0, 100)
  const safety = clamp(safetyScore, 0, 100)
  const practicality = clamp(practicalityScore, 0, 100)

  const composite =
    evidence * weights.evidence +
    safety * weights.safety +
    costEfficiencyPct * weights.cost +
    practicality * weights.practicality

  return clamp(composite, 0, 100)
}

function normalizeWeights(w: Weights): Weights {
  const sum = w.evidence + w.safety + w.cost + w.practicality
  if (sum === 0) return DEFAULT_WEIGHTS
  return {
    evidence: w.evidence / sum,
    safety: w.safety / sum,
    cost: w.cost / sum,
    practicality: w.practicality / sum,
  }
}


