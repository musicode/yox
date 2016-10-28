
import {
  on,
  off,
} from '../util/dom'

import * as inputEvent from '../util/inputEvent'

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
  attach: function({el, component, keypath, name, value}) {

    let node = parse(value)
    let prop = `__${name}`

    if (node.type === CALL) {
      el[prop] = function (e) {
        let args = [
          ...node.arguments
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
      el[prop] = function () {
        component.fire(node.name)
      }
    }

    if (el[prop]) {
      on(el, name, el[prop])
    }
  },
  detach: function ({el, name}) {
    let prop = `__${name}`
    if (el[prop]) {
      off(el, name, el[prop])
      el[prop] = null
    }
  }
}
