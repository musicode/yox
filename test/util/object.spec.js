
import * as object from '../../src/util/object'

describe('util/object', () => {
  it('each callback params', () => {
    let key = 'a'
    let value = 1
    let test = {
      [key]: value
    }
    let firstIsValue = false
    let secondIsKey = false
    object.each(test, (v, k) => {
      if (value === v) {
        firstIsValue = true
      }
      if (key === k) {
        secondIsKey = true
      }
    })
    expect(firstIsValue).toBe(true)
    expect(secondIsKey).toBe(true)
  })

  it('each interrupt', () => {
    let test = {
      a: 'a',
      b: 'b',
      c: 'c',
    }
    let index = 0
    object.each(test, (value, key) => {
      index++
      if (key === 'b') {
        return false
      }
    })
    expect(index).not.toBe(3)
  })
})
