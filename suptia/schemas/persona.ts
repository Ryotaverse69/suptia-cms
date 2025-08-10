import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'persona',
  title: 'Persona',
  type: 'document',
  fields: [
    defineField({
      name: 'goals',
      title: 'Goals',
      type: 'array',
      description: '健康目的（例：睡眠、集中、筋力、美容など）',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().unique().min(1),
    }),
    defineField({
      name: 'budgetJPY',
      title: 'Budget (JPY)',
      type: 'number',
      description: '月額予算（日本円）',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'sensitivityTags',
      title: 'Sensitivity Tags',
      type: 'array',
      description: '感受性タグ（例：カフェイン感受性など）',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'medicationTags',
      title: 'Medication Tags',
      type: 'array',
      description: '内服薬タグ（相互作用の参考）',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'pregnancyOrLactation',
      title: 'Pregnancy or Lactation',
      type: 'boolean',
      description: '妊娠中・授乳中かどうか',
      initialValue: false,
      validation: (Rule) => Rule.custom(() => true),
    }),
  ],
})

