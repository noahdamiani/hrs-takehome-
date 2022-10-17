import AbortController from 'abort-controller'
import fetch from 'cross-fetch'

export const globalAny = global as any

globalAny.AbortController = AbortController
globalAny.fetch = fetch
