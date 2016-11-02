
import {
  on,
  off,
} from '../native/dom/helper'

import debounce from '../function/debounce'

module.exports = {

  attach: function ({ el, node, instance, directives }) {

    let type = 'input', interval, value

    let lazyDirective = directives.filter(
      function (item) {
        return item.name === 'lazy'
      }
    )[0]

    if (lazyDirective) {
      value = lazyDirective.node.getValue()
      if (value === true) {
        type = 'change'
      }
      else if (value >= 0) {
        interval = value
      }
    }

    value = node.getValue()

    let keypath = node.keypath ? `${node.keypath}.${value}` : value
    el.value = instance.get(keypath)

    instance.watch(keypath, function (value) {
      el.value = value || ''
    })

    let listener = function (e) {
      instance.set(keypath, el.value)
    }

    if (interval != null) {
      listener = debounce(listener, interval)
    }

    el.$model = {
      type,
      listener,
    }

    on(el, type, listener)

  },

  detach: function ({ el }) {
    let { $model } = el
    off(el, $model.type, $model.listener)
    el.$model = null
  }

}
