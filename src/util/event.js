
import {
  isArray,
  isString,
  isFunction,
} from './is'

import {
  each,
  hasItem,
  removeItem,
} from './array'

import {
  each as objectEach
} from './object'

export class Event {

  constructor(event) {
    if (event.type) {
      this.type = event.type
      this.originalEvent = event
    }
    else {
      this.type = event
    }
  }

  prevent() {
    if (!this.isPrevented) {
      let { originalEvent } = this
      if (originalEvent && isFunction(originalEvent.preventDefault)) {
        originalEvent.preventDefault()
      }
      this.isPrevented = true
    }
  }

  stop() {
    if (!this.isStoped) {
      let { originalEvent } = this
      if (originalEvent && isFunction(originalEvent.stopPropagation)) {
        originalEvent.stopPropagation()
      }
      this.isStoped = true
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
    let instance = this
    listener.$once = function () {
      instance.off(type, listener)
      delete listener.$once
    }
    instance.on(type, listener)
  }

  off(type, listener) {
    let { listeners } = this
    if (type == null) {
      objectEach(
        listeners,
        function (list, type) {
          if (isArray(listeners[type])) {
            listeners[type].length = 0
          }
        }
      )
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

  fire(type, data, context = null) {

    let list = this.listeners[type]
    if (isArray(list)) {
      each(list, function (listener) {
        let result = listener.apply(context, data)

        let { $once } = listener
        if (isFunction($once)) {
          $once()
        }

        // 如果没有返回 false，而是调用了 event.stop 也算是返回 false
        let event = data[0]
        if (event && event instanceof Event) {
          if (result === false) {
            event.prevent()
            event.stop()
          }
          else if (event.isStoped) {
            result = false
          }
        }

        if (result === false) {
          return result
        }
      })
    }

  }

  has(type, listener) {
    let list = this.listeners[type]
    if (listener == null) {
      // 是否注册过 type 事件
      return isArray(list) && list.length > 0
    }
    return isArray(list)
      ? hasItem(list, listener)
      : false
  }
}
