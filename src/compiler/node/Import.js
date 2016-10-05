
import {
  IMPORT,
} from '../nodeType'

/**
 * import 节点
 *
 * @param {string} name
 */
export default class Import(name) {
  this.type = IMPORT
  this.name = name
}
