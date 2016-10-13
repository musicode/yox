
import {
  ELEMENT,
} from '../nodeType'

/**
 * 元素节点
 *
 * @param {string} name
 * @param {Array} attrs 属性列表
 * @param {Array} nodes 子节点列表
 */
export default class Element {
  constructor(name, attrs, nodes) {
    this.type = ELEMENT
    this.name = name
    this.attrs = attrs
    this.nodes = nodes
  }
}
