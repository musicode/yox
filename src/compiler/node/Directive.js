
import {
  DIRECTIVE,
} from '../nodeType'

import Node from './Node'

/**
 * 变量节点
 *
 * x-lazy="100"
 *
 * @param {string} name 指令名
 * @param {Array} nodes 字面量
 */
export default class Directive extends Node {
  constructor(parent, { name }) {
    super(parent)
    this.type = DIRECTIVE
    this.name = name
  }
}
