
import * as lifecycle from '../config/lifecycle'

import {
  get,
} from '../util/component'

module.exports = {

  attach: function ({ el, name, node, instance, directives }) {
    el.$component = instance.create(
      get(instance, 'component', node.custom),
      {
        el,
        props: node.getAttributes(),
        replace: true,
      }
    )
  },

  update: function ({ el, node }) {
    el.$component.set(node.getAttributes())
  },

  detach: function ({ el }) {
    el.$component.detach()
    el.$component = null
  }

}
