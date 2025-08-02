export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'タイトル', type: 'string' },
    { name: 'slug', title: 'スラッグ', type: 'slug', options: { source: 'title' } },
    { name: 'category', title: 'カテゴリ', type: 'string', options: { list: ['Ingredient Guide'] } },
    { name: 'body', title: '本文', type: 'array', of: [{ type: 'block' }] },
    { name: 'mainImage', title: '画像', type: 'image' },
  ],
};