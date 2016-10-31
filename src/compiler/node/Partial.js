
import {
  PARTIAL,
} from '../nodeType'

import Node from './Node'

/**
 * partial 节点
 *
 * @param {string} name
 */
export default class Partial extends Node {
  constructor(parent, name) {
    super(parent)
    this.type = PARTIAL
    this.name = name
  }
}
