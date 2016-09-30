
import {
  VARIABLE,
} from '../nodeType'

/**
 * 变量节点
 *
 * @param {string} literal
 */
export default class Variable(literal) {
  this.type = VARIABLE
  this.literal = literal
}
