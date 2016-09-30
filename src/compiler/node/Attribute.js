
import {
  ATTRIBUTE,
} from '../nodeType'

/**
 * 变量节点
 *
 * @param {string} name 属性名
 * @param {nodes} nodes 属性节点，比如变量或表达式
 */
export default class Attribute(name, nodes) {
  this.type = ATTRIBUTE
  this.name = name
  this.nodes = nodes
}
