
import {
  ELEMENT,
} from '../nodeType'

import Node from './Node'

import {
  reduce,
} from '../../util/array'

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

  render(parent, context) {

    let { name, attrs, directives, children } = this

    let node = new Element(parent, name)
    parent.addChild(node)

    let handler = function (prev, current) {
      return current.render(node, context, prev)
    }

    reduce(attrs, handler)
    reduce(directives, handler)
    reduce(children, handler)

  }

}
