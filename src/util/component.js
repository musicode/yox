
import {
  has,
  each,
  extend,
} from './object'


export function bind(instance, functions) {
  let result = { }
  each(functions, function (fn, name) {
    result[name] = fn.bind(instance)
  })
  return result
}

export function create(instance, options, extra) {
  return new instance.constructor(
    extend({}, options, extra)
  )
}

export function magic(object, name, value) {
  return function (name, value) {
    if (value) {
      object[name] = value
    }
    else {
      if (isObject(name)) {
        objectEach(name, function (value, name) {
          object[name] = value
        })
      }
      else {
        return object[name]
      }
    }
  }
}

export function get(instance, type, name) {
  let staticProp = type + 's'
  let instanceProp = '$' + staticProp
  let value
  if (instance[instanceProp] && has(instance[instanceProp], name)) {
    return instance[instanceProp][name]
  }
  return instance.constructor[staticProp][name]
}

export function set(instance, type, name, value) {
  let prop = '$' + type + 's'
  if (!instance[prop]) {
    instance[prop] = { }
  }
  instance[prop][name] = value
}
