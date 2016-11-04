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
