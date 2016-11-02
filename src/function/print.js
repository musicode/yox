
module.exports = function print(tpl, ...args) {
  let index = -1
  return tpl.replace(/%s/g, origin => {
    index++
    if (args[index] != null) {
      return args[index]
    }
    return origin
  })
}
