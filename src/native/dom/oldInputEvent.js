
export function on(el, listener) {
  let oldValue = el.value
  listener.$listener = function (e) {
    if (e.originalEvent.propertyName === 'value') {
      let newValue = el.value
      if (newValue !== oldValue) {
        let result = listener.call(this, e)
        oldValue = newValue
        return result
      }
    }
  }
  el.attachEvent('onpropertychange', listener.$listener)
}

export function off(el, listener) {
  el.detachEvent('onpropertychange', listener.$listener)
  delete listener.$listener
}
