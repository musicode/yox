let nextTick

if (typeof MutationObserver === 'function') {
  nextTick = fn => {
    let observer = new MutationObserver(fn)
    let textNode = document.createTextNode('')
    observer.observe(textNode, {
      characterData: true,
    })
    textNode.data = ' '
  }
}
else if (typeof setImmediate === 'function') {
  nextTick = fn => setImmediate(fn)
}
else {
  nextTick = fn => setTimeout(fn)
}

export default nextTick
