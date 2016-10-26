
import {
  ATTRIBUTE,
} from '../nodeType'

import Node from './Node'

import {
  reduce,
} from '../../util/array'

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

  render(parent, context) {

    let { name, children } = this

    let node = new Attribute(parent, name)
    parent.addAttr(node)

    reduce(
      children,
      function (prev, current) {
        return current.render(node, context, prev)
      }
    )

  }

}
