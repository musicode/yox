
import {
  ATTRIBUTE,
} from '../nodeType'

import Node from './Node'

/**
 * 变量节点
 *
 * @param {string} name 属性名
 * @param {Array} nodes 属性节点，比如变量或表达式
 */
export default class Attribute extends Node {

  constructor(parent, { name }) {
    super(parent)
    this.type = ATTRIBUTE
    this.name = name
  }

}
