import {
  isNumeric,
} from '../util/is'

module.exports = function toNumber(str, defaultValue = 0) {
  if (isNumeric(str)) {
    return +str
  }
  return defaultValue
}
