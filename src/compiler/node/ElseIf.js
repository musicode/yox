
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
  constructor(parent, { expr }) {
    super(parent)
    this.type = ELSE_IF
    this.expr = expr
  }
}
