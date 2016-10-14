
import {
  VARIABLE,
} from '../nodeType'

import Node from './Node'

/**
 * 变量节点
 *
 * @param {string} expr 变量字面
 * @param {boolean} safe 是否需要安全输出
 */
export default class Variable extends Node {
  constructor(parent, { expr, safe }) {
    super(parent)
    this.type = VARIABLE
    this.expr = expr
    this.safe = safe
  }
}
