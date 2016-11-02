
import * as lifecycle from '../config/lifecycle'

import {
  get,
} from '../util/component'

import Cola from '../Cola'

module.exports = {

  attach: function ({ el, name, node, component, directives }) {
    el.$component = new Cola({
      ...get(component, 'component', node.custom),
      el,
      props: node.getAttributes(),
      replace: true,
    })
  },

  update: function ({ el, name, node }) {
    el.$component.set(node.getAttributes())
  },

  detach: function ({ el, name, component }) {
    el.$component.detach()
    el.$component = null
  }

}
