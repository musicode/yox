import snabbdom from 'snabbdom'

import h from 'snabbdom/h'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import attributes from 'snabbdom/modules/attributes'

const applyPatch = snabbdom.init([ props, attributes, style ])

import {
  parse as parseStyle,
} from './style'

import {
  each,
  count,
} from '../util/object'

import {
  isArray,
  isFunction,
} from '../util/is'

import {
  TEXT,
  ATTRIBUTE,
  DIRECTIVE,
  ELEMENT,
} from '../compiler/nodeType'

import * as syntax from '../config/syntax'
import * as lifecycle from '../config/lifecycle'

export function create(node, component) {

  let counter = 0

  let allDirectives = component.directives

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

        let isRootElement = !counter

        node.attrs.forEach(function (node) {
          if (node.name === 'style') {
            styles = parseStyle(node.getValue())
          }
          else {
            attrs[node.name] = node.getValue()
          }
        })

        node.directives.forEach(function (node) {
          let { name } = node

          // 去掉前缀
          name = name.startsWith(syntax.DIRECTIVE_EVENT_PREFIX)
            ? 'event'
            : name.substr(syntax.DIRECTIVE_PREFIX.length)

          let directive = allDirectives[name]
          if (!directive) {
            return new Error(`${name} directive is not existed.`)
          }

          directives[name] = { node, directive }
        })

        if (isFunction(node.create)) {
          directives.component = {
            node,
            directive: allDirectives.component,
          }
        }

        let data = { attrs }

        if (styles) {
          data.style = styles
        }

        let hasDirective = count(directives)
        if (isRootElement || hasDirective) {
          let process = function (vnode, name) {
            if (isRootElement) {
              component.fire(name)
            }
            if (hasDirective) {
              each(
                directives,
                function (item) {
                  if (isFunction(item.directive[name])) {
                    item.directive[name]({
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
              if (isRootElement) {
                component.el = vnode.elm
              }
              process(vnode, lifecycle.ATTACH)
            },
            update: function (oldNode, vnode) {
              process(vnode, lifecycle.UPDATE)
            },
            destroy: function (vnode) {
              process(vnode, lifecycle.DETACH)
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
