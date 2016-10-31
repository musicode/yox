
import {
  ATTRIBUTE,
  EXPRESSION,
} from '../nodeType'

import Node from './Node'

/**
 * 变量节点
 *
 * @param {string} name 属性名
 */
export default class Attribute extends Node {

  constructor(parent, name) {
    super(parent)
    this.type = ATTRIBUTE
    this.name = name
  }

  render(parent, context, keys, parseTemplate) {

    let { name } = this
    if (name.type === EXPRESSION) {
      name = name.render(parent, context, keys, parseTemplate).content
    }

    let node = new Attribute(parent, name)
    node.keypath = keys.join('.')
    parent.addAttr(node)

    this.renderChildren(node, context, keys, parseTemplate)

    return node

  }

}
