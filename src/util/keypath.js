
import {
  parse as parseExpression,
  LITERAL,
  IDENTIFIER,
} from './expression'

import {
  escape as escapePattern,
  parse as parsePattern,
} from './pattern'

let normalizeCache = { }
let wildcardMatchesCache = { }

/**
 * 把 obj['name'] 的形式转成 obj.name
 *
 * @param {string} keypath
 * @return {string}
 */
export function normalize(keypath) {

  if (!normalizeCache[keypath]) {
    normalizeCache[keypath] = keypath.indexOf('[') < 0
      ? keypath
      : stringify(parseExpression(keypath))
  }

  return normalizeCache[keypath]

}

/**
 * 把 member 表达式节点解析成 keypath
 *
 * @param {Object} node
 * @return {string}
 */
export function stringify(node) {
  let result = [ ]
  do {
    if (node.property) {
      result.push(node.property.value)
    }
    else if (node.name) {
      result.push(node.name)
    }
  }
  while (node = node.object)
  return result.reverse().join('.')
}

/**
 * 获取可能的 keypath
 *
 * @param {string} keypath
 * @return {string}
 */
export function getWildcardMatches(keypath) {

  if (!wildcardMatchesCache[keypath]) {
    let result = [ ]
    let terms = normalize(keypath).split('.')
    let toWildcard = function (isTrue, index) {
      return isTrue ? '*' : terms[index]
    }
    let boolCombinations = getBoolCombinations(terms.length)
    boolCombinations.forEach(function (items) {
      result.push(
        items.map(toWildcard).join('.')
      )
    })
    wildcardMatchesCache[keypath] = result
  }

  return wildcardMatchesCache[keypath]

}

/**
 * 匹配通配符中的具体名称，如 ('user.name', 'user.*') 返回 ['name']
 *
 * @param {string} keypath
 * @param {string} wildcardKeypath
 * @return {Array.<string>}
 */
export function getWildcardNames(keypath, wildcardKeypath) {

  let result = [ ]
  if (wildcardKeypath.indexOf('*') < 0) {
    return result
  }

  let list = keypath.split('.')
  wildcardKeypath.split('.').forEach(function (name, index) {
    if (name === '*') {
      result.push(list[index])
    }
  })

  return result

}

function getBoolCombinations(num) {
  let result = [ ]
  let toBool = function (value) {
    return value == 1
  }
  let length = parseInt((new Array(num + 1)).join('1'), 2)
  for (let i = 0, binary, j, item; i <= length; i++) {
    // 补零
    binary = i.toString(2)
    if (binary.length < num) {
      binary = `0${binary}`
    }
    // 把 binary 转成布尔值表示
    item = [ ]
    for (j = 0; j < num; j++) {
      item.push(toBool(binary[j]))
    }
    result.push(item)
  }
  return result
}
