
import {
  each as arrayEach,
} from './array'

export function each(object, callback) {
  arrayEach(
    Object.keys(object),
    key => callback(object[key], key)
  )
}

export function has(object, name) {
  return object.hasOwnProperty(name)
}

export function find(object, keypath) {
  // object 的 key 可能是 'a.b.c' 这样的
  // 如 data['a.b.c'] = 1 是一个合法赋值
  if (has(object, keypath)) {
    return object[keypath]
  }
  // 不能以 . 开头
  if (keypath.indexOf('.') > 0) {
    let list = keypath.split('.')
    for (let i = 0, len = list.length; i < len && object; i++) {
      if (i < len - 1) {
        object = object[list[i]]
      }
      else if (has(object, list[i])) {
        return object[list[i]]
      }
    }
  }
}
