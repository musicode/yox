
import {
  EACH,
} from '../nodeType'

import Node from './Node'

import {
  isArray,
  isObject,
} from '../../util/is'

import {
  each as arrayEach,
  reduce as arrayReduce,
} from '../../util/array'

import {
  each as objectEach,
} from '../../util/object'

/**
 * each 节点
 *
 * {{ #each name:index }}
 *
 * @param {string} literal 字面量，如 list:index
 */
export default class Each extends Node {

  constructor(parent, name, index) {
    super(parent)
    this.type = EACH
    this.name = name
    this.index = index
  }

  render(parent, context) {

    let { name, index, children } = this
    let data = context.get(name)

    let each
    if (isArray(data)) {
      each = arrayEach
    }
    else if (isObject(data)) {
      each = objectEach
    }

    if (each) {
      context = context.push(data)
      each(data, function (item, i) {
        if (index) {
          context.set(index, i)
        }
        arrayReduce(
          children,
          function (prev, current) {
            return current.render(parent, context, prev)
          }
        )
      })
    }

  }

}
