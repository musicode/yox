
export function excape(str) {
  return str.replace(/[-^$+?*.|\/\\(){}\[\]]/g, '\\$&')
}

export function parse(str, flag) {
  let Class = RegExp
  if (str instanceof Class) {
    return str
  }
  return flag ? new Class(excape(str), flag) : new Class(excape(str))
}
