import { MockNoSQL, MockRedis } from './mocks'
import {
  PriceSearchResSchema,
  PriceUpdate,
  PriceUpdateResSchema,
} from '../sdk/schema'

const mockQueue = {
  add(callback: () => void) {
    callback()
  },
}

export function insertBestPrice(pricingUpdate: PriceUpdate) {
  const dbSKU = MockRedis.bestPrices[pricingUpdate.sku]

  // SKU does not exist. Important that we check == null for the case !x where x = 0
  if (dbSKU == null) {
    return PriceUpdateResSchema.Enum.SKU_NOT_FOUND
  }

  // Price in DB is better, or the same
  if (dbSKU <= pricingUpdate.price) {
    return PriceUpdateResSchema.Enum.PRICE_UNCHANGED
  }

  // Price in DB is higher than request price, update the value
  if (dbSKU > pricingUpdate.price) {
    // Note, this would use the redis sdk, we just set the value of the object here.
    MockRedis.bestPrices[pricingUpdate.sku] = pricingUpdate.price
  }

  // Historical storage, could be analytic provider such as segment, could be nosql/sql db
  // The point here is that the activity to track updates is less urgent, so we will add
  // the task to a background process. Note: this block could be moved to the top in
  // order to track all updates, even failed attempts.
  mockQueue.add(() => {
    MockNoSQL.pricingUpdates.push(pricingUpdate)
  })

  return PriceUpdateResSchema.Enum.PRICE_UPDATED
}

export function searchBestPrice(sku: string) {
  const dbSKU = MockRedis.bestPrices[sku]

  if (dbSKU != null) {
    return dbSKU
  }

  return PriceSearchResSchema.Enum.SKU_NOT_FOUND
}
