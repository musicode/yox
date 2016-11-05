
import * as pattern from './config/pattern'
import * as lifecycle from './config/lifecycle'

import {
  TRUE,
  NULL,
} from './config/env'

import {
  parse as parseTemplate,
  render as renderTemplate,
} from './compiler/parser/mustache'

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
  each,
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
  get as componentGet,
  set as componentSet,
  bind as componentBind,
  magic as componentMagic,
} from './util/component'

import {
  find,
} from './native/dom/helper'

import {
  patch,
  create,
} from './native/dom/vdom'

// 5 个内建指令，其他指令通过扩展实现
import ref from './directive/ref'
import lazy from './directive/lazy'
import event from './directive/event'
import model from './directive/model'
import component from './directive/component'


let globalComponents = { }
let globalDirectives = { ref, lazy, event, model, component }
let globalFilters = { }
let globalPartials = { }

module.exports = class York {

  /**
   * 全局组件
   *
   * @type {Object}
   */
  static components = globalComponents

  /**
   * 全局指令
   *
   * @type {Object}
   */
  static directives = globalDirectives

  /**
   * 全局过滤器
   *
   * @type {Object}
   */
  static filters = globalFilters

  /**
   * 全局模板片段
   *
   * @type {Object}
   */
  static partials = globalPartials

  static component = componentMagic(globalComponents)
  static directive = componentMagic(globalDirectives)
  static filter = componentMagic(globalFilters)
  static partial = componentMagic(globalPartials)

  /**
   * 是否同步更新
   *
   * @type {boolean}
   */
  static sync = TRUE

  /**
   * 配置项
   *
   * @constructor
   * @param {Object} options
   */
  constructor(options) {

    let {
      el,
      data,
      props,
      parent,
      replace,
      computed,
      template,
      watchers,
      components,
      directives,
      events,
      filters,
      methods,
      partials,
    } = options

    // el 和 template 都可以传选择器
    template = pattern.tag.test(template)
      ? template
      : find(template).innerHTML

    el = isString(el)
      ? find(el)
      : el

    if (__DEBUG__) {
      if (!el || el.nodeType !== 1) {
        throw new Error('el must be a html element.')
      }
      if (props && isObject(data)) {
        throw new Error('component data must be a function.')
      }
    }

    if (!replace) {
      el.innerHTML = '<div></div>'
      el = el.firstChild
    }

    let instance = this

    if (parent) {
      instance.$parent = parent
    }

    // 拆分实例方法和生命周期函数
    let hooks = { }
    objectEach(
      lifecycle,
      function (name) {
        hooks[`on${name}`] = name
      }
    )

    if (isObject(methods)) {
      objectEach(
        methods,
        function (value, key) {
          instance[key] = value
        }
      )
    }

    data = isFunction(data) ? data.call(instance) : data
    if (isObject(props)) {
      if (!isObject(data)) {
        data = { }
      }
      objectExtend(data, props)
    }
    if (data) {
      instance.$data = data
    }

    if (isObject(components)) {
      instance.$components = components
    }
    if (isObject(directives)) {
      instance.$directives = directives
    }
    if (isObject(filters)) {
      instance.$filters = filters
    }
    if (isObject(partials)) {
      instance.$partials = partials
    }

    if (isObject(computed)) {

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

      objectEach(
        computed,
        function (item, keypath) {
          let get, set, cache = TRUE
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
            let getter = function () {

              if (cache && objectHas($computedCache, keypath)) {
                return $computedCache[keypath]
              }

              // 新推一个依赖收集数组
              $computedStack.push([ ])
              let result = get.call(instance)

              // 处理收集好的依赖
              let newDeps = $computedStack.pop()
              let oldDeps = $computedDeps[keypath]
              $computedDeps[keypath] = newDeps

              // 增加了哪些依赖，删除了哪些依赖
              let addedDeps = [ ]
              let removedDeps = [ ]
              if (isArray(oldDeps)) {
                each(
                  merge(oldDeps, newDeps),
                  function (dep) {
                    let oldExisted = hasItem(oldDeps, dep)
                    let newExisted = hasItem(newDeps, dep)
                    if (oldExisted && !newExisted) {
                      removedDeps.push(dep)
                    }
                    else if (!oldExisted && newExisted) {
                      addedDeps.push(dep)
                    }
                  }
                )
              }
              else {
                addedDeps = newDeps
              }

              each(
                addedDeps,
                function (dep) {
                  if (!isArray($computedWatchers[dep])) {
                    $computedWatchers[dep] = []
                  }
                  $computedWatchers[dep].push(keypath)
                }
              )

              each(
                removedDeps,
                function (dep) {
                  removeItem($computedWatchers[dep], keypath)
                }
              )

              // 不论是否开启 computed cache，获取 oldValue 时还有用
              // 因此要存一下
              $computedCache[keypath] = result

              return result
            }
            getter.computed = TRUE
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
      hooks,
      function (value, key) {
        if (isFunction(options[key])) {
          instance.on(value, options[key])
        }
      }
    )

    instance.fire(lifecycle.INIT)

    if (isObject(events)) {
      objectEach(
        events,
        function (listener, type) {
          if (isFunction(listener)) {
            instance.on(type, listener)
          }
        }
      )
    }

    // 监听数据变化
    instance.$watchEmitter = new Emitter()

    if (isObject(watchers)) {
      objectEach(
        watchers,
        function (watcher, keypath) {
          instance.watch(keypath, watcher)
        }
      )
    }

    // 准备就绪
    instance.fire(lifecycle.CREATE)

    // 编译结果
    instance.$template = parseTemplate(
      template,
      function (name) {
        return componentGet(instance, 'partial', name)
      },
      function (name, node) {
        componentSet(instance, 'partial', name, node)
      }
    )

    instance.fire(lifecycle.COMPILE)

    instance.updateView(el)

  }

  get(keypath) {

    let {
      $data,
      $computedStack,
      $computedGetters,
    } = this

    if (isArray($computedStack)) {
      let deps = lastItem($computedStack)
      if (deps) {
        deps.push(keypath)
      }

      let getter = $computedGetters[keypath]
      if (getter) {
        return getter()
      }
    }

    let result = objectGet($data, keypath)
    if (result) {
      return result.value
    }

  }

  set(keypath, value) {
    let model = keypath
    if (isString(keypath)) {
      model = { }
      model[keypath] = value
    }
    if (this.updateModel(model)) {
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

  fire(type, data, bubble) {
    if (arguments.length === 2 && data === TRUE) {
      bubble = data
      data = NULL
    }
    let instance = this
    let { parent, $eventEmitter } = instance
    if (!$eventEmitter.fire(type, data, instance)) {
      let { parent } = instance
      if (bubble && parent) {
        parent.fire(type, data, bubble)
      }
    }
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

    let instance = this

    let {
      $data,
      $watchEmitter,
      $computedCache,
      $computedWatchers,
      $computedSetters,
    } = instance

    let hasComputed = isObject($computedWatchers),
      changes = [ ],
      setter,
      oldValue

    objectEach(
      model,
      function (value, keypath) {
        oldValue = instance.get(keypath)
        if (value !== oldValue) {

          changes.push({
            keypath,
            args: [ value, oldValue ]
          })

          if (hasComputed && isArray($computedWatchers[keypath])) {
            each(
              $computedWatchers[keypath],
              function (watcher) {
                if (objectHas($computedCache, watcher)) {
                  delete $computedCache[watcher]
                }
              }
            )
          }

          // 计算属性优先
          if (hasComputed) {
            setter = $computedSetters[keypath]
            if (setter) {
              setter(value)
              return
            }
          }

          objectSet($data, keypath, value)

        }
      }
    )

    if (changes.length) {
      each(
        changes,
        function (item) {
          let { keypath, args } = item
          each(
            getWildcardMatches(keypath),
            function (wildcardKeypath) {
              $watchEmitter.fire(
                wildcardKeypath,
                merge(args, getWildcardNames(keypath, wildcardKeypath)),
                instance
              )
            }
          )
        }
      )
      return TRUE
    }

  }

  updateView(el) {

    let instance = this

    let {
      $data,
      $filters,
      $template,
      $currentNode,
      $computedGetters,
    } = instance

    let context = { }

    each(
      [ globalFilters, $filters ],
      function (item) {
        if (isObject(item)) {
          objectExtend(
            context,
            componentBind(instance, item)
          )
        }
      }
    )

    each(
      [ $data, $computedGetters ],
      function (item) {
        if (isObject(item)) {
          objectExtend(context, item)
        }
      }
    )

    let newNode = create(
      renderTemplate($template, context),
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

  create(options, extra) {
    options = objectExtend({ }, options, extra)
    options.parent = this
    return new York(options)
  }

  dispose() {
    this.fire(lifecycle.DETACH)
  }

}

/**
 * [TODO]
 * 1. snabbdom prop 和 attr 的区分
 * 2. 组件之间的事件传递（解决）
 * 3. Emitter 的事件广播、冒泡（解决）
 * 4. 组件属性的组织形式（解决）
 * 5. 计算属性是否可以 watch（不可以）
 * 6. 需要转义的文本节点如果出现在属性值里，是否需要 encode
 * 7. 数组方法的劫持（不需要劫持，改完再 set 即可）
 * 8. 属性延展（用 #each 遍历数据）
 * 9. 报错信息完善
 * 10. SEO友好
 * 11. 计算属性的观测用 Emitter 是否更好？
 * 12. keypath 还原
 */
