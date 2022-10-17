import { router } from './trpc'
import { skuPricing } from '~/takehome/price.service'

export const appRouter = router({
  skuPricing,
})

export type AppRouter = typeof appRouter
