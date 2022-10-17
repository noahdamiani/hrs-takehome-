import { Mock404SKU, MockRedis, MockSKU } from './../mocks'
import { PriceSearchResSchema, PriceUpdateResSchema } from './../../sdk/schema'
import { insertBestPrice, searchBestPrice } from '../price.logic'

test('Finds the best price, given a SKU', () => {
  expect(searchBestPrice(MockSKU)).toBe(MockRedis.bestPrices[MockSKU])
  expect(searchBestPrice(Mock404SKU)).toBe(
    PriceSearchResSchema.Enum.SKU_NOT_FOUND
  )
})

test('Inserts a new best price for a SKU', () => {
  expect(
    insertBestPrice({
      retailer: 'retailer-1',
      sku: MockSKU,
      price: 230,
    })
  ).toEqual(PriceUpdateResSchema.Enum.PRICE_UNCHANGED)

  expect(
    insertBestPrice({
      retailer: 'retailer-2',
      sku: Mock404SKU,
      price: 200,
    })
  ).toBe(PriceUpdateResSchema.Enum.SKU_NOT_FOUND)

  expect(
    insertBestPrice({
      retailer: 'retailer-3',
      sku: MockSKU,
      price: 1,
    })
  ).toBe(PriceUpdateResSchema.Enum.PRICE_UPDATED)
})
