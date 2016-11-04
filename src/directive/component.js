
import {
  get,
} from '../util/component'

module.exports = {

  attach: function ({ el, node, instance }) {
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
    el.$component.dispose()
    el.$component = null
  }

}
