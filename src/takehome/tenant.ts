import { MockAPIKeyStorage } from './mocks'

export function isValidAPIKey(key: string | string[] | undefined) {
  if (typeof key === 'string' && key in MockAPIKeyStorage) {
    const maybeKey = MockAPIKeyStorage[key]

    if (maybeKey) {
      return Boolean(maybeKey?.scopes?.length > 0)
    }
  }

  return false
}
