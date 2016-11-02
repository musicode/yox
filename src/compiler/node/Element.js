
import {
  ELEMENT,
} from '../nodeType'

import Node from './Node'

import {
  each,
} from '../../util/array'

/**
 * 元素节点
 *
 * @param {string} name
 */
module.exports = class Element extends Node {

  constructor(name, custom) {
    super()
    this.type = ELEMENT
    this.name = name
    this.custom = custom
    this.attrs = []
    this.directives = []
  }

  addAttr(node) {
    this.attrs.push(node)
  }

  addDirective(node) {
    this.directives.push(node)
  }

  getAttributes() {
    let result = { }
    each(
      this.attrs,
      function (node) {
        result[node.name] = node.getValue()
      }
    )
    return result
  }

  render(parent, context, keys, parseTemplate) {

    let node = new Element(this.name, this.custom)
    node.keypath = keys.join('.')
    parent.addChild(node)

    this.renderChildren(node, context, keys, parseTemplate, this.attrs)
    this.renderChildren(node, context, keys, parseTemplate, this.directives)
    this.renderChildren(node, context, keys, parseTemplate)

  }

}
