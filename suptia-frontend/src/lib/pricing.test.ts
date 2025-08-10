import {describe, it, expect} from 'vitest'
import {
  toMg,
  effectiveCostPerDay,
  medianCostJPYPerDay,
  scoreProduct,
  DEFAULT_WEIGHTS,
} from './pricing'

describe('toMg', () => {
  it('converts g to mg', () => {
    expect(toMg(1, 'g')).toBe(1000)
  })
  it('converts mcg to mg', () => {
    expect(toMg(1000, 'mcg')).toBe(1)
  })
  it('keeps mg as mg', () => {
    expect(toMg(250, 'mg')).toBe(250)
  })
})

describe('effectiveCostPerDay', () => {
  it('returns 0 when recommendedDailyMg is 0', () => {
    expect(
      effectiveCostPerDay({priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 0})
    ).toBe(0)
  })
  it('returns Infinity when dose or servings invalid', () => {
    expect(
      effectiveCostPerDay({priceJPY: 1000, servingsPerContainer: 0, dosePerServingMg: 100, recommendedDailyMg: 100})
    ).toBe(Infinity)
    expect(
      effectiveCostPerDay({priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 0, recommendedDailyMg: 100})
    ).toBe(Infinity)
  })
  it('computes proportional daily cost', () => {
    // price 1200 for 12 servings → 100 JPY/serving. Need 2 servings/day → 200 JPY/day
    expect(
      effectiveCostPerDay({priceJPY: 1200, servingsPerContainer: 12, dosePerServingMg: 250, recommendedDailyMg: 500})
    ).toBe(200)
  })
})

describe('medianCostJPYPerDay', () => {
  it('returns NaN on empty', () => {
    expect(Number.isNaN(medianCostJPYPerDay([]))).toBe(true)
  })
  it('returns median for odd/even lists', () => {
    const productsOdd = [
      {priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100}, // 100
      {priceJPY: 2000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100}, // 200
      {priceJPY: 3000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100}, // 300
    ]
    expect(medianCostJPYPerDay(productsOdd)).toBe(200)

    const productsEven = [
      {priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100}, // 100
      {priceJPY: 3000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100}, // 300
    ]
    expect(medianCostJPYPerDay(productsEven)).toBe(200)
  })
})

describe('scoreProduct', () => {
  it('uses default weights and clamps to 0-100', () => {
    const score = scoreProduct({
      evidenceScore: 110,
      safetyScore: 90,
      costJPYPerDay: 100,
      practicalityScore: 80,
    }, {marketMedianCostJPYPerDay: 100})
    expect(score).toBeLessThanOrEqual(100)
    expect(score).toBeGreaterThan(0)
  })

  it('reflects cost efficiency (lower cost → higher score)', () => {
    const a = scoreProduct({evidenceScore: 70, safetyScore: 70, costJPYPerDay: 100, practicalityScore: 70}, {marketMedianCostJPYPerDay: 200})
    const b = scoreProduct({evidenceScore: 70, safetyScore: 70, costJPYPerDay: 300, practicalityScore: 70}, {marketMedianCostJPYPerDay: 200})
    expect(a).toBeGreaterThan(b)
  })

  it('normalizes custom weights', () => {
    const s = scoreProduct({
      weights: {evidence: 1, safety: 1, cost: 1, practicality: 1},
      evidenceScore: 50,
      safetyScore: 50,
      costJPYPerDay: 100,
      practicalityScore: 50,
    }, {marketMedianCostJPYPerDay: 100})
    // All 50 + cost=100 → costEff=100 → average of (50,50,100,50) with equal weights = 62.5
    expect(Math.round(s)).toBe(63)
  })
})


