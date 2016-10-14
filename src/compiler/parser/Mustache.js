
/**
 * 把模板字符串解析成返回 virtual dom 的 function
 *
 * 从前到后扫描模板，提取出需要的节点
 *
 */

import Scanner from '../helper/Scanner'
import print from '../../function/print'
import getLocationByIndex from '../../function/getLocationByIndex'

import Attribute from '../node/Attribute'
import Directive from '../node/Directive'
import Each from '../node/Each'
import Element from '../node/Element'
import Else from '../node/Else'
import ElseIf from '../node/ElseIf'
import Expression from '../node/Expression'
import If from '../node/If'
import Import from '../node/Import'
import Partial from '../node/Partial'
import Text from '../node/Text'
import Variable from '../node/Variable'

import {
  log,
  warn,
} from '../../config/env'

import {
  isFunction,
} from '../../util/is'

import {
  each,
  lastItem,
} from '../../util/array'

// 切分分为两个维度
// 一个是 element，一个是 delimiter

const openingDelimiterPattern = /\{\{\s*/
const closingDelimiterPattern = /\s*\}\}/

const elementPattern = /<(?:\/)?[a-z]\w*/i
const elementEndPattern = /(?:\/)?>/

const attributePattern = /[-:@a-z0-9]+(?:=(["'])[^\1]+\1)?/i

const selfClosingTagPattern = /input|img|br/i

const componentPattern = /[-A-Z]/

export default class Mustache {

  parse(template, partials) {

    let rootNode
    let currentNode
    let newNode

    let elementScanner = new Scanner(template)
    let helperScanner = new Scanner()

    let content
    let expression
    let tagName
    let isComponent
    let isSelfClosingTag
    let hasAttributeScanned

    let errorPos

    let elementStacks = []
    let blockStacks = []

    let throwError = function (msg) {
      if (errorPos != null) {
        msg += '，位置 line %d, col %d。'
        let { line, col } = getLocationByIndex(template, errorPos)
        return warn(msg, line, col)
      }
      else {
        msg += '。'
        return warn(msg)
      }
    }

    let nodeList = [
      If, ElseIf, Else, Each, Partial, Import, Expression, Variable,
    ]

    // 这个函数涉及分隔符和普通模板的深度解析
    // 是最核心的函数
    let parseContent = function (content) {
      helperScanner.reset(content)

      while (helperScanner.hasNext()) {

        // 分隔符之前的内容
        content = helperScanner.nextBefore(openingDelimiterPattern)
        if (hasAttributeScanned) {
          new Text(currentNode, { content })
        }
        else {
          new Attribute(currentNode, { content })
        }
        helperScanner.nextAfter(openingDelimiterPattern)

        // 分隔符之间的内容
        content = helperScanner.nextBefore(closingDelimiterPattern)
        if (content.charAt(0) === '/') {
          blockStacks.pop()
          currentNode = lastItem(blockStacks)
        }
        else {
          each(nodeList, function (Node) {
            if (isFunction(Node.match)) {
              let match = Node.match(content)
              if (match) {
                newNode = new Node(currentNode, match)
                if (newNode.children) {
                  blockStacks.push(currentNode)
                  currentNode = newNode
                }
              }
            }
          })
        }

        helperScanner.nextAfter(closingDelimiterPattern)

      }
    }

    while (elementScanner.hasNext()) {
      content = elementScanner.nextBefore(elementPattern)
      if (content.trim()) {
        if (!currentNode) {
          return throwError('Component template must have a single root element.')
        }
        // 处理标签之间的内容
        parseContent(content)
      }

      // 接下来如果不是标签，那就是结束了
      if (elementScanner.charAt(0) !== '<') {
        break
      }

      errorPos = elementScanner.pos

      // 结束标签
      if (elementScanner.charAt(1) === '/') {
        content = elementScanner.nextAfter(elementPattern)
        tagName = content.substr(2)
console.log('tag end: ', tagName)
        if (elementScanner.charAt(0) !== '>') {
          return throwError('结束标签缺少 >')
        }
        else if (tagName !== elementStacks.pop().name) {
          return throwError('开始标签和结束标签匹配失败')
        }

        elementScanner.forward(1)
        currentNode = lastItem(elementStacks)
      }
      // 开始标签
      else {
        content = elementScanner.nextAfter(elementPattern)
        tagName = content.substr(1)
console.log('tag start: ', tagName)
        isComponent = componentPattern.test(tagName)
        isSelfClosingTag = isComponent ? true : selfClosingTagPattern.test(tagName)

        currentNode = new Element(currentNode, { name: tagName })
        if (!rootNode) {
          rootNode = currentNode
        }

        if (!isSelfClosingTag) {
          elementStacks.push(currentNode)
        }

        content = elementScanner.nextBefore(elementEndPattern)
        if (content) {
          hasAttributeScanned = false
          parseContent(content)
          hasAttributeScanned = true
        }

        content = elementScanner.nextAfter(elementEndPattern)
        if (!content) {
          return throwError('标签缺少 >')
        }
      }
    }

    if (elementStacks.length) {
      return throwError('标签没有正确的结束')
    }

    if (blockStacks.length) {
      return throwError('块级语法没有正确的结束')
    }

    return rootNode

  }

  parseIf() {

  }

  parseEach() {

  }

  parsePartial() {

  }

  parseElement() {

  }

  nextBefore(scanner) {
    scanner.nextBefore(openingDelimiterPattern)
  }

  next() {

  }

}
