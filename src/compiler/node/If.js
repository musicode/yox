
import {
  IF,
} from '../nodeType'

import Node from './Node'

/**
 * if 节点
 *
 * @param {string} expr 判断条件
 */
export default class If extends Node {

  constructor(parent, { expr }) {
    super(parent)
    this.type = IF
    this.expr = expr
  }

}
