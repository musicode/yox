
import {
  VARIABLE,
} from '../nodeType'

/**
 * 变量节点
 *
 * @param {string} expr 变量字面
 * @param {boolean} safe 是否需要安全输出
 */
export default class Variable {
  constructor(expr, safe) {
    this.type = VARIABLE
    this.expr = expr
    this.safe = safe
  }
}
