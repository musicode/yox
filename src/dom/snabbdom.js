import snabbdom from 'snabbdom'

import h from 'snabbdom/h'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import attributes from 'snabbdom/modules/attributes'

const patch = snabbdom.init([ props, attributes, style ])

import {
  parse as parseStyle,
} from './style'

import {
  each,
} from '../util/object'

import {
  isFunction,
} from '../util/is'

import {
  get as getDirective,
} from '../directive'

import {
  TEXT,
  ATTRIBUTE,
  DIRECTIVE,
  ELEMENT,
} from '../compiler/nodeType'

function readValue(children) {
  // 如 disabled 这种布尔属性没有 children，默认就是 true
  return children[0] ? children[0].content : true
}

export function create(node, component) {

  let counter = 0

  return node.traverse(
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

        let hasDirective = false
        let isRootElement = !counter

        node.attrs.forEach(function (node) {
          let { name, children } = node
          if (name === 'style') {
            styles = parseStyle(readValue(children))
          }
          else {
            attrs[node.name] = readValue(children)
          }
        })

        node.directives.forEach(function (node) {
          let { name, children } = node
          let directive = getDirective(name)
          if (directive) {
            hasDirective = true
            directives[name] = {
              ...directive,
              name: name,
              value: readValue(children),
            }
          }
        })

        let data = {
          attrs,
        }

        if (styles) {
          data.style = styles
        }

        if (isRootElement || hasDirective) {

          let process = function (vnode, name) {
            if (isRootElement) {
              component.fire(name)
            }
            if (hasDirective) {
              each(
                directives,
                function (directive) {
                  if (isFunction(directive[name])) {
                    directive[name]({
                      el: vnode.elm,
                      name: directive.name,
                      value: directive.value,
                      component,
                    })
                  }
                }
              )
            }
          }

          data.hook = {
            insert: function (vnode) {
              process(vnode, 'attach')
            },
            update: function (oldNode, vnode) {
              process(vnode, 'update')
            },
            destroy: function (vnode) {
              process(vnode, 'detach')
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

export function init(element, node) {
  return patch(element, node)
}

export function update(oldNode, newNode) {
  return patch(oldNode, newNode)
}
