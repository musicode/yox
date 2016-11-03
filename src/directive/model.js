
import {
  on,
  off,
} from '../native/dom/helper'

import {
  testKeypath,
} from '../util/component'

import {
  hasItem,
  removeItem,
} from '../util/array'

import {
  isArray,
  isNumeric,
} from '../util/is'

import debounce from '../function/debounce'

// 支持 input 事件的控件
const supportInputTypes = [ 'text', 'number', 'url', 'email', 'search' ]

// 特殊的双向绑定逻辑
const controlTypes = {
  normal: {
    set: function ({ el, keypath, instance }) {
      el.value = instance.get(keypath)
    },
    sync: function ({ el, keypath, instance }) {
      instance.set(keypath, el.value)
    }
  },
  radio: {
    set: function ({ el, keypath, instance }) {
      el.checked = el.value == instance.get(keypath)
    },
    sync: function ({ el, keypath, instance }) {
      if (el.checked) {
        instance.set(keypath, el.value)
      }
    }
  },
  checkbox: {
    set: function ({ el, keypath, instance }) {
      let value = instance.get(keypath)
      el.checked = isArray(value)
        ? hasItem(value, el.value, false)
        : !!value
    },
    sync: function ({ el, keypath, instance }) {
      let value = instance.get(keypath)
      if (isArray(value)) {
        if (el.checked) {
          value.push(el.value)
        }
        else {
          removeItem(value, el.value, false)
        }
        instance.set(keypath, [ ...value ])
      }
      else {
        instance.set(keypath, el.checked)
      }
    }
  }
}

module.exports = {

  attach: function ({ el, node, instance, directives }) {

    let type = 'change', interval, value

    if (el.tagName === 'INPUT' && hasItem(supportInputTypes, el.type)
      || el.tagName === 'TEXTAREA'
    ) {
      let lazyDirective = directives.filter(
        function (item) {
          return item.name === 'lazy'
        }
      )[0]
      if (lazyDirective) {
        value = lazyDirective.node.getValue()
        if (isNumeric(value) && value >= 0) {
          type = 'input'
          interval = value
        }
      }
      else {
        type = 'input'
      }
    }

    value = node.getValue()

    let keypath = node.keypath ? `${node.keypath}.${value}` : value
    let result = testKeypath(instance, keypath)
    if (!result) {
      throw new Error(`不能双向绑定到 ${keypath}`)
    }

    keypath = result.keypath

    let controller = controlTypes[el.type] || controlTypes.normal
    let data = {
      el,
      keypath,
      instance,
    }
    controller.set(data)

    instance.watch(
      keypath,
      function () {
        controller.set(data)
      }
    )

    let listener = function () {
      controller.sync(data)
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
