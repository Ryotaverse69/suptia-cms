import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'rule',
  title: 'Rule',
  type: 'document',
  fields: [
    defineField({
      name: 'weights',
      title: 'Weights',
      type: 'object',
      description: 'ランキングに用いる各要素の重み（合計=1）',
      fields: [
        defineField({name: 'evidence', title: 'Evidence', type: 'number', description: 'エビデンスの重み', validation: (Rule) => Rule.required().min(0).max(1)}),
        defineField({name: 'safety', title: 'Safety', type: 'number', description: '安全性の重み', validation: (Rule) => Rule.required().min(0).max(1)}),
        defineField({name: 'cost', title: 'Cost', type: 'number', description: '価格の重み', validation: (Rule) => Rule.required().min(0).max(1)}),
        defineField({name: 'practicality', title: 'Practicality', type: 'number', description: '実用性の重み', validation: (Rule) => Rule.required().min(0).max(1)}),
      ],
      validation: (Rule) =>
        Rule.custom((w) => {
          if (!w) return 'Weights は必須です'
          const {evidence = 0, safety = 0, cost = 0, practicality = 0} = w as Record<string, number>
          const sum = evidence + safety + cost + practicality
          if (Math.abs(sum - 1) > 0.0001) return 'Weights の合計は 1 にしてください'
          return true
        }),
    }),
    defineField({
      name: 'contraindicationRules',
      title: 'Contraindication Rules',
      type: 'array',
      description: '禁忌タグに対する制御ルール（簡易）',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'tag', title: 'Tag', type: 'string', description: '対象タグ'}),
            defineField({name: 'action', title: 'Action', type: 'string', description: '適用アクション', options: {list: [
              {title: 'Exclude', value: 'exclude'},
              {title: 'Penalize', value: 'penalize'},
            ]}}),
            defineField({name: 'penalty', title: 'Penalty', type: 'number', description: '0-1（Penalize の場合のみ）', validation: (Rule) => Rule.min(0).max(1)}),
          ],
        },
      ],
    }),
    defineField({
      name: 'interactionRules',
      title: 'Interaction Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'tag', title: 'Tag', type: 'string', description: '対象タグ'}),
            defineField({name: 'action', title: 'Action', type: 'string', description: '適用アクション', options: {list: [
              {title: 'Exclude', value: 'exclude'},
              {title: 'Penalize', value: 'penalize'},
            ]}}),
            defineField({name: 'penalty', title: 'Penalty', type: 'number', validation: (Rule) => Rule.min(0).max(1)}),
          ],
        },
      ],
    }),
    defineField({
      name: 'rankingTieBreak',
      title: 'Ranking Tie Break',
      type: 'string',
      description: '同点時の優先基準',
      options: {list: [
        {title: 'Price', value: 'price'},
        {title: 'Evidence', value: 'evidence'},
      ], layout: 'radio', direction: 'horizontal'},
      validation: (Rule) => Rule.required(),
    }),
  ],
})

