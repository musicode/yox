
import {
  isObject,
} from './util/is'

import {
  each,
} from './util/object'

import event from './directive/event'

let directives = { }

export function add(name, mod) {
  if (isObject(name)) {
    each(name, function (value, key) {
      add(key, value)
    })
    return
  }
  directives[name] = mod
}

export function remove(name, mod) {
  if (name in directives) {
    delete directives[name]
  }
}

export function get(name) {
  return directives[name]
}

add('event', event)
