
import uuid from '../../src/function/uuid'

describe('function/uuid', () => {
  it('return value is a string', () => {
    expect(
      typeof uuid()
    )
    .toBe('string')
  })
  it('unique', () => {
    let map = {}
    let isUnique = true
    for (let i = 0; i < 10000; i++) {
      let id = uuid()
      if (map[id]) {
        isUnique = false
        break
      }
      else {
        map[id] = true
      }
    }
    expect(isUnique).toBe(true)
  })
})
