
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'
import Text from './Text'

const elementPattern = /<[^>]+>/

/**
 * 表达式节点
 *
 * @param {string} expr
 * @param {boolean} safe
 */
module.exports = class Expression extends Node {

  constructor(parent, expr, safe) {
    super(parent, false)
    this.type = EXPRESSION
    this.expr = expr
    this.safe = safe
  }

  render(parent, context, keys, parseTemplate) {

    let content = this.execute(context)
    if (content == null) {
      content = ''
    }

    if (this.safe || !elementPattern.test(content)) {
      let node = new Text(parent, content)
      node.render(parent, context, keys)
    }
    else {
      parseTemplate(content).forEach(
        function (node) {
          node.render(parent, context, keys, parseTemplate)
        }
      )
    }

  }

}
