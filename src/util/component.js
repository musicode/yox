
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

export function testKeypath(instance, keypath, name) {

  let terms = keypath.split('.')
  if (!name) {
    name = terms.pop()
  }

  let data = instance.$data
  let result

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
  while (terms.length)

}

export function get(instance, type, name) {
  let staticProp = `${type}s`
  let instanceProp = `$${staticProp}`
  if (instance[instanceProp] && has(instance[instanceProp], name)) {
    return instance[instanceProp][name]
  }
  else if (has(instance.constructor[staticProp], name)) {
    return instance.constructor[staticProp][name]
  }
  else {
    throw new Error(`${name} ${type} is not found.`)
  }
}

export function set(instance, type, name, value) {
  let prop = `$${type}s`
  if (!instance[prop]) {
    instance[prop] = { }
  }
  instance[prop][name] = value
}
