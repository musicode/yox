const toString = Object.prototype.toString

function is(arg, type) {
  return toString.call(arg).toLowerCase() === `[object ${type}]`
}

export function isFunction (arg) {
  return typeof arg === 'function'
}

export function isArray(arg) {
  return is(arg, 'array')
}

export function isObject(arg) {
  return arg && is(arg, 'object')
}

export function isDefined(arg) {
  return typeof arg !== 'undefined'
}

export function isString(arg) {
  return is(arg, 'string')
}
