const toString = Object.prototype.toString

export function isFunction (arg) {
  return typeof arg === 'function'
}

export function isArray(arg) {
  return Array.isArray(arg)
}

export function isObject(arg) {
  return arg && toString.call(arg) === '[object Object]'
}

export function isDefined(arg) {
  return typeof arg !== 'undefined'
}

export function isString(arg) {
  return toString.call(arg) === '[object String]'
}
