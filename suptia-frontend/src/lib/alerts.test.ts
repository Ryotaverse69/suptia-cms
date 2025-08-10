import {describe, it, expect} from 'vitest'
import {evaluateAlerts, defaultAlertRules, type PersonaInput} from './alerts'

describe('evaluateAlerts', () => {
  it('RED when pregnancy/lactation and vitamin-a-highdose present', () => {
    const persona: PersonaInput = {
      sensitivityTags: [],
      medicationTags: [],
      pregnancyOrLactation: true,
    }
    const res = evaluateAlerts(persona, [{ingredientSlug: 'vitamin-a-highdose'}], {
      rules: defaultAlertRules,
    })
    expect(res.level).toBe('RED')
    expect(res.reasons.length).toBeGreaterThan(0)
  })

  it('YELLOW when on anticoagulant and ginkgo present', () => {
    const persona: PersonaInput = {
      sensitivityTags: [],
      medicationTags: ['anticoagulant'],
      pregnancyOrLactation: false,
    }
    const res = evaluateAlerts(persona, [{ingredientSlug: 'ginkgo'}], {
      rules: defaultAlertRules,
    })
    expect(res.level).toBe('YELLOW')
  })

  it('GREEN when no rules matched', () => {
    const persona: PersonaInput = {
      sensitivityTags: [],
      medicationTags: [],
      pregnancyOrLactation: false,
    }
    const res = evaluateAlerts(persona, [{ingredientSlug: 'vitamin-c'}])
    expect(res.level).toBe('GREEN')
    expect(res.reasons).toEqual([])
  })
})


