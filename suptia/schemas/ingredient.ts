import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: '成分名（一般名）',
      validation: (Rule) => Rule.required().min(1).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: '自動生成されるURLスラッグ（英数字小文字のみ）',
      options: {
        source: 'name',
        slugify: (input) =>
          input
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'synonyms',
      title: 'Synonyms',
      type: 'array',
      description: '別名・同義語（例：学術名、英名）',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: '分類（例：ビタミン、ミネラル、アミノ酸、ハーブなど）',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'evidenceLevel',
      title: 'Evidence Level',
      type: 'string',
      description: 'エビデンスレベル（A: 強い, B: 中等度, C: 限定的）',
      options: {
        list: [
          {title: 'A', value: 'A'},
          {title: 'B', value: 'B'},
          {title: 'C', value: 'C'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dosageRange',
      title: 'Dosage Range',
      type: 'object',
      description: '一般的な用量範囲',
      fields: [
        defineField({
          name: 'min',
          title: 'Min',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'max',
          title: 'Max',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          description: 'mg, g, µg, IU, mL など',
          options: {
            list: [
              {title: 'mg', value: 'mg'},
              {title: 'g', value: 'g'},
              {title: 'µg', value: 'µg'},
              {title: 'mcg', value: 'mcg'},
              {title: 'IU', value: 'IU'},
              {title: 'mL', value: 'mL'},
            ],
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((range) => {
          if (!range) return true
          const {min, max} = range as {min?: number; max?: number}
          if (min != null && max != null && min > max) {
            return 'Min は Max 以下である必要があります'
          }
          return true
        }),
    }),
    defineField({
      name: 'contraindications',
      title: 'Contraindications',
      type: 'array',
      description: '禁忌（例：妊娠中、特定疾患など）',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'interactions',
      title: 'Interactions',
      type: 'array',
      description: '相互作用（例：薬剤名、他成分名など）',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      description: '参考文献URLや資料URL',
      of: [{type: 'url'}],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'category'},
  },
})


