
import {
  get as objectGet,
  has,
  each,
  extend,
} from './object'

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

export function magic(object, name, value) {
  return function (name, value) {
    if (value) {
      object[name] = value
    }
    else {
      if (isObject(name)) {
        each(
          name,
          function (value, name) {
            object[name] = value
          }
        )
      }
      else {
        return object[name]
      }
    }
  }
}

export function testKeypath(instance, keypath) {
  let data = instance.$data
  let terms, target, result

  do {
    result = objectGet(data, keypath)
    if (result) {
      return {
        keypath,
        value: result.value,
      }
    }
    if (!terms) {
      terms = keypath.split('.')
    }
    target = terms.pop()
    terms.pop()
    terms.push(target)
    keypath = terms.join('.')
  }
  while (terms.length)

}

export function get(instance, type, name) {
  let staticProp = `${type}s`
  let instanceProp = `$${staticProp}`
  let value
  if (instance[instanceProp] && has(instance[instanceProp], name)) {
    return instance[instanceProp][name]
  }
  return instance.constructor[staticProp][name]
}

export function set(instance, type, name, value) {
  let prop = `$${type}s`
  if (!instance[prop]) {
    instance[prop] = { }
  }
  instance[prop][name] = value
}
