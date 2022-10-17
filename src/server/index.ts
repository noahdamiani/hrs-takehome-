import { createServer } from './instance'
import { serverConfig } from '~/config'

createServer(serverConfig)
  .start()
  .catch((error) => console.log(error))
