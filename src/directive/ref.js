
/**
 * 没有逻辑，ref 主要是配合 component 使用
 *
 * <Component @ref="component" />
 */

export default {

  attach: function ({ el, name, node, component, directives }) {

    let instance = el[`$component`]
    let value = node.getValue()
    if (instance && value) {
      if (!component.$refs) {
        component.$refs = { }
      }
      component.$refs[value] = instance
      el.$rel = value
    }

  },

  detach: function ({ el, name, component }) {

    if (el.$rel) {
      delete component.$refs[el.$rel]
      el.$rel = null
    }

  }
}
