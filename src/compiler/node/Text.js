
import {
  TEXT,
} from '../nodeType'

/**
 * 文本节点
 *
 * @param {string} content
 */
export default class Text(content) {
  this.type = TEXT
  this.content = content
}
