
import {
  each as arrayEach,
} from './array'

export function each(object, callback) {
  arrayEach(
    Object.keys(object),
    key => callback(object[key], key)
  )
}
