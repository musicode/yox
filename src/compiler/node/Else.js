
import {
  ELSE,
} from '../nodeType'

import Node from './Node'

/**
 * else 节点
 */
export default class Else extends Node {

  constructor(parent) {
    super(parent)
    this.type = ELSE
  }

  render(parent, context, keys, parseTemplate, prev) {
    if (prev === true) {
      return this.renderChildren(parent, context, keys, parseTemplate)
    }
  }

}
