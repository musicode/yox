
import {
  on,
  off,
} from '../util/dom'

import {
  each,
} from '../util/array'

import {
  CALL,
  LITERAL,
  IDENTIFIER,
  parse,
  compile,
  execute,
} from '../util/expression'

import {
  EVENT,
} from '../syntax'

export default {
  attach: function({el, component, keypath, value}) {

    let node = parse(value)

    if (node.type === CALL) {
      el.$click = function (e) {
        let args = node.arguments.map(
          function (item) {
            if (item.type === IDENTIFIER) {
              if (item.name === EVENT) {
                return e
              }
              return component.get(keypath ? `${keypath}.${item.name}` : item.name)
            }
            else if (item.type === LITERAL) {
              return item.value
            }
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
    }
  }
}
