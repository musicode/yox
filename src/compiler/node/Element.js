
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
    this.directives = []
  }

  addAttr(node) {
    this.attrs.push(node)
  }

  addDirective(node) {
    this.directives.push(node)
  }

  render(parent, context, keys, parseTemplate) {

    let node = new Element(parent, this.name)
    node.keypath = keys.join('.')
    parent.addChild(node)

    this.renderChildren(node, context, keys, parseTemplate, this.attrs)
    this.renderChildren(node, context, keys, parseTemplate, this.directives)
    this.renderChildren(node, context, keys, parseTemplate)

  }

}
