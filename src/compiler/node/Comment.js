
import {
  COMMENT,
} from '../nodeType'

/**
 * 注释节点
 *
 * @param {string} content
 */
export default class Comment(content) {
  this.type = COMMENT
  this.content = content
}
