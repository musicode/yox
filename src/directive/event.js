
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

import * as syntax from '../config/syntax'

export default {
  attach: function({el, node, component}) {

    let name = node.name.substr(syntax.DIRECTIVE_EVENT_PREFIX.length)
    let listener = `$${name}`

    let ast = parse(node.getValue())

    if (ast.type === CALL) {
      el[listener] = function (e) {
        let args = [
          ...ast.arguments,
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
                if (name === syntax.SPECIAL_EVENT) {
                  return e
                }
              }
              else if (type === MEMBER) {
                name = stringify(item)
              }
              return component.get(node.keypath ? `${node.keypath}.${name}` : name)
            }
          )
        }
        component.methods[ast.callee.name].apply(component, args)
      }
    }
    else if (ast.type === IDENTIFIER) {
      el[listener] = function () {
        component.fire(ast.name)
      }
    }

    if (el[listener]) {
      on(el, name, el[listener])
    }
  },
  detach: function ({el, node}) {
    let name = node.name.substr(syntax.DIRECTIVE_EVENT_PREFIX.length)
    let listener = `$${name}`
    if (el[listener]) {
      off(el, name, el[listener])
      el[listener] = null
    }
  }
}
