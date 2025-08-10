/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

export type EventMap = {
  search_performed: { query: string | null }
  diagnosis_completed: { goalsCount: number; budgetJPY: number; pregnancyOrLactation: boolean }
  recommendation_shown: { productCount: number }
  product_detail_view: { slug: string; brand?: string; name?: string; priceJPY?: number | null }
  external_clickout: { destination: 'amazon' | 'rakuten' | 'other'; productSlug?: string; url?: string }
}

export function track<E extends keyof EventMap>(event: E, params: EventMap[E]): void {
  try {
    if (typeof window === 'undefined') return
    if (typeof window.gtag === 'function') {
      window.gtag('event', event as string, params)
      return
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  } catch {
    // no-op
  }
}


