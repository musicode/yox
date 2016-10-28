
import {
  on,
  off,
} from '../util/dom'

import {
  each,
} from '../util/array'

import {
  stringify,
} from '../util/keypath'

import {
  CALL,
  MEMBER,
  LITERAL,
  IDENTIFIER,
  parse,
  compile,
} from '../util/expression'

import {
  SPECIAL_EVENT,
} from '../syntax'

export default {
  attach: function({el, component, keypath, value}) {

    let node = parse(value)

    if (node.type === CALL) {
      el.$click = function (e) {
        let args = node.arguments.map(
          function (item) {
            let { name, type } = item
            if (type === LITERAL) {
              return item.value
            }
            if (type === IDENTIFIER) {
              if (name === SPECIAL_EVENT) {
                return e
              }
            }
            else if (type === MEMBER) {
              name = stringify(item)
            }
            return component.get(keypath ? `${keypath}.${name}` : name)
          }
        )
        component.methods[node.callee.name].apply(component, args)
      }
    }
    else if (node.type === IDENTIFIER) {
      el.$click = function () {
        component.fire(node.name)
      }
    }

    if (el.$click) {
      on(el, 'click', el.$click)
    }
  },
  detach: function ({el}) {
    if (el.$click) {
      off(el, 'click', el.$click)
      el.$click = null
    }
  }
}
