
import Mustache from './compiler/parser/Mustache'

import {
  add as addTask,
  run as runTask,
} from './util/nextTask'

import {
  getWildcardMatches,
  getWildcardNames,
} from './util/keypath'

import {
  Emitter,
} from './util/event'

import {
  count as objectCount,
  each as objectEach,
  set as objectSet,
  get as objectGet,
} from './util/object'

import {
  merge,
} from './util/array'

import {
  find,
} from './util/dom'

import {
  isString,
  isObject,
  isFunction,
} from './util/is'

import {
  create,
  patch,
} from './dom/snabbdom'

export default class Cola extends Emitter {

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

    // 子组件
    // this.components = { }
    // 过滤器
    // this.filters = { }
    // 指令
    // this.directives = { }
    // 模板片段
    // this.partials = { }
    // 实例方法
    // this.methods = { }
    // 监控数据变化
    // this.watchers = { }

    Object.assign(this, options)

    if (isString(this.el)) {
      this.el = find(this.el)
    }

    this.$parser = new Mustache()

    this.$templateAst = this.$parser.parse(
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

    this.fire('compile')

    this.updateView()

  }

  get(keypath) {
    return objectGet(this.data, keypath)
  }

  set(keypath, value) {
    if (isString(keypath)) {
      keypath = {
        [keypath]: value,
      }
    }
    if (this.updateModel(keypath)) {
      this.updateView()
    }
  }

  updateModel(data) {

    let changes = { }

    let oldValue
    objectEach(data, (value, keypath) => {
      oldValue = this.get(keypath)
      if (value !== oldValue) {
        changes[keypath] = [ value, oldValue ]
        objectSet(this.data, keypath, value)
      }
    })

    if (objectCount(changes)) {
      let watchers = this.watchers || { }
      objectEach(changes, (args, keypath) => {
        getWildcardMatches(keypath).forEach(wildcardKeypath => {
          if (isFunction(watchers[wildcardKeypath])) {
            watchers[wildcardKeypath].apply(
              this,
              merge(
                args,
                getWildcardNames(keypath, wildcardKeypath)
              )
            )
          }
        })
      })
      return true
    }

  }

  updateView() {

    let { el, data, $parser, $templateAst, $currentNode } = this

    this.$currentNode = patch(
      $currentNode || el,
      create(
        $parser.render($templateAst, data),
        this
      )
    )

  }

}
