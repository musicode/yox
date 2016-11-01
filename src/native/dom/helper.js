
import {
  doc,
} from '../../config/env'

import {
  Event,
  Emitter,
} from '../../util/event'

import {
  each,
} from '../../util/array'

import {
  isString,
} from '../../util/is'

import camelCase from '../../function/camelCase'

let isModernBrowser = doc.addEventListener

// 处理底层的事件函数
let nativeAddEventListener = isModernBrowser
 ? function (element, type, listener) {
   element.addEventListener(type, listener, false)
 }
 : function (element, type, listener) {
   element.attachEvent(`on$(type)`, listener)
 }

let nativeRemoveEventListener = isModernBrowser
 ? function (element, type, listener) {
   element.removeEventListener(type, listener, false)
 }
 : function (element, type, listener) {
   element.detachEvent(`on$(type)`, listener)
 }

class IEEvent {

  constructor(event, element) {

    Object.assign(this, event)

    this.currentTarget = element
    this.target = event.srcElement || element
    this.originalEvent = event

  }

  preventDefault() {
   this.originalEvent.returnValue = false
  }

  stopPropagation() {
    this.originalEvent.cancelBubble = true
  }

}

// 把 IE 事件模拟成标准事件
let createEvent = isModernBrowser
  ? function (event) {
    return event
  }
  : function (event, element) {
    return IEEvent(event, element)
  }


/**
 * 绑定事件
 *
 * @param {HTMLElement} element
 * @param {string} type
 * @param {Function} listener
 */
export function on(element, type, listener) {
  let $emitter = element.$emitter || (element.$emitter = new Emitter())
  if (!$emitter.has(type)) {
    let nativeListener = function (e) {
      let event = new Event(createEvent(e, element))
      $emitter.fire(event.type, [event])
    }
    $emitter[type] = nativeListener
    nativeAddEventListener(element, type, nativeListener)
  }
  $emitter.on(type, listener)
}

/**
 * 解绑事件
 *
 * @param {HTMLElement} element
 * @param {string} type
 * @param {Function} listener
 */
export function off(element, type, listener) {
  let { $emitter } = element
  if (!$emitter) {
    return
  }
  let types = Object.keys(emitters.listeners)
  $emitter.off(type, listener)
  each(types, function (type) {
    if ($emitter[type] && !$emitter.has(type)) {
      nativeRemoveEventListener(element, type, $emitter[type])
      delete $emitter[type]
    }
  })
}

/**
 * 通过选择器查找元素
 *
 * @param {string} selector
 * @param {?HTMLElement} context
 * @return {?HTMLElement}
 */
export function find(selector, context = doc) {
  return context.querySelector(selector)
}

/**
 * 把 style-name: value 解析成对象的形式
 *
 * @param {string} str
 * @return {Object}
 */
export function parseStyle(str) {
  let result = { }

  if (isString(str)) {

    let pairs
    let name
    let value

    str.split(';').forEach(function (term) {
      if (term && term.trim()) {
        pairs = term.split(':')
        if (pairs.length === 2) {
          name = pairs[0].trim()
          value = pairs[1].trim()
          if (name) {
            result[camelCase(name)] = value
          }
        }
      }
    })

  }

  return result
}
