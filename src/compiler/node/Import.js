
import {
  IMPORT,
} from '../nodeType'

/**
 * import 节点
 *
 * @param {string} name
 */
export default class Import {
  constructor(name) {
    this.type = IMPORT
    this.name = name
  }
}
