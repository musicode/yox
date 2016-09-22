import {
  isNumeric,
} from '../util/is'

export default function toNumber(str, defaultValue = 0) {
  if (isNumeric(str)) {
    return +str
  }
  return defaultValue
}
