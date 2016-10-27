
import camelCase from '../function/camelCase'

import {
  isString,
} from '../util/is'

export function parse(str) {

  let result = { }

  if (isString(str)) {

    let pairs
    let name
    let value

    str.split(';').forEach(function (term) {
      if (term && term.trim()) {
        pairs = term.split(':')
        if (pairs.length === 2) {
          name = pairs[0].trim()
          value = pairs[1].trim()
          if (name) {
            result[camelCase(name)] = value
          }
        }
      }
    })

  }

  return result

}
