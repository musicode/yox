
import {
  IF as ifType,
} from '../nodeType'

import {
  IF as ifPattern,
} from '../pattern'

import Node from './Node'

/**
 * if 节点
 *
 * @param {string} expr 判断条件
 */
export default class If extends Node {

  constructor(parent, { expr }) {
    super(parent)
    this.type = ifType
    this.expr = expr
  }

  static match(source) {
    if (ifPattern.test(source)) {
      return {
        expr: source.replace(ifPattern, '').trim()
      }
    }
  }

}
