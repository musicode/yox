
import {
  DIRECTIVE,
} from '../nodeType'

/**
 * 变量节点
 *
 * @param {string} name 指令名
 * @param {string} literal 字面量
 */
export default class Directive(name, literal) {
  this.type = DIRECTIVE
  this.name = name
  this.literal = literal
}
