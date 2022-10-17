import { MockAPIKeys } from '../mocks'
import { isValidAPIKey } from '../tenant'

test('Validates an API key', () => {
  expect(isValidAPIKey(MockAPIKeys.HearstClientOne)).toBe(true)
  expect(isValidAPIKey(MockAPIKeys.HearstClientTwo)).toBe(false)
  expect(isValidAPIKey('12312123')).toBe(false)
})
