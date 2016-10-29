
import Mustache from './compiler/parser/Mustache'

import * as lifecycle from './lifecycle'

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
  extend as objectExtend,
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

import lazy from './directive/lazy'
import event from './directive/event'
import model from './directive/model'

function bindFunctions(functions, thisArg) {
  let result = { }
  objectEach(functions, function (fn, name) {
    result[name] = fn.bind(thisArg)
  })
  return result
}

export default class Cola {

  /**
   * 全局指令
   *
   * @type {Object}
   */
  static directives = { lazy, event, model }

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

    this.data = options.data
    this.components = options.components
    this.methods = options.methods

    this.el = isString(options.el) ? find(options.el) : options.el

    this.directives = objectExtend({}, Cola.directives, options.directives)
    this.filters = bindFunctions(objectExtend({}, Cola.filters, options.filters), this)
    this.partials = objectExtend({}, Cola.partials, options.partials)

    // 把计算属性拆为 getter 和 setter
    this.$computedGetters = { }
    this.$computedSetters = { }

    if (isObject(options.computed)) {
      objectEach(options.computed, (item, keypath) => {
        if (isFunction(item)) {
          item = item.bind(this)
          // 当模板读取计算属性时，可通过 toString 求值
          // 省的写一堆乱七八糟的判断逻辑
          item.toString = item
          this.$computedGetters[keypath] = item
        }
        else if (isObject(item)) {
          let { get, set } = item
          if (isFunction(get)) {
            this.$computedGetters[keypath] = get.bind(this)
          }
          if (isFunction(set)) {
            this.$computedSetters[keypath] = set.bind(this)
          }
        }
      })
    }

    // 监听各种事件
    this.$eventEmitter = new Emitter()

    objectEach(lifecycle, name => {
      let listener = options[`on${name}`]
      if (isFunction(listener)) {
        this.on(name, listener)
      }
    })

    // 监听数据变化
    this.$watchEmitter = new Emitter()

    if (isObject(options.watchers)) {
      objectEach(options.watchers, (watcher, keypath) => {
        this.watch(keypath, watcher)
      })
    }

    this.fire(lifecycle.CREATE)

    // 编译模板
    this.$parser = new Mustache()
    this.$templateAst = this.$parser.parse(
      options.template,
      name => {
        return this.partials[name] || Cola.partials[name]
      },
      (name, node) => {
        this.partials[name] = node
      }
    )

    this.fire(lifecycle.COMPILE)

    this.updateView()

  }

  get(keypath) {
    let getter = this.$computedGetters[keypath]
    if (isFunction(getter)) {
      return getter()
    }
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

  on(type, listener) {
    this.$eventEmitter.on(type, listener)
  }

  once(type, listener) {
    this.$eventEmitter.once(type, listener)
  }

  off(type, listener) {
    this.$eventEmitter.off(type, listener)
  }

  fire(type, data) {
    this.$eventEmitter.fire(type, [data], this)
  }

  watch(keypath, watcher) {
    this.$watchEmitter.on(keypath, watcher)
  }

  watchOnce(keypath, watcher) {
    this.$watchEmitter.once(keypath, watcher)
  }

  toggle(keypath) {
    this.set(
      keypath,
      !this.get(keypath)
    )
  }

  updateModel(data) {

    let changes = { }

    let setter
    let oldValue

    objectEach(data, (value, keypath) => {
      oldValue = this.get(keypath)
      if (value !== oldValue) {
        changes[keypath] = [ value, oldValue ]
        setter = this.$computedSetters[keypath]
        if (isFunction(setter)) {
          setter(value)
        }
        else {
          objectSet(this.data, keypath, value)
        }
      }
    })

    if (objectCount(changes)) {
      objectEach(changes, (args, keypath) => {
        getWildcardMatches(keypath).forEach(wildcardKeypath => {
          this.$watchEmitter.fire(
            wildcardKeypath,
            merge(
              args,
              getWildcardNames(keypath, wildcardKeypath)
            )
          )
        })
      })
      return true
    }

  }

  updateView() {

    let { el, data, $computedGetters, filters, $parser, $templateAst, $currentNode } = this

    let context = {
      ...data,
      ...$computedGetters,
      ...filters,
    }

    this.$currentNode = patch(
      $currentNode || el,
      create(
        $parser.render($templateAst, context),
        this
      )
    )

  }

}
