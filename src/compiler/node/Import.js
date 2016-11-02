
import {
  IMPORT,
} from '../nodeType'

import Node from './Node'

/**
 * import 节点
 *
 * @param {string} name
 */
module.exports = class Import extends Node {
  constructor(name) {
    super(false)
    this.type = IMPORT
    this.name = name
  }
}
