import {
  isString,
  isNumeric,
} from '../util/is'

export default function toString(str, defaultValue = '') {
  if (isString(str)) {
    return str
  }
  if (isNumeric(str)) {
    return '' + str
  }
  return defaultValue
}
