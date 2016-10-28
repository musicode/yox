
import {
  on,
  off,
} from '../util/dom'

import {
  CALL,
  IDENTIFIER,
  parse,
  compile,
  execute,
} from '../util/expression'

export default {
  attach: function({el, component, keypath, value}) {

    let node = parse(value)

    if (node.type === CALL) {
      let args = node.arguments.map(
        function (item) {
          return item.name
        }
      )
      el.$click = function (e) {
        component.methods[node.callee.name]()
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
