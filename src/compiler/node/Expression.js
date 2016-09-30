
import {
  EXPRESSION,
} from '../nodeType'

/**
 * 表达式节点
 *
 * @param {string} literal
 */
export default class Expression(literal) {
  this.type = EXPRESSION
  this.literal = literal
}
