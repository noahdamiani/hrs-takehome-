import { PriceUpdate } from '~/sdk'

export enum MockAPIKeys {
  HearstClientOne = 'c8ca14e8-4a3b-4e98-b704-f6d435d663ad',
  HearstClientTwo = '72f7ec41-da65-4169-a419-9333146270e5',
}

interface Tenant {
  retailer: string
  scopes: string[]
  origins: string[]
}

// Mock Tenants
export const MockAPIKeyStorage: Record<string, Tenant> = {
  [MockAPIKeys.HearstClientOne]: {
    retailer: 'hearst-client-one',
    scopes: ['update-pricing'],
    origins: ['http://localhost:3000'],
  },
  [MockAPIKeys.HearstClientTwo]: {
    retailer: 'hearst-outdated-client',
    scopes: [],
    origins: [],
  },
}

// Type signature for mock databases
interface MockDBs {
  redis: {
    bestPrices: Record<string, number>
  }
  nosql: {
    pricingUpdates: PriceUpdate[]
  }
}

// Mock redis instance
export const MockRedis: MockDBs['redis'] = {
  bestPrices: {
    '1234': 30,
    '2345': 23.23,
    '9123': 18.23,
  },
}

// MockNoSql Instance
export const MockNoSQL: MockDBs['nosql'] = {
  pricingUpdates: [],
}

export const MockSKU = '1234'

export const Mock404SKU = 'nonexistentsku'
