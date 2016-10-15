
import {
  EACH,
} from '../nodeType'

import Node from './Node'

/**
 * each 节点
 *
 * {{ #each name:index }}
 *
 * @param {string} literal 字面量，如 list:index
 */
export default class Each extends Node {

  constructor(parent, { name, index }) {
    super(parent)
    this.type = EACH
    this.name = name
    this.index = index
  }

}
