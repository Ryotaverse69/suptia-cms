import {describe, it, expect} from 'vitest'
import {evaluateAlerts, defaultAlertRules} from '@/lib/alerts'

describe('alerts', () => {
  it('RED when pregnancy + vitamin-a-highdose', () => {
    const res = evaluateAlerts(
      {sensitivityTags: [], medicationTags: [], pregnancyOrLactation: true},
      [{ingredientSlug: 'vitamin-a-highdose'}],
      {rules: defaultAlertRules}
    )
    expect(res.level).toBe('RED')
  })
  it('YELLOW when anticoagulant + ginkgo', () => {
    const res = evaluateAlerts(
      {sensitivityTags: [], medicationTags: ['anticoagulant'], pregnancyOrLactation: false},
      [{ingredientSlug: 'ginkgo'}],
      {rules: defaultAlertRules}
    )
    expect(res.level).toBe('YELLOW')
  })
  it('GREEN when nothing matched', () => {
    const res = evaluateAlerts(
      {sensitivityTags: [], medicationTags: [], pregnancyOrLactation: false},
      [{ingredientSlug: 'vitamin-c'}]
    )
    expect(res.level).toBe('GREEN')
  })
})


