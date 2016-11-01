import snabbdom from 'snabbdom'

import h from 'snabbdom/h'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import attributes from 'snabbdom/modules/attributes'

const applyPatch = snabbdom.init([ props, attributes, style ])

import {
  parseStyle,
} from './helper'

import {
  each,
  count,
} from '../../util/object'

import {
  isArray,
  isFunction,
} from '../../util/is'

import {
  TEXT,
  ATTRIBUTE,
  DIRECTIVE,
  ELEMENT,
} from '../../compiler/nodeType'

import * as syntax from '../../config/syntax'
import * as lifecycle from '../../config/lifecycle'

export function create(node, component) {

  let counter = 0

  let { $directives } = component

  let traverse = function (node, enter, leave) {

    if (enter(node) === false) {
      return
    }

    let children = [ ]
    if (isArray(node.children)) {
      each(
        node.children,
        function (item) {
          item = traverse(item, enter, leave)
          if (item != null) {
            children.push(item)
          }
        }
      )
    }

    return leave(node, children)

  }

  return traverse(
    node,
    function (node) {
      counter++
      if (node.type === ATTRIBUTE || node.type === DIRECTIVE) {
        return false
      }
    },
    function (node, children) {
      counter--
      if (node.type === ELEMENT) {

        let attrs = { }
        let directives = { }
        let styles

        node.directives.forEach(function (node) {
          let { name } = node

          let directiveName
          if (name.startsWith(syntax.DIRECTIVE_EVENT_PREFIX)) {
            name = name.substr(syntax.DIRECTIVE_EVENT_PREFIX.length)
            directiveName = 'event'
          }
          else {
            name =
            directiveName = name.substr(syntax.DIRECTIVE_PREFIX.length)
          }

          let directive = $directives[directiveName]
          if (!directive) {
            throw new Error(`${directiveName} directive is not existed.`)
          }

          directives[name] = { node, directive }
        })

        // 组件的 attrs 作为 props 传入组件，不需要写到元素上
        if (isFunction(node.create)) {
          directives.component = {
            node,
            directive: $directives.component,
          }
        }
        else {
          each(
            node.getAttributes(),
            function (value, key) {
              if (key === 'style') {
                styles = parseStyle(value)
              }
              else {
                attrs[key] = value
              }
            }
          )
        }

        let data = { attrs }

        if (styles) {
          data.style = styles
        }

        let hasDirective = count(directives)
        if (!counter || hasDirective) {
          let notify = function (vnode, type) {
            if (hasDirective) {
              each(
                directives,
                function (item) {
                  if (isFunction(item.directive[type])) {
                    item.directive[type]({
                      el: vnode.elm,
                      node: item.node,
                      component,
                      directives,
                    })
                  }
                }
              )
            }
          }

          data.hook = {
            insert: function (vnode) {
              notify(vnode, lifecycle.ATTACH)
            },
            update: function (oldNode, vnode) {
              notify(vnode, lifecycle.UPDATE)
            },
            destroy: function (vnode) {
              notify(vnode, lifecycle.DETACH)
            }
          }
        }

        return h(node.name, data, children)
      }
      else if (node.type === TEXT) {
        return node.content
      }
    }
  )

}

export function patch(oldNode, newNode) {
  return applyPatch(oldNode, newNode)
}
