
import {
  DIRECTIVE,
} from '../nodeType'

import Node from './Node'

/**
 * 指令节点
 *
 * on-click="submit()"
 *
 * @param {string} name 指令名
 */
export default class Directive extends Node {

  constructor(parent, name) {
    super(parent)
    this.type = DIRECTIVE
    this.name = name
  }

}
