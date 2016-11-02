
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'
import Text from './Text'

import * as pattern from '../../config/pattern'

import {
  each,
} from '../../util/array'

/**
 * 表达式节点
 *
 * @param {string} expr
 * @param {boolean} safe
 */
module.exports = class Expression extends Node {

  constructor(expr, safe) {
    super(false)
    this.type = EXPRESSION
    this.expr = expr
    this.safe = safe
  }

  render(parent, context, keys, parseTemplate) {

    let content = this.execute(context)
    if (content == null) {
      content = ''
    }

    if (this.safe || !pattern.tag.test(content)) {
      let node = new Text(content)
      node.render(parent, context, keys)
    }
    else {
      each(
        parseTemplate(content),
        function (node) {
          node.render(parent, context, keys, parseTemplate)
        }
      )
    }

  }

}
