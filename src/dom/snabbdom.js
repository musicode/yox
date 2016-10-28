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

import {
  DIRECTIVE_PREFIX,
  DIRECTIVE_EVENT_PREFIX,
} from '../syntax'

function readValue(children) {
  // 如 disabled 这种布尔属性没有 children，默认就是 true
  return children[0] ? children[0].content : true
}

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
          let { name } = node
          let directive
          if (name.startsWith(DIRECTIVE_EVENT_PREFIX)) {
            name = name.substr(DIRECTIVE_EVENT_PREFIX.length)
            directive = allDirectives.event
          }
          else {
            name = name.substr(DIRECTIVE_PREFIX.length)
            directive = allDirectives[name]
          }
          if (directive) {
            hasDirective = true
            directives[name] = {
              ...directive,
              name,
              value: readValue(node.children),
              keypath: node.keypath,
            }
          }
        })


        each(
          allDirectives,
          function (directive, name) {
            if (!(name in directives)) {
              // 是否默认开启
              if (isFunction(directive.defaultOn) && directive.defaultOn(node.name)) {
                directives[name] = {
                  ...directive,
                  name,
                  value: true,
                  keypath: node.keypath,
                }
              }
            }
          }
        )

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
                      keypath: directive.keypath,
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

export function patch(oldNode, newNode) {
  return applyPatch(oldNode, newNode)
}
