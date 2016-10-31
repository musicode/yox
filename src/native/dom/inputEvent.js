
import {
  doc,
} from '../../config/env'

import {
  on as addDomListener,
  off as removeDomListener,
} from './helper'

const supportInputEvent = 'oninput' in doc.createElement('input')

let addListener
let removeListener

if (supportInputEvent) {
  addListener = function (el, listener) {
    addDomListener(el, 'input', listener)
  }
  removeListener = function (el, listener) {
    removeDomListener(el, 'input', listener)
  }
}
else {
  addListener = function (el, listener) {
    let oldValue = el.value
    listener.$listener = function (e) {
      if (e.originalEvent.propertyName === 'value') {
          let newValue = el.value
          if (newValue !== oldValue) {
              listener.call(this, e)
              oldValue = newValue;
          }
      }
    }
    addDomListener(el, 'propertychange', listener.$listener)
  }
  removeListener = function (el, listener) {
    removeDomListener(el, 'propertychange', listener.$listener)
    delete listener.$listener
  }
}

export function on(el, listener) {
  addListener(el, listener)
}

export function off(el, listener) {
  removeListener(el, listener)
}
