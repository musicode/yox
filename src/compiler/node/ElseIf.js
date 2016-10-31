
import {
  ELSE_IF,
} from '../nodeType'

import Node from './Node'

/**
 * else if 节点
 *
 * @param {string} expr 判断条件
 */
export default class ElseIf extends Node {

  constructor(parent, expr) {
    super(parent)
    this.type = ELSE_IF
    this.expr = expr
  }

  render(parent, context, keys, parseTemplate, prev) {
    if (prev === true) {
      if (this.execute(context)) {
        return this.renderChildren(parent, context, keys, parseTemplate)
      }
      else {
        return prev
      }
    }
  }

}
