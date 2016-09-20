import {
  isFunction,
} from './is'

let nextTick

if (isFunction(MutationObserver)) {
  nextTick = fn => {
    let observer = new MutationObserver(fn)
    let textNode = document.createTextNode('')
    observer.observe(textNode, {
      characterData: true,
    })
    textNode.data = ' '
  }
}
else if (isFunction(setImmediate)) {
  nextTick = fn => setImmediate(fn)
}
else {
  nextTick = fn => setTimeout(fn)
}

export default nextTick
