
import Scanner from '../helper/Scanner'
import print from '../../function/print'

import {
  isWhitespace,
  isBreakLine,
} from '../../util/char'

import {
  lastItem,
} from '../../util/array'

// 开始标签
const openingTagPattern = /\{\{\s*/
// 结束标签
const closingTagPattern = /\s*\}\}/
// 不转义的开始符号
const unescapeOpeningSymbolPattern = /\{\s*/
// 不转义的结束符号
const unescapeClosingSymbolPattern = /\s*\}/

const REF = 'ref'
const TEXT = 'text'
const UNESCAPE = 'unescape'
const PARTIAL = 'partial'
const SECTION = 'section'
const OPENING_SECTION = 'opening_section'
const CLOSING_SECTION = 'closing_section'

export default class Mustache {

  parse(template, partials) {

    // 最终返回的 tokens
    let tokens = []

    // section 栈
    let sections = []

    // 当前行
    let line = 1
    // 当前列
    let column = 0
    // 当前行是否有标签
    let hasTag
    // 当前行是否有非空白符
    let hasNonWhitespace
    // 当前行的空白符
    let whitespaces = []

    // 当前正在处理的文本
    let type
    let value
    let token
    let tagFirstChar
    let tempLine
    let tempColumn
    let tempValue

    let scanner = new Scanner(template)

    let newLine = () => {
      if (hasTag && !hasNonWhitespace) {
        let i = whitespaces.length - 2
        while (i >= 0) {
          tokens[whitespaces[i--]] = null
        }
      }

      whitespaces.length = 0

      hasTag =
      hasNonWhitespace = false

      line++
      column = 0
    }

    while (scanner.hasNext()) {
      // 找开始标签
      value = scanner.nextBefore(openingTagPattern)

      // 开始标签之前的文本
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
            newLine()
          }

        }
      }

      // 查找开始标签
      value = scanner.nextAfter(openingTagPattern)
      // 记录这里的位置会比较好
      tempLine = line
      tempColumn = column

      // 更新 column，因为上一步已经记录过，所以这里可以放心更新
      column += value.length

      if (value) {
        value = null
        hasTag = true

        tagFirstChar = scanner.currentChar()
        switch (tagFirstChar) {
          case '{':
            type = UNESCAPE
            value = scanner.nextAfter(unescapeOpeningSymbolPattern)
            value = scanner.nextBefore(unescapeClosingSymbolPattern)
            column += value.length + scanner.nextAfter(unescapeClosingSymbolPattern).length
            break
          case '>':
            type = PARTIAL
            break
          case '#':
            type = OPENING_SECTION
            break
          case '/':
            type = CLOSING_SECTION
            break
          default:
            type = REF
            break
        }

        if (value == null) {
          value = scanner.nextBefore(closingTagPattern)
          column += value.length
        }

        // 到这里应该位于结束标签之前
        tempValue = scanner.nextAfter(closingTagPattern)
        column += tempValue.length

        if (!tempValue) {
          throw new Error(
            print('Tag is not closed at line: %s, col: %s.', tag.line, tag.column)
          )
        }

        token = {
          type,
          value,
          line: tempLine,
          column: tempColumn,
        }

        tokens.push(token)

        switch (type) {
          case OPENING_SECTION:
            sections.push(token)
            break
          case CLOSING_SECTION:
            let popedToken = sections.pop()
            // [TODO] 判断开始结束标签名称是否相同
            if (popedToken.value === token.value) {

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
