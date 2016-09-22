
import {
  isArray,
} from './is'

let {
  slice,
} = Array.prototype

export function each(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (callback(array[i], i) === false) {
      break
    }
  }
}

export function toArray(array) {
  if (array == null || !('length' in array)) {
    return []
  }
  return isArray(array) ? array : slice.call(array)
}

export function hasItem(array, item) {
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
