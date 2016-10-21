
import {
  parse,
  traverse,
} from '../../src/util/expression'

describe('util/expression', () => {
  it('parse', () => {

    let fn = parse('a + b')
console.log(JSON.stringify(fn, null, 4))
    return
    expect(fn(1, 2)).toBe(3)

    fn = parse('a > 1')
    expect(fn(2)).toBe(true)
    expect(fn(1)).toBe(false)

    fn = parse('a ? 1 : 0')
    expect(fn(true)).toBe(1)
    expect(fn(false)).toBe(0)

    fn = parse('(a + b) ? 1 : 0')
    expect(fn(1, 0)).toBe(1)
    expect(fn(0, 0)).toBe(0)

  })
})
