import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'evidence',
  title: 'Evidence',
  type: 'document',
  fields: [
    defineField({
      name: 'ingredientRef',
      title: 'Ingredient',
      type: 'reference',
      to: [{type: 'ingredient'}],
      description: '対象となる成分参照',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'studyType',
      title: 'Study Type',
      type: 'string',
      description: '研究デザイン',
      options: {
        list: [
          {title: 'Randomized Controlled Trial (RCT)', value: 'RCT'},
          {title: 'Meta-analysis', value: 'Meta'},
          {title: 'Observational', value: 'Obs'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'n',
      title: 'Sample Size (n)',
      type: 'number',
      description: 'サンプルサイズ（被験者数）',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
      description: '主要アウトカムの要約',
      validation: (Rule) => Rule.required().min(1).max(400),
    }),
    defineField({
      name: 'population',
      title: 'Population',
      type: 'string',
      description: '対象集団（例：成人、女性、特定疾患など）',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: '論文タイトル',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'doi',
          title: 'DOI',
          type: 'string',
          description: 'Digital Object Identifier',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: '論文またはソースのURL',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'year',
          title: 'Year',
          type: 'number',
          description: '出版年',
          validation: (Rule) => Rule.min(1900).max(2100),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'qualityScore',
      title: 'Quality Score',
      type: 'number',
      description: '研究の品質スコア（0-100）',
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {title: 'citation.title', subtitle: 'studyType'},
  },
})

