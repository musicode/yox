
import {
  isString,
  isArray,
} from './is'

import {
  each as eachArray,
  hasItem,
  removeItem,
} from './array'

import {
  each as eachObject
} from './object'

export default class Event {

  constructor(event) {
    if (event.type) {
      this.type = event.type
      this.original = event
    }
    else {
      this.type = event
    }
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
    let { listeners } = this
    if (type == null) {
      eachObject(listeners, function (list, type) {
        if (isArray(listeners[type])) {
          listeners[type].length = 0
        }
      })
    }
    else {
      let list = listeners[type]
      if (isArray(list)) {
        if (listener == null) {
          list.length = 0
        }
        else {
          removeItem(list, listener)
        }
      }
    }
  }

  fire(type) {

    let event = isString(type)
      ? new Event(type)
      : type

    let list = this.listeners[type]
    if (isArray(list)) {
      eachArray(list, function (listener) {
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

  has(type, listener) {

    let list = this.listeners[type]
    if (listener == null) {
      return isArray(list) && list.length > 0
    }

    return isArray(list)
      ? hasItem(list, listener)
      : false

  }
}
