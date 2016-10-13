
import {
  ELSE_IF,
} from '../nodeType'

/**
 * else if 节点
 *
 * @param {string} expr 判断条件
 * @param {Array} nodes 如果条件为真，需要渲染的节点列表
 */
export default class ElseIf {
  constructor(expr, nodes) {
    this.type = ELSE_IF
    this.expr = expr
    this.nodes = nodes
  }
}
