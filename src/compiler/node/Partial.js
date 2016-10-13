
import {
  PARTIAL,
} from '../nodeType'

/**
 * partial 节点
 *
 * @param {string} name
 * @param {Array} nodes 子节点列表
 */
export default class Partial {
  constructor(name, nodes) {
    this.type = PARTIAL
    this.name = name
    this.nodes = nodes
  }
}
