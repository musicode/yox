
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'
import Text from './Text'
import Element from './Element'

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
      return node.render(parent, context, keys)
    }
    else {
      return parseTemplate(content).map(
        function (node) {
          return node.render(parent, context, keys, parseTemplate)
        }
      )
    }

  }

}
