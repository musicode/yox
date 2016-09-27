
import Scanner from '../helper/Scanner'
import print from '../../function/print'

import {
  isWhitespace,
  isBreakLine,
} from '../../util/char'

import {
  lastItem,
} from '../../util/array'

// 开始定界符
const openingDelimiterPattern = /\{\{\s*/
// 结束定界符
const closingDelimiterPattern = /\s*\}\}/

// 不转义的开始符号
const unescapeOpeningSymbolPattern = /\{\s*/
// 不转义的结束符号
const unescapeClosingSymbolPattern = /\s*\}/

const sectionSymbolPattern = /#\s*/
const partialSymbolPattern = />\s*/
const endSymbolPattern = /\/\s*/

// 空白分隔符
const whitespacePattern = /\s+/

// {{ #if xxx }}
const openingIfSymbolPattern = /\s*if\s*/
// {{ else }}
const elseSymbolPattern = /\s*else\s*/
// {{ else if xxx }}
const elseIfSymbolPattern = /\s*else if\s*/
// {{ /if }}
const closingIfSymbolPattern = /\s*\/if\s*/

// {{ #each xxx }}
const openingEachSymbolPattern = /\s*each\s*/
// {{ /each }}
const closingEachSymbolPattern = /\s*\/each\s*/

// {{ #partial xxx }}
const openingPartialSymbolPattern = /\s*partial\s*/
// {{ /partial }}
const closingPartialSymbolPattern = /\s*\/partial\s*/

const REF = 'ref'
const TEXT = 'text'
const UNESCAPE = 'unescape'
const PARTIAL = 'partial'
const SECTION = 'section'
const OPENING_SECTION = 'opening_section'
const CLOSING_SECTION = 'closing_section'

export default class Mustache {

  parse(template, partials) {

    let tokens = []
    let sections = []

    // 当前行
    let line = 1
    // 当前列
    let column = 0
    // 当前行是否有标签
    let hasDelimiter
    // 当前行是否有非空白符
    let hasNonWhitespace
    // 当前行的空白符
    let whitespaces = []

    // 当前 token
    let token
    let type
    let value

    // 临时存储一些变量
    let temp

    let openingItems
    let closingItems

    let scanner = new Scanner(template)

    let nextLine = () => {
      if (hasDelimiter && !hasNonWhitespace) {
        let i = whitespaces.length - 2
        while (i >= 0) {
          tokens[whitespaces[i--]] = null
        }
      }

      whitespaces.length = 0

      hasDelimiter =
      hasNonWhitespace = false

      line++
      column = 0
    }

    while (scanner.hasNext()) {
      // 找开始定界符
      value = scanner.nextBefore(openingDelimiterPattern)

      // 开始定界符之前的文本
      if (value) {
        // 字符遍历
        for (let i = 0, len = value.length; i < len; i++) {
          let char = value.charAt(i)
          // tokens 待 push 的索引
          let pushIndex = tokens.length
          if (isWhitespace(char)) {
            whitespaces.push(pushIndex)
          }
          else {
            hasNonWhitespace = true
          }

          column++

          // 这里会出现连续的 text token
          // 最后需要整理一下
          tokens[pushIndex] = {
            type: TEXT,
            value: char,
            line,
            column,
          }

          if (isBreakLine(char)) {
            nextLine()
          }

        }
      }

      // 查找开始定界符
      value = scanner.nextAfter(openingDelimiterPattern)
      column += value.length

      if (value) {
        value = null
        hasDelimiter = true

        switch (scanner.currentChar()) {
          case '{':
            type = UNESCAPE
            column += scanner.nextAfter(unescapeOpeningSymbolPattern).length
            value = scanner.nextBefore(unescapeClosingSymbolPattern)
            column += value.length + scanner.nextAfter(unescapeClosingSymbolPattern).length
            break
          case '>':
            type = PARTIAL
            column += scanner.nextAfter(partialSymbolPattern).length
            break
          case '#':
            type = OPENING_SECTION
            column += scanner.nextAfter(sectionSymbolPattern).length
            break
          case '/':
            type = CLOSING_SECTION
            column += scanner.nextAfter(endSymbolPattern).length
            break
          default:
            type = REF
            break
        }

        if (value == null) {
          value = scanner.nextBefore(closingDelimiterPattern)
          column += value.length
        }

        // 到这里应该位于结束定界符之前
        temp = scanner.nextAfter(closingDelimiterPattern)
        column += temp.length

        if (!temp) {
          throw new Error(
            print('Tag is not closed at line: %s, col: %s.', line, column)
          )
        }

        token = {
          type,
          value,
          line,
          column,
        }

        tokens.push(token)

        switch (type) {
          case OPENING_SECTION:
            sections.push(token)
            break
          case CLOSING_SECTION:
            openingItems = sections.pop().value.split(whitespacePattern)
            closingItems = token.value.split(whitespacePattern)
            // 结束定界符必须长度为 1
            if (closingItems.length !== 1) {
              throw new Error(
                print('Syntax error at line: %s, column: %s.', line, column)
              )
            }
            if (openingItems[0] !== closingItems[0]) {
              throw new Error(
                print('Tag is not closed at line: %s, column: %s.', line, column)
              )
            }
            break
          case REF:
            hasNonWhitespace = true
            break
        }
      }

    }

    if (sections.pop()) {
      throw new Error(
        print('Section is not closed at line: %s, col: %s', line, column)
      )
    }

    return this.treerify(
      this.clean(tokens)
    )

  }

  /**
   * token 整理
   *
   * @param {Array} tokens
   * @return {Array}
   */
  clean(tokens) {
    let result = []
    let lastToken
    tokens.forEach(token => {
      if (token) {
        if (lastToken && lastToken.type === TEXT && token.type === TEXT) {
          lastToken.value += token.value
        }
        else {
          lastToken = token
          result.push(token)
        }
      }
    })
    return result
  }

  /**
   * 树形化
   *
   * @param {Array} tokens
   * @return {Array}
   */
  treerify(tokens) {
    let tree = []
    let stack = [tree]
    let current = stack[0]
    tokens.forEach(token => {
      if (token.type === OPENING_SECTION) {
        token = {
          ...token,
          type: SECTION,
        }
        current.push(token)
        current = token.children = []
        stack.push(current)
      }
      else if (token.type === CLOSING_SECTION) {
        stack.pop()
        current = lastItem(stack)
      }
      else {
        current.push(token)
      }
    })
    return tree
  }
}
