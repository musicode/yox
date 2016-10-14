
import {
  each,
} from '../util/array'

export default function getLocationByIndex(str, index) {

  let line = 0
  let col = 0

  let pos = 0

  each(str.split('\n'), function (line) {
    line++
    col = 0

    if (index >= pos && index <= (pos += line.length)) {
      col = index - pos
      return false
    }
  })

  return {
    line,
    col,
  }

}
