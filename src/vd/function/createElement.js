
import {
  doc,
} from '../../config/env'

import {
  TYPE_ELEMENT,
} from '../node'

import {
  each,
} from '../../util/object'

import {
  on,
} from '../../util/dom'

function addAttributes(element, attrs) {
  each(attrs, function (value, key) {
    element.setAttribute(key, value)
  })
}

function addEventListeners(element, events) {
  each(events, function (listener, type) {
    on(element, type, listener)
  })
}

export default function createElement(node) {
  if (node.type === TYPE_ELEMENT) {
    let element = doc.createElement(node.type)

  }
}
