
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

  render(parent) {
    parent.addChild(
      new Text(parent, this.content)
    )
  }

}
