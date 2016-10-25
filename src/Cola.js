
import {
  Emitter,
} from './util/Emitter'

import {
  each as objectEach,
} from './util/object'

import {
  isObject,
} from './util/is'

class Cola extends Emitter {

  /**
   * 全局过滤器
   *
   * @type {Object}
   */
  static filters = { }

  /**
   * 全局模板片段
   *
   * @type {Object}
   */
  static partials = { }

  /**
   * 配置项
   *
   * @param {Object} options
   * @property {string|HTMLElement} options.el
   * @property {string} options.template
   * @property {Object} options.data
   * @return {Object}
   */
  constructor(options) {

    super()

    // 生命周期钩子
    // this.hooks = { }
    // 过滤器
    // this.filters = { }
    // 模板片段
    // this.partials = { }
    // 实例方法
    // this.methods = { }

    Object.assign(this, options)

    // 把 hooks 里的 handler 注册到事件
    if (isObject(this.hooks)) {
      objectEach(
        this.hooks,
        (name, handler) => {
          if (name.startsWith('on')) {
            this.on(name.substr(2), handler.bind(this))
          }
        }
      )
    }

    // 模板解析器
    let parser = new Mustache()

    let ast = parser.parse(
      this.template,
      name => {
        return (this.partials && this.partials[name]) || Cola.partials[name]
      },
      (name, node) => {
        if (!this.partials) {
          this.partials = { }
        }
        this.partials[name] = node
      }
    )

    let vd = parser.build(vd, this.data)

    this.fire('compile')



  }

}

export default {

  // 自定义语法

  IF: '#if',
  ELSE: 'else',
  ELSE_IF: 'else if',

  EACH: '#each',

  PARTIAL: '#partial',

  IMPORT: '>',

  DIRECTIVE_PREFIX: '@',




}
