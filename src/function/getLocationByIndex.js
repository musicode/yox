
import {
  each,
} from '../util/array'

module.exports = function getLocationByIndex(str, index) {

  let line = 0
  let col = 0

  let pos = 0

  each(str.split('\n'), function (lineStr) {
    line++
    col = 0

    let { length } = lineStr
    if (index >= pos && index <= (pos + length)) {
      col = index - pos
      return false
    }

    pos += length
  })

  return {
    line,
    col,
  }

}
