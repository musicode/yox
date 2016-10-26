
import {
  IF,
} from '../nodeType'

import Node from './Node'

import {
  reduce,
} from '../../util/array'

/**
 * if 节点
 *
 * @param {string} expr 判断条件
 */
export default class If extends Node {

  constructor(parent, expr) {
    super(parent)
    this.type = IF
    this.expr = expr
  }

  render(parent, context) {

    // if 是第一个条件判断
    // 当它不满足条件，表示需要跟进后续的条件分支
    // 这里用到 reduce 的机制非常合适
    // 即如果前一个分支不满足，返回 true，告知后续的要执行
    if (this.execute(context)) {
      reduce(
        this.children,
        function (prev, current) {
          return current.render(parent, context, prev)
        }
      )
    }
    else {
      return true
    }

  }

}
