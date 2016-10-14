
import {
  PARTIAL,
} from '../nodeType'

import Node from './Node'

/**
 * partial 节点
 *
 * @param {string} name
 * @param {Array} nodes 子节点列表
 */
export default class Partial extends Node {
  constructor(parent, { name }) {
    super(parent)
    this.type = PARTIAL
    this.name = name
  }
}
