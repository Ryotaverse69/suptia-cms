import {sanityClient} from './sanityClient'
import {Result, Ok, Err} from '@/lib/result'

export type Ingredient = {
  _id: string
  name: string
  slug: {current: string}
  category?: string
  evidenceLevel?: 'A' | 'B' | 'C'
}

export type Product = {
  _id: string
  brand: string
  name: string
  slug: {current: string}
  priceJPY?: number
  servingsPerContainer?: number
  ingredients?: {ingredientRef: {slug: {current: string}}; amount?: number; unit?: string}[]
}

export type Guide = {
  _id: string
  title: string
  slug: {current: string}
  summary?: string
  mainImage?: {asset?: {url?: string}}
}

export async function getIngredientBySlug(slug: string): Promise<Result<Ingredient | null, Error>> {
  const query = `*[_type == "ingredient" && slug.current == $slug][0]{
    _id, name, slug, category, evidenceLevel
  }`
  try {
    const res = await sanityClient.fetch<Ingredient | null>(query, {slug})
    return Ok(res ?? null)
  } catch (e) {
    return Err(e as Error)
  }
}

export async function getProductBySlug(slug: string): Promise<Result<Product | null, Error>> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id, brand, name, slug, priceJPY, servingsPerContainer,
    ingredients[]{
      amount, unit,
      ingredientRef->{slug}
    }
  }`
  try {
    const res = await sanityClient.fetch<Product | null>(query, {slug})
    return Ok(res ?? null)
  } catch (e) {
    return Err(e as Error)
  }
}

export async function getProductsByIngredient(ingredientSlug: string): Promise<Result<Product[], Error>> {
  const query = `*[_type == "product" && count(ingredients[ingredientRef->slug.current == $slug]) > 0]{
    _id, brand, name, slug, priceJPY, servingsPerContainer,
    ingredients[]{
      amount, unit,
      ingredientRef->{slug}
    }
  }`
  try {
    const res = await sanityClient.fetch<Product[]>(query, {slug: ingredientSlug})
    return Ok(Array.isArray(res) ? res : [])
  } catch (e) {
    return Err(e as Error)
  }
}

export async function getLatestGuides(limit = 12): Promise<Result<Guide[], Error>> {
  const query = `*[_type == "ingredientGuide"] | order(_createdAt desc) [0...$limit]{
    _id, title, slug, summary, mainImage
  }`
  try {
    const res = await sanityClient.fetch<Guide[]>(query, {limit})
    return Ok(Array.isArray(res) ? res : [])
  } catch (e) {
    return Err(e as Error)
  }
}


