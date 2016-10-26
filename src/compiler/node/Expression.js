
import {
  EXPRESSION,
} from '../nodeType'

import Node from './Node'
import Text from './Text'

import {
  encode,
} from '../../util/html'

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

  render(parent, context) {

    let content = this.execute(context)
    if (this.safe) {
      content = encode(content)
    }

    parent.addChild(
      new Text(parent, content)
    )

  }

}
