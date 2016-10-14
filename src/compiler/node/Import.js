
import {
  IMPORT,
} from '../nodeType'

import Node from './Node'

/**
 * import 节点
 *
 * @param {string} name
 */
export default class Import extends Node {
  constructor(parent, { name }) {
    super(parent, false)
    this.type = IMPORT
    this.name = name
  }
}
