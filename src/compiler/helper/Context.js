
import {
  has,
  get,
  set,
} from '../../util/object'

export default class Context {

  constructor(data, parent) {
    this.data = data
    this.parent = parent
    this.cache = {
      '.': data
    }
  }

  push(data) {
    return new Context(data, this)
  }

  set(keypath, value) {
    let { data } = this
    if (keypath.indexOf('.') > 0) {
      let terms = keypath.split('.')
      let prop = terms.pop()
      let context = find(data, terms.join('.'))
      if (context != null) {
        context[prop] = value
      }
    }
    else {
      data[keypath] = value
    }
  }

  lookup(keypath) {

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
