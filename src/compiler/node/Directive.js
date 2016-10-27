
import {
  DIRECTIVE,
} from '../nodeType'

import Node from './Node'

import {
  reduce,
} from '../../util/array'

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

  render(parent, context) {

    let { name, children } = this

    let node = new Directive(parent, name)
    parent.addDirective(node)

    reduce(
      children,
      function (prev, current) {
        return current.render(node, context, prev)
      }
    )

  }

}
