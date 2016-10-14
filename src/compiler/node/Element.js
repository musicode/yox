
import {
  ELEMENT,
} from '../nodeType'

import Node from './Node'

/**
 * 元素节点
 *
 * @param {string} name
 */
export default class Element extends Node {

  constructor(parent, name) {
    super(parent)
    this.type = ELEMENT
    this.name = name
    this.attrs = []
  }

  addAttr(node) {
    this.attrs.push(node)
  }

}
