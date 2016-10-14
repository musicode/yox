
import {
  EACH as eachType,
} from '../nodeType'

import {
  EACH as eachPattern,
} from '../pattern'

import Node from './Node'

/**
 * each 节点
 *
 * {{ #each name:index }}
 *
 * @param {string} literal 字面量，如 list:index
 */
export default class Each extends Node {

  constructor(parent, { name, index }) {
    super(parent)
    this.type = eachType
    this.name = name
    this.index = index
  }

  static match(source) {
    if (eachPattern.test(source)) {
      let terms = source.replace(eachPattern, '').split(':')
      return {
        name: terms[0].trim(),
        index: terms[1] ? terms[1].trim() : null,
      }
    }
  }

}
