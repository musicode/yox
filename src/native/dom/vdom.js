import snabbdom from 'snabbdom'

import h from 'snabbdom/h'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import attributes from 'snabbdom/modules/attributes'

import * as syntax from '../../config/syntax'
import * as lifecycle from '../../config/lifecycle'

import {
  parseStyle,
} from './helper'

import {
  each,
} from '../../util/array'

import {
  each as objectEach,
} from '../../util/object'

import {
  get,
} from '../../util/component'

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


export let patch = snabbdom.init([ props, attributes, style ])

export function create(node, instance) {

  let counter = 0

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
        let styles

        let directives = [ ]

        // 指令的创建要确保顺序
        // 组件必须第一个执行
        // 因为如果在组件上写了 on-click="xx" 其实是监听从组件 fire 出的 click 事件
        // 因此 component 必须在 event 指令之前执行

        // 组件的 attrs 作为 props 传入组件，不需要写到元素上
        if (node.custom) {
          directives.push({
            name: 'component',
            node,
            directive: get(instance, 'directive', 'component'),
          })
        }
        else {
          objectEach(
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

        each(
          node.directives,
          function (node) {
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

            directives.push({
              name,
              node,
              directive: get(instance, 'directive', directiveName),
            })
          }
        )

        let data = { attrs }

        if (styles) {
          data.style = styles
        }

        if (!counter || directives.length) {
          let notify = function (vnode, type) {
            each(
              directives,
              function (item) {
                if (isFunction(item.directive[type])) {
                  item.directive[type]({
                    el: vnode.elm,
                    node: item.node,
                    name: item.name,
                    instance,
                    directives,
                  })
                }
              }
            )
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
