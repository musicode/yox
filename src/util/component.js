
import {
  get as objectGet,
  has,
  each,
  extend,
} from './object'

import component from '../config/component'
import directive from '../config/directive'
import filter from '../config/filter'
import partial from '../config/partial'

let map = {
  component,
  directive,
  filter,
  partial,
}

export function bind(instance, functions) {
  let result = { }
  each(
    functions,
    function (fn, name) {
      result[name] = fn.bind(instance)
    }
  )
  return result
}

export function testKeypath(instance, keypath, name) {

  let terms = keypath ? keypath.split('.') : [ ]
  if (!name) {
    name = terms.pop()
  }

  let data = instance.$data, result

  do {
    terms.push(name)
    keypath = terms.join('.')
    result = objectGet(data, keypath)
    if (result) {
      return {
        keypath,
        value: result.value,
      }
    }
    terms.splice(-2)
  }
  while (terms.length || keypath.indexOf('.') > 0)

}

export function get(instance, type, name) {
  let prop = `$${type}s`
  if (instance[prop] && has(instance[prop], name)) {
    return instance[prop][name]
  }
  else {
    let value = map[type].get(name)
    if (value) {
      return value
    }
    else {
      throw new Error(`${name} ${type} is not found.`)
    }
  }
}

export function set(instance, type, name, value) {
  let prop = `$${type}s`
  if (!instance[prop]) {
    instance[prop] = { }
  }
  instance[prop][name] = value
}
