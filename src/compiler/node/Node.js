
import {
  reduce,
  lastItem,
} from '../../util/array'

import {
  compile,
  execute,
} from '../../util/expression'

import {
  TEXT,
} from '../nodeType'

/**
 * 节点基类
 */
export default class Node {

  constructor(parent, hasChildren = true) {
    // this.parent = parent
    if (hasChildren) {
      this.children = []
    }
  }

  addChild(node) {
    let { children } = this
    if (node.type === TEXT) {
      let lastChild = lastItem(children)
      if (lastChild && lastChild.type === TEXT) {
        lastChild.content += node.content
        return
      }
    }
    children.push(node)
  }

  getValue() {
    let { children } = this
    return children[0] ? children[0].content : true
  }

  execute(context) {
    let content = execute(
      compile(this.expr),
      context.data,
      function (name) {
        return context.get(name)
      }
    )
    if (content && content.toString) {
      content = content.toString()
    }
    return content
  }

  render() {
    // noop
  }

  renderChildren(parent, context, keys, parseTemplate, children) {
    reduce(
      children || this.children,
      function (prev, current) {
        return current.render(parent, context, keys, parseTemplate, prev)
      }
    )
  }

}
