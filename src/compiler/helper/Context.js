
import {
  has,
  find,
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

  lookup(keypath) {

    let context = this
    let { cache } = context
    if (has(cache, keypath)) {
      return cache[keypath]
    }

    let value
    while (context) {
      value = find(context.data, keypath)
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
