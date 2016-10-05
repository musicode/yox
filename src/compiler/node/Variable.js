
import {
  VARIABLE,
} from '../nodeType'

/**
 * 变量节点
 *
 * @param {string} literal 变量字面
 * @param {boolean} safe 是否需要安全输出
 */
export default class Variable(literal, safe) {
  this.type = VARIABLE
  this.literal = literal
  this.safe = safe
}
