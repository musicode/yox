
import * as char from '../../src/util/char'

describe('util/char', () => {
  it('isWhitespace', () => {
    expect(
      char.isWhitespace(' ')
    )
    .toBe(true)

    expect(
      char.isWhitespace('\t')
    )
    .toBe(true)

    expect(
      char.isWhitespace('\n')
    )
    .toBe(true)
  })

  it('isBreakLine', () => {
    expect(
      char.isWhitespace('\n')
    )
    .toBe(true)
  })
})
