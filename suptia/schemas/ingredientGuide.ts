// schemas/ingredientGuide.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredientGuide',
  title: 'Ingredient Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '成分名 (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URLスラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'アイキャッチ画像 (Main image)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: '概要 (Summary)',
      type: 'text',
      rows: 3,
      description: '記事一覧などで表示される短い要約です。',
    }),
    defineField({
      name: 'body',
      title: '本文 (Body)',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})