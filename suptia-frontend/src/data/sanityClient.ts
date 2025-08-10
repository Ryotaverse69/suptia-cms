import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
  stega: {enabled: false},
  // Next.js App Router ISR
  fetch: (input, init) => fetch(input, {...init, next: {revalidate: 60}}),
})

export type SanityImage = {
  asset?: {url?: string}
}


