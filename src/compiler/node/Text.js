
import {
  TEXT,
} from '../nodeType'

import Node from './Node'

/**
 * 文本节点
 *
 * @param {string} content
 */
export default class Text extends Node {

  constructor(parent, content) {
    super(parent, false)
    this.type = TEXT
    this.content = content
  }

  render(parent, context, keys) {
    let node = new Text(parent, this.content)
    node.keypath = keys.join('.')
    parent.addChild(node)
  }

}
