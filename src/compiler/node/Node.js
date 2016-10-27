
import {
  isArray,
  isFunction,
} from '../../util/is'

import {
  each,
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

  execute(context) {
    let { expr } = this
    return execute(
      compile(expr),
      context,
      function (name) {
        return context.get(name)
      }
    )
  }

  render() {
    // noop
  }

  traverse(enter, leave) {

    if (isFunction(enter) && enter(this) === false) {
      return
    }

    let children = [ ]
    if (isArray(this.children)) {
      each(
        this.children,
        function (item) {
          item = item.traverse(enter, leave)
          if (item != null) {
            children.push(item)
          }
        }
      )
    }

    if (isFunction(leave)) {
      return leave(this, children)
    }

  }

}
