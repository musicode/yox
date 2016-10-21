
import {
  each as arrayEach,
} from './array'

/**
 * 仅支持一句表达式，即不支持 `a + b, b + c`
 * 因此表达式不应出现 , ;
 */

// 节点类型
export const LITERAL = 1
export const IDENTIFIER = 2
export const THIS = 3
export const UNARY = 4
export const BINARY = 5
export const CONDITIONAL = 6
export const ARRAY = 7
export const CALL = 8

// 分隔符
const COMMA  = 44 // ,
const SEMCOL = 59 // ;
const PERIOD = 46 // .
const SQUOTE = 39 // '
const DQUOTE = 34 // "
const OPAREN = 40 // (
const CPAREN = 41 // )
const OBRACK = 91 // [
const CBRACK = 93 // ]
const QUMARK = 63 // ?
const COLON  = 58 // :

const TRUE = true

/**
 * 倒排对象的 key
 *
 * @inner
 * @param {Object} obj
 * @return {Array.<string>}
 */
function sortKeys(obj) {
  return Object.keys(obj).sort(
    function (a, b) {
      return b.length - a.length
    }
  )
}

const unaryOperatorMap = {
  '-': TRUE,
  '!': TRUE,
  '~': TRUE,
  '+': TRUE
}

const sortedUnaryOperatorList = sortKeys(unaryOperatorMap)

// 操作符和对应的优先级，数字越大优先级越高
const binaryOperatorMap = {
  '||': 1,
  '&&': 2,
  '|': 3,
  '^': 4,
  '&': 5,
  '==': 6,
  '!=': 6,
  '===': 6,
  '!==': 6,
  '<': 7,
  '>': 7,
  '<=': 7,
  '>=': 7,
  '<<':8,
  '>>': 8,
  '>>>': 8,
  '+': 9,
  '-': 9,
  '*': 10,
  '/': 10,
  '%': 10,
}

const sortedBinaryOperatorList = sortKeys(binaryOperatorMap)

// 区分关键字和普通变量
// 举个例子：a === true
// 从解析器的角度来说，a 和 true 是一样的 token
const keywords = {
  'true': TRUE,
  'false': false,
  'null': null,
  'undefined': undefined,
}

/**
 * 是否是数字
 *
 * @inner
 * @param {string} char
 * @return {boolean}
 */
function isNumber(char) {
  return char >= 48 && char <= 57 // 0...9
}

/*
 * 是否是空白符
 *
 * @inner
 * @param {string} char
 * @return {boolean}
 */
function isWhitespace(char) {
  return char === 32  // space
    || char === 9     // tab
}

/**
 * 变量开始字符必须是 字母、下划线、$
 *
 * @inner
 * @param {string} char
 * @return {boolean}
 */
function isIdentifierStart(char) {
  return char === 36 // $
    || char === 95   // _
    || (char >= 97 && char <= 122) // a...z
    || (char >= 65 && char <= 90)  // A...Z
}

/**
 * 变量剩余的字符必须是 字母、下划线、$、数字
 *
 * @inner
 * @param {string} char
 * @return {boolean}
 */
function isIdentifierPart(char) {
  return isIdentifierStart(char) || isNumber(char)
}

/**
 * 用倒排 token 去匹配 content 的开始内容
 *
 * @inner
 * @param {string} content
 * @param {Array.<string>} sortedTokens 数组长度从大到小排序
 * @return {string}
 */
function matchBestToken(content, sortedTokens) {
  let result
  arrayEach(sortedTokens, function (token) {
    if (content.startsWith(token)) {
      result = token
      return false
    }
  })
  return result
}

/**
 * 创建一个二元表达式
 *
 * @inner
 * @param {string} operator
 * @param {string} left
 * @param {string} right
 * @return {Object}
 */
function createBinary(right, operator, left) {
  return {
    type: BINARY,
    operator,
    left,
    right,
  }
}

function createUnary(operator, argument) {
  return {
    type: UNARY,
    operator,
    argument,
  }
}

function createLiteral(value, raw) {
  return {
    type: LITERAL,
    value,
    raw,
  }
}

function createIdentifier(name) {
  return {
    type: IDENTIFIER,
    name,
  }
}

function createThis() {
  return {
    type: THIS,
  }
}

function createArray(elements) {
  return {
    type: ARRAY,
    elements,
  }
}

/**
 * 懒得说各种细节错误，表达式都输出了看不出原因我也没办法
 *
 * @inner
 * @param {string} expression
 * @return {Error}
 */
function throwError(expression) {
  return new Error('Expression parse error: [${expression}]')
}

/**
 * 解析表达式
 *
 * 解析结果是一个 function，传入数据即可求值
 * 因此本模块实际要做的是找出最外层的依赖，举个例子
 *
 * ```javascript
 * age > 18 ? '成年' : '未成年'
 * ```
 *
 * 这里只需要找到 age 即可，然后把它封装为下面的函数
 *
 * ```javascript
 * function (age) {
 *     return age > 18 ? '成年' : '未成年'
 * }
 * ```
 *
 * @param {string} content 表达式字符串
 * @return {Funtion}
 */
export function parse(content) {

  let { length } = content
  let index = 0
  let charCode
  let value

  function getChar() {
    return content.charAt(index)
  }
  function getCharCode() {
    return content.charCodeAt(index)
  }

  function testCharCode(charCode) {
    if (getCharCode() === charCode) {
      index++
      return TRUE
    }
  }

  function skipWhitespace() {
    while (isWhitespace(getCharCode())) {
      index++
    }
  }

  function skipNumber() {
    while (isNumber(getCharCode())) {
      index++
    }
  }

  function skipString(quoteCode) {
    let closed
    while (index < length) {
      if (testCharCode(quoteCode)) {
        closed = TRUE
      }
      index++
      if (closed) {
        break
      }
    }
    if (!closed) {
      return throwError()
    }
  }

  function skipIdentifier() {
    do {
      index++
    }
    while (isIdentifierPart(getCharCode()))
  }

  function parseNumber() {

    let start = index

    skipNumber()
    if (testCharCode(PERIOD)) {
      skipNumber()
    }

    charCode = getCharCode()
    if (charCode === PERIOD
      || isIdentifierStart(charCode)
    ) {
      throw throwError()
    }

    value = content.substr(start, index)
    return createLiteral(parseFloat(value), value)

  }

  function parseString(delimiter) {

    let start = index
    skipString(delimiter)

    value = content.substr(start, index)
    return createLiteral(value, `${delimiter}${value}${delimiter}`)

  }

  function parseIdentifier() {

    let start = index
    skipIdentifier()

    value = content.substr(start, index)
    if (keywords[value]) {
      return createLiteral(keywords[value], value)
    }
    else if (value === 'this') {
      return createThis()
    }
    else if (value) {
      return createIdentifier(value)
    }

    return throwError()

  }

  function parseTuple(delimiter) {

    let args = [], closed

    while (index < length) {
      skipWhitespace()
      if (testCharCode(delimiter)) {
        closed = TRUE
      }
      else if (!testCharCode(COMMA)) {
        args.push(
          parseExpression()
        )
      }
    }

    return closed ? args : throwError()

  }

  function parseGroup() {
    value = parseExpression()
    skipWhitespace()
    return testCharCode(CPAREN) ? value : throwError()
  }

  function parseToken() {
    skipWhitespace()

    if (testCharCode(SQUOTE)) {
      return parseString(SQUOTE)
    }
    else if (testCharCode(DQUOTE)) {
      return parseString(DQUOTE)
    }
    else if (testCharCode(OBRACK)) {
      return createArray(
        parseTuple(CBRACK)
      )
    }
    else if (testCharCode(OPAREN)) {
      return parseGroup()
    }

    charCode = getCharCode()
    if (isNumber(charCode) || charCode === PERIOD) {
      return parseNumber()
    }
    else if (isIdentifierStart(charCode)) {
      return parseIdentifier()
    }
    else {
      let operator = parseUnaryOperator()
      if (operator) {
        value = parseToken()
        if (value) {
          return createUnary(operator, value)
        }
      }
    }
    return throwError()
  }

  function parseUnaryOperator() {
    skipWhitespace()
    value = matchBestToken(content.substr(index), sortedUnaryOperatorList)
    if (value) {
      index += value.length
      return value
    }
  }

  function parseBinaryOperator() {
    skipWhitespace()
    value = matchBestToken(content.substr(index), sortedBinaryOperatorList)
    if (value) {
      index += value.length
      return {
        value,
        prec: binaryOperatorMap[value],
      }
    }
  }

  function parseBinary() {

    let left = parseToken()
    let operator = parseBinaryOperator()
    if (!operator) {
      return left
    }

    let right = parseToken()
    let stack = [left, operator, right]

    while (operator = parseBinaryOperator()) {
      // 处理左边
      if (stack.length > 2 && operator.prec < stack[stack.length - 2].prec) {
        stack.push(
          createBinary(
            stack.pop(),
            stack.pop().value,
            stack.pop()
          )
        )
      }

      right = parseToken()
      if (!right) {
        return throwError()
      }
      stack.push(operator, right)
    }

    // 处理右边
    // 右边只有等到所有 token 解析完成才能开始
    // 比如 a + b * c / d
    // 此时右边的优先级 >= 左边的优先级，因此可以脑残的直接逆序遍历

    right = stack.pop()
    while (stack.length > 1) {
      right = createBinary(
        right,
        stack.pop().value,
        stack.pop()
      )
    }

    return right

  }

  function parseExpression() {

    // 主要是区分三元和二元表达式
    // 三元表达式可以认为是 3 个二元表达式组成的
    // test ? consequent : alternate

    let test = parseBinary()
    skipWhitespace()

    if (testCharCode(QUMARK)) {
      let consequent = parseBinary()
      skipWhitespace()
      if (testCharCode(COLON)) {
        let alternate = parseBinary()
        return {
          type: CONDITIONAL,
          test,
          consequent,
          alternate,
        }
      }
      else {
        return throwError()
      }
    }

    return test

  }

  return parseExpression()

}

/**
 * 创建一个可执行的函数来运行该代码
 *
 * @param {Object} ast
 * @return {Function}
 */
export function compile(ast) {

}

/**
 * 遍历抽象语法树
 *
 * @param {Object} ast
 */
export function traverse(ast) {

}
