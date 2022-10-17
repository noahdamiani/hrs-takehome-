import { PriceSearchSchema, PriceUpdateSchema } from '~/sdk/schema'
import { insertBestPrice, searchBestPrice } from './price.logic'
import { publicProcedure, router } from '~/server/router/trpc'

export const skuPricing = router({
  update: publicProcedure
    .input(PriceUpdateSchema)
    .mutation(({ input }) => insertBestPrice(input)),

  search: publicProcedure
    .input(PriceSearchSchema)
    .query(({ input }) => searchBestPrice(input)),
})
