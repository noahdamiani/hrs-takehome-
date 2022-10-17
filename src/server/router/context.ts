import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { SecurityTopics } from '~/config'
import { inferAsyncReturnType } from '@trpc/server'
import { isValidAPIKey } from '~/takehome/tenant'

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const authorized = isValidAPIKey(req.headers[SecurityTopics.API_KEY])
  return { req, res, authorized }
}

export type Context = inferAsyncReturnType<typeof createContext>
