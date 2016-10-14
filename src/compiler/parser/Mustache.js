
/**
 * 把模板字符串解析成返回 virtual dom 的 function
 *
 * 从前到后扫描模板，提取出需要的节点
 *
 */

import Cola from '../../Cola'

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
  isWhitespace,
  isBreakLine,
} from '../../util/char'

import {
  lastItem,
} from '../../util/array'

import {
  parse as parsePattern,
} from '../../util/pattern'

// 切分分为两个维度
// 一个是 element，一个是 delimiter

const openingDelimiterPattern = /\{\{\s*/
const closingDelimiterPattern = /\s*\}\}/

const elementPattern = /<(?:\/)?[a-z]\w*/i
const elementEndPattern = /(?:\/)?>/

const attributePattern = /[-:@a-z0-9]+(?:=(["'])[^\1]+\1)?/i

const selfClosingTags = [ 'input', 'img', 'br' ]

const componentPattern = /[-A-Z]/

export default class Mustache {

  constructor() {

    this.ifPattern = parsePattern(Cola.IF)
    this.elsePattern = parsePattern(Cola.ELSE)
    this.elseIfPattern = parsePattern(Cola.ELSE_IF)
    this.endIfPattern = parsePattern(Cola.END_IF)

    this.eachPattern = parsePattern(Cola.EACH)
    this.endEachPattern = parsePattern(Cola.END_EACH)

    this.importPattern = parsePattern(Cola.IMPORT)
    this.partialPattern = parsePattern(Cola.PARTIAL)
    this.endPartialPattern = parsePattern(Cola.END_PARTIAL)

  }

  parse(template, partials) {

    let rootNode
    let currentNode

    let {
      ifPattern,
      elsePattern,
      elseIfPattern,
      endIfPattern,
      eachPattern,
      endEachPattern,
      importPattern,
      partialPattern,
      endPartialPattern,
    } = this

    let elementScanner = new Scanner(template)
    let helperScanner = new Scanner()

    let content
    let openingTag
    let closingTag
    let isComponent
    let isSelfClosingTag
    let hasAttributeScanned

    let errorPos

    let elementStacks = []
    let blockStacks = []

    let throwError = function (msg) {
      if (errorPos != null) {
        let { line, col } = getLocationByIndex(template, errorPos)
        return warn(msg, line, col)
      }
      else {
        return warn(msg)
      }
    }

    let parseContent = function (content) {
      helperScanner.reset(content)
      while (helperScanner.hasNext()) {
        content = helperScanner.nextBefore(openingDelimiterPattern)
        currentNode.addChild(
          new Text(currentNode, content)
        )
        helperScanner.nextAfter(openingDelimiterPattern)
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
        closingTag = content.substr(2)

        if (elementScanner.charAt(0) !== '>') {
          return throwError('closing tag has error at line %d, col %d.')
        }
        else if (closingTag !== openingTag) {
          return throwError('closingTag can not match openingTag at line %d, col %d.')
        }

        elementScanner.forward(1)
        elementStacks.pop()
      }
      // 开始标签
      else {
        content = elementScanner.nextAfter(elementPattern)
        openingTag = content.substr(1)

        isComponent = componentPattern.test(openingTag)
        isSelfClosingTag = isComponent ? true : selfClosingTags.indexOf(openingTag) >= 0

        currentNode = new Element(currentNode, openingTag)
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
          return throwError('Element is not complete rightly.')
        }
      }
    }

    if (elementStacks.length) {
      return throwError('标签没有正确的结束.')
    }

    if (blockStacks.length) {
      return throwError('块级语法没有正确的结束.')
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
