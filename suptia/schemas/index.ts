// schemas/index.ts

import blockContent from './blockContent'
import ingredientGuide from './ingredientGuide'
import ingredient from './ingredient'
import product from './product'
import evidence from './evidence'
import rule from './rule'
import persona from './persona'
import post from './post.js'

export const schemaTypes = [
  post,
  ingredientGuide,
  blockContent,
  ingredient,
  product,
  evidence,
  rule,
  persona,
]