
import * as lifecycle from '../config/lifecycle'

export default {

  attach: function ({el, node}) {
    el.$component = node.create(el)
  },

  detach: function ({el}) {
    el.$component.fire(lifecycle.DETACH)
    el.$component = null
  }

}
