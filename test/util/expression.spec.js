
import {
  parse,
  compile,
  traverse,
} from '../../src/util/expression'

describe('util/expression', () => {
  it('parse', () => {

    let fn = compile('a[b].c[0](d)')
    expect(fn({b: [1]})).toBe(1)
return
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
