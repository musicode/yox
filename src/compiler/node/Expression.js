
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'
import Text from './Text'
import Element from './Element'

import {
  encode,
} from '../../util/html'

/**
 * 表达式节点
 *
 * @param {string} expr
 * @param {boolean} safe
 */
export default class Expression extends Node {

  constructor(parent, expr, safe) {
    super(parent, false)
    this.type = EXPRESSION
    this.expr = expr
    this.safe = safe
  }

  render(parent, context, keys) {

    let content = this.execute(context)
    if (content && content.toString) {
      content = content.toString()
    }

    if (this.safe) {
      content = encode(content)
    }

    let node = new Text(parent, content)
    node.keypath = keys.join('.')

    parent.addChild(node)

  }

}
