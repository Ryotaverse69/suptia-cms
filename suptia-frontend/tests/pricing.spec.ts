import {describe, it, expect} from 'vitest'
import {toMg, effectiveCostPerDay, medianCostJPYPerDay, scoreProduct} from '@/lib/pricing'

describe('pricing utils', () => {
  it('toMg converts correctly', () => {
    expect(toMg(1, 'g')).toBe(1000)
    expect(toMg(1000, 'mcg')).toBe(1)
    expect(toMg(123, 'mg')).toBe(123)
  })

  it('effectiveCostPerDay handles edge cases', () => {
    expect(effectiveCostPerDay({priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 0, recommendedDailyMg: 100})).toBe(Infinity)
    expect(effectiveCostPerDay({priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 0})).toBe(0)
  })

  it('medianCostJPYPerDay returns median', () => {
    const m = medianCostJPYPerDay([
      {priceJPY: 1000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100},
      {priceJPY: 2000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100},
      {priceJPY: 3000, servingsPerContainer: 10, dosePerServingMg: 100, recommendedDailyMg: 100},
    ])
    expect(m).toBe(200)
  })

  it('scoreProduct increases when cost is lower', () => {
    const a = scoreProduct({evidenceScore: 70, safetyScore: 70, costJPYPerDay: 100, practicalityScore: 70}, {marketMedianCostJPYPerDay: 200})
    const b = scoreProduct({evidenceScore: 70, safetyScore: 70, costJPYPerDay: 300, practicalityScore: 70}, {marketMedianCostJPYPerDay: 200})
    expect(a).toBeGreaterThan(b)
  })
})


