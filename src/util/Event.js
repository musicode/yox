
import {
  isString,
  isArray,
} from './is'

import {
  each,
  removeItem,
} from './array'

export default class Event {

  constructor(type) {
    this.type = type
    this.isDefaultPrevented = false
    this.isPropagationStoped = false
  }

  preventDefault() {
    if (!this.isDefaultPrevented) {
      this.isDefaultPrevented = true
    }
  }

  stopPropagation() {
    if (!this.isPropagationStoped) {
      this.isPropagationStoped = true
    }
  }

}

export class Emitter {

  constructor() {
    this.listeners = { }
  }

  on(type, listener) {
    let { listeners } = this
    let list = listeners[type] || (listeners[type] = [])
    list.push(listener)
  }

  once(type, listener) {
    let me = this
    me.on(type, function () {
      let result = listener.apply(this, arguments)
      me.off(type, listener)
      return result
    })
  }

  off(type, listener) {
    let list = this.listeners[type]
    if (isArray(list)) {
      removeItem(list, listener)
    }
  }

  fire(type) {

    let event = isString(type)
      ? new Event(type)
      : type

    let list = this.listeners[type]
    if (isArray(list)) {
      each(list, function (listener) {
        let result = listener.call(null, event)
        if (result === false) {
          event.preventDefault()
          event.stopPropagation()
          return false
        }
        if (event.isPropagationStoped()) {
          return false
        }
      })
    }

  }
}
