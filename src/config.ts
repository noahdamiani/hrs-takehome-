import type { ServerOptions } from '~/server/instance'

export const serverConfig: ServerOptions = {
  dev: false,
  port: 2022,
  prefix: '/trpc',
}

export enum SecurityTopics {
  API_KEY = 'x-api-key',
}
