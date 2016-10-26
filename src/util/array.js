
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

// array.reduce 如果是空数组，不传 initialValue 居然会报错，所以封装一下
export function reduce(array, callback, initialValue = null) {
  return array.reduce(callback, initialValue)
}

export function toArray(array) {
  try {
    'length' in array
  }
  catch (e) {
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
