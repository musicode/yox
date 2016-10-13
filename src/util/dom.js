
import {
  doc,
} from '../config/env'

import {
  Event,
  Emitter,
} from '../util/event'

import {
  isBoolean,
} from '../util/is'

import {
  each,
} from '../util/array'

import toString from '../function/toString'

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
      $emitter.fire(event)
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
 * 属性的 getter/setter
 *
 * @param {HTMLElement} element
 * @param {string} name
 * @param {?(string|number\boolean)} value
 * @return {?string}
 */
export function attr(element, name, value) {
  if (value == null) {
    return toString(
      element.getAttribute(name),
      ''
    )
  }

  if (isBoolean(value)) {
    element[name] = value
  }
  else {
    value = toString(value, null)
    if (value == null) {
      throw new Error(
        'attr(element, name, value) value must be a string or a number.'
      )
    }
  }
  element.setAttribute(name, value)
}

/**
 * 删除节点
 *
 * @param {HTMLNode} node
 */
export function removeNode(node) {
  let { parentNode } = node
  if (parentNode) {
    parentNode.removeChild(node)
  }
}

/**
 * 替换节点
 *
 * @param {HTMLNode} newNode
 * @param {HTMLNode} oldNode
 */
export function replaceNode(newNode, oldNode) {
  let { parentNode } = node
  if (parentNode) {
    parentNode.replaceChild(newNode, oldNode)
  }
}

/**
 * 创建元素节点
 *
 * @param {string} tag
 * @return {HTMLElementNode}
 */
export function createElementNode(tag) {
  return doc.createElement(tag)
}


/**
 * 创建文本节点
 *
 * @param {string} content
 * @return {HTMLTextNode}
 */
export function createTextNode(content) {
  return doc.createTextNode(content)
}

/**
 * 创建注释节点
 *
 * @param {string} content
 * @return {HTMLCommentNode}
 */
export function createCommentNode(content) {
  return doc.createComment(content)
}
