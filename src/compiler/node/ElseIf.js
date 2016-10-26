
import {
  ELSE_IF,
} from '../nodeType'

import Node from './Node'

import {
  reduce,
} from '../../util/array'

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

  render(parent, context, prev) {

    if (prev) {
      if (this.execute(context)) {
        reduce(
          this.children,
          function (prev, current) {
            return current.render(parent, context, prev)
          }
        )
      }
      else {
        return prev
      }
    }

  }

}
