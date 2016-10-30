
import {
  on,
  off,
} from '../util/dom'

import debounce from '../function/debounce'

export default {

  attach: function ({el, component, keypath, value, directives}) {

    let type = 'input', interval

    let { lazy } = directives
    if (lazy) {
      if (lazy.value === true) {
        type = 'change'
      }
      else if (lazy.value >= 0) {
        interval = lazy.value
      }
    }

    keypath = keypath ? `${keypath}.${value}` : value
    el.value = component.get(keypath)

    component.watch(keypath, function (value) {
      el.value = value || ''
    })

    let listener = function (e) {
      component.set(keypath, el.value)
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

  detach: function ({el}) {
    let { $model } = el
    off(el, $model.type, $model.listener)
    el.$model = null
  }

}
