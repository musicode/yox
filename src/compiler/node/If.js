
import {
  IF,
} from '../nodeType'

/**
 * if 节点
 *
 * @param {string} expr 判断条件
 * @param {Array} nodes 如果条件为真，需要渲染的节点列表
 */
export default class If {
  constructor(expr, nodes) {
    this.type = IF
    this.expr = expr
    this.nodes = nodes
  }
}
