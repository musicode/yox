
import * as lifecycle from '../config/lifecycle'

module.exports = {

  attach: function ({ el, name, node, component, directives }) {
    el.$component = node.create({ el, props: node.getAttributes() })
  },

  update: function ({ el, name, node }) {
    el.$component.set(node.getAttributes())
  },

  detach: function ({ el, name, component }) {
    el.$component.detach()
    el.$component = null
  }

}
