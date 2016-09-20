
import {
  isArray,
} from './is'

let {
  slice,
} = Array.prototype

export function toArray(array) {
  if (array == null || !('length' in array)) {
    return []
  }
  return isArray(array) ? array : slice.call(array)
}

export function inArray(array, item) {
  return array.indexOf(item) >= 0
}

export function lastItem(array) {
  return array[array.length - 1]
}

export function removeItem(array, item) {
  let index = array.indexOf(item)
  if (index >= 0) {
    array.splice(index, 1)
  }
}
