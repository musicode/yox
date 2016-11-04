
/**
 * 没有逻辑，ref 主要是配合 component 使用
 *
 * <Component @ref="component" />
 */

import {
  NULL,
} from '../config/env'

import {
  set,
} from '../util/component'

module.exports = {

  attach: function ({ el, node, instance, directives }) {

    let component = el[`$component`]
    let value = node.getValue()
    if (component && value) {
      set(instance, 'ref', value, component)
      el.$ref = value
    }

  },

  detach: function ({ el, instance }) {

    if (el.$ref) {
      delete instance.$refs[el.$ref]
      el.$ref = NULL
    }

  }
}
