
import {
  EACH,
} from '../nodeType'

/**
 * each 节点
 *
 * {{ #each name:index }}
 *
 * @param {string} literal 字面量，如 list:index
 * @param {Array} nodes 子节点列表
 */
export default class Each {
  constructor(name, index, nodes) {
    this.type = EACH
    this.name = name
    this.index = index
    this.nodes = nodes
  }
}
