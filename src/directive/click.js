
export default {
  insert: function(oldVnode, vnode) {
    console.log(oldNode, vnode)
    // invoked whenever a new virtual node is created
  },
  update: function(oldVnode, vnode) {
    // invoked whenever a virtual node is updated
  },
  destroy: function (oldNode, vnode) {

  }
}
