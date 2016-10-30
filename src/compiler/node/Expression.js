
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'
import Text from './Text'
import Element from './Element'

import {
  encode,
} from '../../util/html'

const elementPattern = /<[^>]+>/

/**
 * 表达式节点
 *
 * @param {string} expr
 * @param {boolean} safe
 */
export default class Expression extends Node {

  constructor(parent, expr, safe) {
    super(parent, false)
    this.type = EXPRESSION
    this.expr = expr
    this.safe = safe
  }

  render(parent, context, keys, parseTemplate) {

    let content = this.execute(context)
    if (content && content.toString) {
      content = content.toString()
    }

    if (this.safe || !elementPattern.test(content)) {
      let node = new Text(parent, content)
      node.keypath = keys.join('.')
      parent.addChild(node)
    }
    else {
      parseTemplate(content).forEach(function (node) {
        node.render(parent, context, keys, parseTemplate)
      })
    }

  }

}
