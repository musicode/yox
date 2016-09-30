
import {
  doc,
} from '../config/env'

import Event, {
  Emitter,
} from '../util/Event'

import {
  each,
} from '../util/array'


let addEventListener = doc.addEventListener
 ? function (element, type, listener) {
   element.addEventListener(type, listener, false)
 }
 : function (element, type, listener) {
   element.attachEvent(`on$(type)`, listener)
 }

let removeEventListener = doc.removeEventListener
 ? function (element, type, listener) {
   element.removeEventListener(type, listener, false)
 }
 : function (element, type, listener) {
   element.detachEvent(`on$(type)`, listener)
 }

export function on(element, type, listener) {
  let $emitter = element.$emitter || (element.$emitter = new Emitter())
  if (!$emitter.has(type)) {
    let nativeListener = function (e) {
      let event = new Event(e)
      $emitter.fire(event)
    }
    $emitter[type] = nativeListener
    addEventListener(element, type, nativeListener)
  }
  $emitter.on(type, listener)
}

export function off(element, type, listener) {
  let { $emitter } = element
  if (!$emitter) {
    return
  }
  let types = Object.keys(emitters.listeners)
  $emitter.off(type, listener)
  each(types, function (type) {
    if ($emitter[type] && !$emitter.has(type)) {
      removeEventListener(element, type, fn)
      $emitter[type] = null
    }
  })
}
