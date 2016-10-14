
/**
 * 节点基类
 *
 * @param {string} expr 判断条件
 * @param {Array} nodes 如果条件为真，需要渲染的节点列表
 */
export default class Node {

  constructor(parent, hasChildren = true) {
    //this.parent = parent
    if (hasChildren) {
      this.children = []
    }
  }

  addChild(node) {
    this.children.push(node)
    return node
  }
}
