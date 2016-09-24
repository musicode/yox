/**
 * @file 运行环境
 * @author musicode
 */

import {
  isFunction,
} from '../function/is'

import {
  print,
} from '../function/print'

/**
 * 是否是调试状态
 * 调试状态下会打印很多消息
 *
 * @type {boolean}
 */
export const isDebug = true

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
 * 支持的所有厂商前缀
 *
 * @type {Array.<string>}
 */
export const venders = [ 'o', 'ms', 'moz', 'webkit' ]

/**
 * 全局使用的空函数
 *
 * @return {Function}
 */
export const noop = () => {}

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
export const log = isDebug && hasConsole
  ? (tpl, ...args) => console.log(print(tpl, ...args))
  : noop

/**
 * 打印警告日志
 *
 * @param {string} tpl
 * @param {?*} ...args
 */
export const warn = isDebug && hasConsole
  ? (tpl, ...args) => console.warn(print(tpl, ...args))
  : noop
