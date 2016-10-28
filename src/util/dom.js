
import {
  doc,
} from '../config/env'

import {
  Event,
  Emitter,
} from '../util/event'

import {
  each,
} from '../util/array'

// 处理底层的事件函数
let nativeAddEventListener = doc.addEventListener
 ? function (element, type, listener) {
   element.addEventListener(type, listener, false)
 }
 : function (element, type, listener) {
   element.attachEvent(`on$(type)`, listener)
 }

let nativeRemoveEventListener = doc.removeEventListener
 ? function (element, type, listener) {
   element.removeEventListener(type, listener, false)
 }
 : function (element, type, listener) {
   element.detachEvent(`on$(type)`, listener)
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
      let event = new Event(e)
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
