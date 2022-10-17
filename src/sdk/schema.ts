import { z } from 'zod'

export type PriceUpdate = z.infer<typeof PriceUpdateSchema>
export const PriceUpdateSchema = z.object({
  retailer: z.string(),
  sku: z.string(),
  price: z.number(),
  url: z.optional(z.string().url()),
})

export type PriceUpdateRes = z.infer<typeof PriceUpdateResSchema>
export const PriceUpdateResSchema = z.enum([
  'PRICE_UPDATED',
  'PRICE_UNCHANGED',
  'SKU_NOT_FOUND',
])

export const PriceSearchSchema = z.string()
export type PriceSearch = z.infer<typeof PriceSearchSchema>

export type PriceSearchRes = z.infer<typeof PriceSearchResSchema>
export const PriceSearchResSchema = z.enum(['SKU_NOT_FOUND'])
