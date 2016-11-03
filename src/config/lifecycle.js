
/**
 * 数据观测、事件和 watcher 都尚未初始化
 *
 * @type {string}
 */
export const INIT = 'init'

/**
 * 已创建数据绑定，计算属性，方法，watcher/事件回调。
 * 但是还没有开始 DOM 编译，$el 还不存在。
 *
 * @type {string}
 */
export const CREATE = 'create'

/**
 * 在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新
 *
 * @type {string}
 */
export const COMPILE = 'compile'

export const ATTACH = 'attach'
export const UPDATE = 'update'
export const DETACH = 'detach'
