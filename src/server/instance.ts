import { SecurityTopics } from '~/config'
import { appRouter } from '~/server/router'
import cors from '@fastify/cors'
import { createContext } from '~/server/router/context'
import fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'

export interface ServerOptions {
  dev?: boolean
  port?: number
  prefix?: string
}

export function createServer(opts: ServerOptions) {
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/trpc'
  const server = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  })

  server.register(cors, {
    allowedHeaders: [SecurityTopics.API_KEY],
  })

  server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  })

  const stop = () => server.close()

  const start = async () => {
    try {
      await server.listen({ port })
      console.log('listening on port', port)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }

  return { server, start, stop }
}
