
import {
  win,
  noop,
  vendors,
} from '../config/env'

import {
  isString,
  isFunction,
} from './is'

let requestAnimationFrame
let cancelAnimationFrame

if (win) {
  let prefix
  if (isFunction(win.requestAnimationFrame)) {
    prefix = ''
  }
  else {
    for (let i = 0, len = vendors.length; i < len; i++) {
      if (isFunction(win[`${vendors[i]}RequestAnimationFrame`])) {
        prefix = vendors[i]
        break
      }
    }
  }

  if (isString(prefix)) {
    requestAnimationFrame = win[`${prefix}RequestAnimationFrame`]
    cancelAnimationFrame = win[`${prefix}CancelAnimationFrame`]
  }
  else if (isFunction(win.setTimeout)) {
    // 模拟 requestAnimationFrame 的要点是
    // 保证帧率是 60帧/每秒
    let lastFrameTime = 0
    let timePerFrame = 1000 / 60
    requestAnimationFrame = callback => {

      let now = Date.now()
      let waitingTime = timePerFrame - (now - lastFrameTime)
      if (waitingTime < 0) {
        waitingTime = 0
      }
      let nextFrameTime = now + waitingTime

      let id = win.setTimeout(
        () => {
          callback(nextFrameTime)
        },
        waitingTime
      )

      lastFrameTime = nextFrameTime

      return id
    }
    cancelAnimationFrame = id => {
      win.clearTimeout(id)
    }
  }
}

if (requestAnimationFrame == null) {
  requestAnimationFrame = noop
}
if (cancelAnimationFrame == null) {
  cancelAnimationFrame = noop
}

export requestAnimationFrame
export cancelAnimationFrame
