
import {
  EXPRESSION,
} from '../nodeType'

/**
 * 表达式节点
 *
 * @param {string} literal
 */
export default class Expression {
  constructor(literal) {
    this.type = EXPRESSION
    this.literal = literal
  }
}
