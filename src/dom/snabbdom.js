import snabbdom from 'snabbdom'

import h from 'snabbdom/h'
import klass from 'snabbdom/modules/class'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

// patch 用于初始化 dom 以及更新 dom
const patch = snabbdom.init([ klass, props, style, eventlisteners ])

import {
  TEXT,
  ATTRIBUTE,
  ELEMENT,
} from '../compiler/nodeType'

export function create(node) {

  // 生成结果如下：
  // h('div', [
  //   h('input', {props: {type: 'radio', name: 'test', value: '0'},
  //               on: {change: sharedHandler}}),
  //   h('input', {props: {type: 'radio', name: 'test', value: '1'},
  //               on: {change: sharedHandler}}),
  //   h('input', {props: {type: 'radio', name: 'test', value: '2'},
  //               on: {change: sharedHandler}})
  // ])

  // 遍历的策略是先从叶子节点开始往上收集

  return node.traverse(
    function (node) {
      if (node.type === ATTRIBUTE) {
        return false
      }
    },
    function (node, children) {
      if (node.type === ELEMENT) {

        let props = { }

        node.attrs.forEach(function (node) {
          props[node.name] = node.children[0].content
        })

        return h(
          node.name,
          {
            props
          },
          children
        )
      }
      else if (node.type === TEXT) {
        return node.content
      }
    }
  })

}

// 第一次使用 patch 需要一个真实的 dom
export function init(element, node) {
  return patch(element, node)
}

export function update(oldNode, newNode) {
  return patch(oldNode, newNode)
}
