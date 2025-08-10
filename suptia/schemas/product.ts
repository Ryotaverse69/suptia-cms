import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      description: 'ブランド名',
      validation: (Rule) => Rule.required().min(1).max(80),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: '製品名',
      validation: (Rule) => Rule.required().min(1).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: '自動生成されるURLスラッグ（英数字小文字のみ）',
      options: {
        source: (doc) => `${doc.brand ?? ''}-${doc.name ?? ''}`.trim(),
        slugify: (input) =>
          input
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
      },
      validation: (Rule) =>
        Rule.required().custom((slug: {current?: string} | undefined) => {
          if (!slug?.current) return 'Slug が必要です'
          if (!/^[a-z0-9-]+$/.test(slug.current)) return '英数字小文字とハイフンのみ使用できます'
          return true
        }),
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      description: '配合成分と含有量',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'ingredientRef',
              title: 'Ingredient',
              type: 'reference',
              to: [{type: 'ingredient'}],
              description: '参照する成分',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'amount',
              title: 'Amount',
              type: 'number',
              description: '1回分あたりの量',
              validation: (Rule) => Rule.required().min(0),
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
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'string',
      description: '剤形',
      options: {
        list: [
          {title: 'Capsule', value: 'capsule'},
          {title: 'Powder', value: 'powder'},
          {title: 'Liquid', value: 'liquid'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servingsPerContainer',
      title: 'Servings Per Container',
      type: 'number',
      description: '1ボトルあたりの提供回数',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'priceJPY',
      title: 'Price (JPY)',
      type: 'number',
      description: '税込価格（日本円）',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'urlRakuten',
      title: 'Rakuten URL',
      type: 'url',
      description: '楽天の商品ページURL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'urlAmazon',
      title: 'Amazon URL',
      type: 'url',
      description: 'Amazonの商品ページURL',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'lastCheckedAt',
      title: 'Last Checked At',
      type: 'datetime',
      description: '最終確認日時',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'brand'},
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle}` : undefined,
      }
    },
  },
})

