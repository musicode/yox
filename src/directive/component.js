
import * as lifecycle from '../config/lifecycle'

function getData(node) {
  let data = { }
  node.attrs.forEach(function (node) {
    data[node.name] = node.getValue()
  })
  return data
}

export default {

  attach: function ({el, node, component, directives}) {

    let instance = node.create({ el, props: getData(node) })
    let $component = { instance }

    let { ref } = directives
    if (ref) {
      let value = ref.node.getValue()
      if (value) {
        if (!component.$refs) {
          component.$refs = { }
        }
        component.$refs[value] = instance
        $component.ref = value
      }
    }

    el.$component = $component

  },

  update: function ({ el, node }) {
    el.$component.instance.set(
      getData(node)
    )
  },

  detach: function ({el, component}) {
    let {
      ref,
      instance,
    } = el.$component
    if (ref) {
      delete component.$refs[ref]
    }
    instance.fire(lifecycle.DETACH)
    el.$component = null
  }

}
