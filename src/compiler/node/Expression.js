
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'

/**
 * 表达式节点
 *
 * @param {string} expr
 */
export default class Expression extends Node {
  constructor(parent, { expr }) {
    super(parent)
    this.type = EXPRESSION
    this.expr = expr
  }
}
