
import {
  isFunction,
} from '../util/is'

import {
  print,
} from '../function/print'

/**
 * 是否是调试状态
 * 调试状态下会打印很多消息
 *
 * @type {boolean}
 */
export const debug = true

/**
 * 是否在浏览器运行
 *
 * @type {boolean}
 */
export const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * 浏览器环境下的 window 对象
 *
 * @type {?Window}
 */
export const win = inBrowser ? window : null

/**
 * 浏览器环境下的 document 对象
 *
 * @type {?Document}
 */
export const doc = inBrowser ? document : null

/**
 * 全局使用的空函数
 *
 * @return {Function}
 */
export const noop = function () {}

/**
 * 是否有原生的日志特性，没有需要单独实现
 *
 * @inner
 * @param {boolean}
 */
const hasConsole = typeof console !== 'undefined' && isFunction(console.log)

/**
 * 打印消息日志
 *
 * @param {string} tpl
 * @param {?*} ...args
 */
export const log = debug && hasConsole
  ? function (tpl, ...args) {
    console.log(print(tpl, ...args))
  }
  : noop

/**
 * 打印警告日志
 *
 * @param {string} tpl
 * @param {?*} ...args
 */
export const warn = debug && hasConsole
  ? function (tpl, ...args) {
    console.warn(tpl)
  }
  : noop
