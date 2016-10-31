
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
  merge as arrayMerge,
} from '../../util/array'

import {
  each as objectEach,
} from '../../util/object'

import {
  SPECIAL_KEYPATH,
} from '../../config/syntax'

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

  render(parent, context, keys, parseTemplate) {

    let { name, index } = this
    let data = context.get(name)

    let each
    if (isArray(data)) {
      each = arrayEach
    }
    else if (isObject(data)) {
      each = objectEach
    }

    if (each) {
      let result = [ ]
      let children

      keys.push(name)
      each(data, (item, i) => {
        if (index) {
          context.set(index, i)
        }
        keys.push(i)
        context.set(SPECIAL_KEYPATH, keys.join('.'))

        children = this.renderChildren(parent, context.push(item), keys, parseTemplate)
        if (children) {
          result = arrayMerge(result, children)
        }

        keys.pop()
      })
      keys.pop()

      return result
    }

  }

}
