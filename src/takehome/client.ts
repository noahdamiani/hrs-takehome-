import { MockAPIKeys, MockSKU } from './mocks'

import { createClient } from '~/sdk'

const client = createClient(MockAPIKeys.HearstClientOne)

const testPayloads = [
  {
    url: 'https://google.com',
    retailer: 'hearst-client-one',
    sku: MockSKU,
    price: 50.23,
  },
  {
    url: 'https://google.com',
    retailer: 'hearst-client-one',
    sku: MockSKU,
    price: 10.23,
  },
  {
    url: 'https://google.com',
    retailer: 'hearst-client-one',
    sku: MockSKU,
    price: 30,
  },
  {
    retailer: 'hearst-client-two',
    sku: '312123123',
    price: 12,
  },
]

async function main() {
  for (const payload of testPayloads) {
    const result = await client.skuPricing.update.mutate(payload)
    console.log(
      `sku:update >> SKU #${payload.sku} $${payload.price} \n-> ${result}\n`
    )
  }

  for (const payload of testPayloads) {
    const bestPrice = await client.skuPricing.search.query(payload.sku)
    console.log(`>> best price for SKU #${payload.sku}: ${bestPrice}`)
  }
}

main().catch((error) => console.log(error))
