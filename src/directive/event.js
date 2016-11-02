
import {
  on,
  off,
} from '../native/dom/helper'

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

module.exports = {

  attach: function({ el, name, node, component }) {

    let listener
    let ast = parse(node.getValue())

    if (ast.type === CALL) {
      listener = function (e) {
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
        component[ast.callee.name].apply(component, args)
      }
    }
    else if (ast.type === IDENTIFIER) {
      listener = function () {
        component.fire(ast.name)
      }
    }

    if (listener) {
      let { $component } = el
      if ($component) {
        $component.on(name, listener)
      }
      else {
        on(el, name, listener)
      }
      el[`$${name}`] = listener
    }

  },

  detach: function ({ el, name, node }) {
    let listener = `$${name}`
    if (el[listener]) {
      let { $component } = el
      if ($component) {
        $component.off(name, el[listener])
      }
      else {
        off(el, name, el[listener])
      }
      el[listener] = null
    }
  }
}
