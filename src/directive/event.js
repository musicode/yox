
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
} from '../config/syntax'

function getListenerName(name) {
  return `$${name}`
}

export default {
  attach: function({el, component, keypath, name, value}) {

    let node = parse(value)
    let listener = getListenerName(name)

    if (node.type === CALL) {
      el[listener] = function (e) {
        let args = [
          ...node.arguments,
        ]
        if (!args.length) {
          args.push(e)
        }
        else {
          args = args.map(
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
        }
        component.methods[node.callee.name].apply(component, args)
      }
    }
    else if (node.type === IDENTIFIER) {
      el[listener] = function () {
        component.fire(node.name)
      }
    }

    if (el[listener]) {
      on(el, name, el[listener])
    }
  },
  detach: function ({el, name}) {
    let listener = getListenerName(name)
    if (el[listener]) {
      off(el, name, el[listener])
      el[listener] = null
    }
  }
}
