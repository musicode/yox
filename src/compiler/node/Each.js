
import {
  EACH,
} from '../nodeType'

/**
 * each 节点
 *
 * @param {string} literal 字面量，如 list:index
 * @param {Array} nodes 子节点列表
 */
export default class Each(literal, nodes) {
  this.type = EACH
  this.literal = literal
  this.nodes = nodes
}
