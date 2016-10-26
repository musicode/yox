
import {
  ELSE,
} from '../nodeType'

import Node from './Node'

import {
  reduce,
} from '../../util/array'

/**
 * else 节点
 */
export default class Else extends Node {

  constructor(parent) {
    super(parent)
    this.type = ELSE
  }

  render(parent, context, prev) {

    if (prev) {
      reduce(
        this.children,
        function (prev, current) {
          return current.render(parent, context, prev)
        }
      )
    }

  }

}
