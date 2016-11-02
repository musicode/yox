
import Mustache from './compiler/parser/Mustache'

import * as lifecycle from './config/lifecycle'

import {
  Emitter,
} from './util/event'

import {
  getWildcardNames,
  getWildcardMatches,
} from './util/keypath'

import {
  has as objectHas,
  get as objectGet,
  set as objectSet,
  each as objectEach,
  count as objectCount,
  extend as objectExtend,
} from './util/object'

import {
  merge,
  hasItem,
  lastItem,
  removeItem,
} from './util/array'

import {
  isArray,
  isString,
  isObject,
  isFunction,
} from './util/is'

import {
  find,
} from './native/dom/helper'

import {
  create,
  patch,
} from './native/dom/vdom'

// 5 个内建指令，其他指令通过扩展实现
import ref from './directive/ref'
import lazy from './directive/lazy'
import event from './directive/event'
import model from './directive/model'
import component from './directive/component'

function bindFunctions(functions, thisArg) {
  let result = { }
  objectEach(functions, function (fn, name) {
    result[name] = fn.bind(thisArg)
  })
  return result
}

module.exports = class Cola {

  /**
   * 全局指令
   *
   * @type {Object}
   */
  static directives = { ref, lazy, event, model, component }

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
   * @constructor
   * @param {Object} options
   * @property {string|HTMLElement} options.el
   * @property {string} options.template
   * @property {Object|Function} options.data
   */
  constructor(options) {

    let instance = this

    Object.assign(instance, options)

    instance.$components = objectExtend({}, options.components)

    let data = isFunction(options.data) ? options.data.call(instance) : options.data
    if (isObject(options.props)) {
      objectExtend(data, options.props)
    }
    instance.$data = data

    // 这里貌似不应该 copy 到实例，否则后续内容占用会很大？
    instance.$directives = objectExtend({}, Cola.directives, options.directives)
    instance.$filters = bindFunctions(objectExtend({}, Cola.filters, options.filters), instance)
    instance.$partials = objectExtend({}, Cola.partials, options.partials)

    // 把计算属性拆为 getter 和 setter
    let $computedGetters =
    instance.$computedGetters = { }

    let $computedSetters =
    instance.$computedSetters = { }

    // 存储计算属性的值，提升性能
    let $computedCache =
    instance.$computedCache = { }

    // 辅助获取计算属性的依赖
    let $computedStack =
    instance.$computedStack = [ ]
    // 计算属性的依赖关系
    // dep => [ computed1, computed2, ... ]
    let $computedWatchers =
    instance.$computedWatchers = { }
    // computed => [ dep1, dep2, ... ]
    let $computedDeps =
    instance.$computedDeps = { }

    if (isObject(options.computed)) {
      objectEach(
        options.computed,
        function (item, keypath) {
          let get, set, cache = true
          if (isFunction(item)) {
            get = item
          }
          else if (isObject(item)) {
            if (objectHas(item, 'cache')) {
              cache = item.cache
            }
            if (isFunction(item.get)) {
              get = item.get
            }
            if (isFunction(item.set)) {
              set = item.set
            }
          }

          if (get) {
            let getter = () => {

              if (cache && objectHas($computedCache, keypath)) {
                return $computedCache[keypath]
              }

              // 新推一个依赖收集数组
              $computedStack.push([])
              let result = get.call(instance)

              // 处理收集好的依赖
              let newDeps = $computedStack.pop()
              let oldDeps = $computedDeps[keypath]
              $computedDeps[keypath] = newDeps

              // 增加了哪些依赖，删除了哪些依赖
              let addedDeps = []
              let removedDeps = []
              if (isArray(oldDeps)) {
                merge(oldDeps, newDeps)
                .forEach(function (dep) {
                  let oldExisted = hasItem(oldDeps, dep)
                  let newExisted = hasItem(newDeps, dep)
                  if (oldExisted && !newExisted) {
                    removedDeps.push(dep)
                  }
                  else if (!oldExisted && newExisted) {
                    addedDeps.push(dep)
                  }
                })
              }
              else {
                addedDeps = newDeps
              }

              addedDeps.forEach(function (dep) {
                if (!isArray($computedWatchers[dep])) {
                  $computedWatchers[dep] = []
                }
                $computedWatchers[dep].push(keypath)
              })

              removedDeps.forEach(function (dep) {
                removeItem($computedWatchers[dep], keypath)
              })

              // 不论是否开启 computed cache，获取 oldValue 时还有用
              // 因此要存一下
              $computedCache[keypath] = result

              return result
            }
            // 当模板读取计算属性时，可通过 toString 求值
            // 省的写一堆乱七八糟的判断逻辑
            getter.toString = getter
            $computedGetters[keypath] = getter
          }

          if (set) {
            $computedSetters[keypath] = set.bind(instance)
          }

        }
      )
    }

    // 监听各种事件
    instance.$eventEmitter = new Emitter()

    objectEach(
      lifecycle,
      name => {
        let listener = options[`on${name}`]
        if (isFunction(listener)) {
          instance.on(name, listener)
        }
      }
    )

    // 监听数据变化
    instance.$watchEmitter = new Emitter()

    if (isObject(options.watchers)) {
      objectEach(
        options.watchers,
        (watcher, keypath) => {
          instance.watch(keypath, watcher)
        }
      )
    }

    // 准备就绪
    instance.fire(lifecycle.CREATE)

    // 编译模板
    instance.$parser = new Mustache()
    instance.$templateAst = instance.$parser.parse(
      options.template.startsWith('#')
      ? find(options.template).innerHTML
      : options.template,
      name => {
        let config = instance.$components[name]
        if (!config) {
          throw new Error(`${name} component is not existed.`)
        }
        return function (extra) {
          return new Cola({
            ...config,
            ...extra,
            replace: true,
          })
        }
      },
      name => {
        let partial = instance.$partials[name]
        if (!partial) {
          throw new Error(`${name} partial is not existed.`)
        }
        return partial
      },
      (name, node) => {
        instance.$partials[name] = node
      }
    )

    instance.fire(lifecycle.COMPILE)


    let el = isString(options.el) ? find(options.el) : options.el
    if (!el || el.nodeType !== 1) {
      throw new Error('el is not a element.')
    }

    // 触发 compile 事件之后再给 $el 赋值
    // 避免有些人在 oncompile 就误以为可以操作 el 了
    if (!options.replace) {
      el.innerHTML = '<div></div>'
      el = el.firstChild
    }

    instance.updateView(el)

  }

  get(keypath) {

    // 计算属性的依赖追踪
    let { $data, $computedGetters, $computedStack } = this
    let deps = lastItem($computedStack)
    if (deps) {
      deps.push(keypath)
    }

    let getter = $computedGetters[keypath]
    if (isFunction(getter)) {
      return getter()
    }
    return objectGet($data, keypath)

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

  updateModel(model) {

    let changes = { }

    let setter
    let oldValue

    let instance = this

    let {
      $data,
      $watchEmitter,
      $computedCache,
      $computedWatchers,
      $computedSetters,
    } = instance

    objectEach(model, function (value, keypath) {
      oldValue = instance.get(keypath)
      if (value !== oldValue) {
        changes[keypath] = [ value, oldValue ]
        setter = $computedSetters[keypath]
        if (isFunction(setter)) {
          setter(value)
        }
        else {
          objectSet($data, keypath, value)
        }
        if (isArray($computedWatchers[keypath])) {
          $computedWatchers[keypath].forEach(function (watcher) {
            if (watcher in $computedCache) {
              delete $computedCache[watcher]
            }
          })
        }
      }
    })

    if (objectCount(changes)) {
      objectEach(
        changes,
        function (args, keypath) {
          getWildcardMatches(keypath).forEach(
            wildcardKeypath => {
              $watchEmitter.fire(
                wildcardKeypath,
                merge(args, getWildcardNames(keypath, wildcardKeypath)),
                instance
              )
            }
          )
        }
      )
      return true
    }

  }

  updateView(el) {

    let instance = this

    let {
      $data,
      $filters,
      $parser,
      $templateAst,
      $currentNode,
      $computedGetters,
    } = instance

    let newNode = create(
      $parser.render($templateAst, {
        ...$data,
        ...$filters,
        ...$computedGetters,
      }),
      instance
    )

    if ($currentNode) {
      $currentNode = patch($currentNode, newNode)
      instance.fire(lifecycle.UDPATE)
    }
    else {
      $currentNode = patch(el, newNode)
      instance.$el = $currentNode.elm
      instance.fire(lifecycle.ATTACH)
    }

    instance.$currentNode = $currentNode

  }

  detach() {
    this.fire(lifecycle.DETACH)
  }

}

/**
 * [TODO]
 * 1. snabbdom prop 和 attr 的区分
 * 2. 组件之间的事件传递
 * 3. Emitter 的事件广播、冒泡
 * 4. 组件属性的组织形式
 * 5. 计算属性是否可以 watch
 * 6. 需要转义的文本节点如果出现在属性值里，是否需要 encode
 * 7. 数组方法的劫持（不需要劫持，改完再 set 即可）
 * 8. 属性延展（用 #each 遍历数据）
 * 9. 报错信息完善
 * 10. SEO友好
 */
