
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

  render(parent, context, keys, prev) {
    if (prev) {
      this.renderChildren(parent, context, keys)
    }
  }

}
