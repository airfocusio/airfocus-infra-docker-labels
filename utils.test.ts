import { unique, jsonSafeString } from './utils'

it('unique', () => {
  expect(unique([])).toEqual([])
  expect(unique(['1'])).toEqual(['1'])
  expect(unique(['1', '1'])).toEqual(['1'])
  expect(unique(['2', '1', '2', '1'])).toEqual(['2', '1'])
})

it('jsonSafeString', () => {
  expect(jsonSafeString('')).toEqual('')
  expect(jsonSafeString('foo "bar" \'apple\' \\pie\\')).toEqual('foo bar apple pie')
})
