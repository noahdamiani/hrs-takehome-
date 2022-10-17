import './polyfill'

import { SecurityTopics, serverConfig } from '~/config'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from '~/server/router'
import superjson from 'superjson'

export function createClient(apiKey: string) {
  const { port, prefix } = serverConfig
  const urlEnd = `localhost:${port}${prefix}`
  const trpc = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: `http://${urlEnd}`,
        headers: {
          [SecurityTopics.API_KEY]: apiKey,
        },
      }),
    ],
  })

  return trpc
}

export * from '~/sdk/schema'
