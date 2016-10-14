
import {
  ELSE,
} from '../nodeType'

import Node from './Node'

/**
 * else 节点
 *
 * @param {Array} nodes 如果对应的 if 和 else if 节点为假，需要渲染的节点列表
 */
export default class Else extends Node {
  constructor(parent) {
    super(parent)
    this.type = ELSE
  }
}
