
import {
  DIRECTIVE,
} from '../nodeType'

/**
 * 变量节点
 *
 * x-lazy="100"
 *
 * @param {string} name 指令名
 * @param {Array} nodes 字面量
 */
export default class Directive {
  constructor(name, nodes) {
    this.type = DIRECTIVE
    this.name = name
    this.nodes = nodes
  }
}
