
import {
  has,
  get,
  set,
} from '../../util/object'

module.exports = class Context {

  /**
   * @param {Object} data
   * @param {?Context} parent
   */
  constructor(data, parent) {
    this.data = data
    this.parent = parent
    this.cache = {
      'this': data
    }
  }

  push(data) {
    return new Context(data, this)
  }

  set(keypath, value) {
    let { data, cache } = this
    if (has(cache, keypath)) {
      delete cache[keypath]
    }
    if (keypath.indexOf('.') > 0) {
      let terms = keypath.split('.')
      let prop = terms.pop()
      let context = get(data, terms.join('.'))
      if (context != null) {
        context[prop] = value
      }
    }
    else {
      data[keypath] = value
    }
  }

  get(keypath) {

    let context = this
    let { cache } = context
    if (has(cache, keypath)) {
      return cache[keypath]
    }

    let value
    while (context) {
      value = get(context.data, keypath)
      if (typeof value !== 'undefined') {
        cache[keypath] = value
        break
      }
      else {
        context = context.parent
      }
    }

    return value

  }
}
