
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
  ELEMENT,
} from '../nodeType'

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
    let isAttributeReading

    let errorPos

    let nodeStacks = []

    let pushStack = function (node) {
      if (currentNode) {
        console.log('push', node)
        nodeStacks.push(currentNode)
      }
      currentNode = node
    }

    let popStack = function () {
      let node = nodeStacks.pop()
      currentNode = lastItem(nodeStacks)
      console.log('pop', node)
      return node
    }

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
      If, ElseIf, Else, Each, Partial, Expression, Import, Variable,
    ]

    // 这个函数涉及分隔符和普通模板的深度解析
    // 是最核心的函数
    let parseContent = function (content) {
      helperScanner.reset(content)

      while (helperScanner.hasNext()) {



        // 分隔符之前的内容
        content = helperScanner.nextBefore(openingDelimiterPattern)
        if (currentNode.type === ELEMENT && isAttributeReading) {
          newNode = new Attribute(currentNode, { name: content })
          currentNode.addAttr(newNode)
          pushStack(newNode)
        }
        else {
          newNode = new Text(currentNode, { content })
          currentNode.addChild(newNode)
        }

        helperScanner.nextAfter(openingDelimiterPattern)





        // 分隔符之间的内容
        content = helperScanner.nextBefore(closingDelimiterPattern)
        console.log('===>',content)
        if (content.charAt(0) === '/') {
          popStack()
        }
        else {
          each(nodeList, function (Node) {
            if (isFunction(Node.match)) {
              let match = Node.match(content)
              if (match) {
                newNode = new Node(currentNode, match)
                currentNode.addChild(newNode)
                if (newNode.children) {
                  pushStack(newNode)
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
        else if (tagName !== (popStack() || rootNode).name) {
          return throwError('开始标签和结束标签匹配失败')
        }

        elementScanner.forward(1)
      }
      // 开始标签
      else {
        content = elementScanner.nextAfter(elementPattern)
        tagName = content.substr(1)
console.log('tag start: ', tagName)
        isComponent = componentPattern.test(tagName)
        isSelfClosingTag = isComponent ? true : selfClosingTagPattern.test(tagName)

        newNode = new Element(currentNode, { name: tagName })
        if (!rootNode) {
          rootNode = newNode
        }
        if (currentNode) {
          currentNode.addChild(newNode)
        }

        if (!isSelfClosingTag) {
          pushStack(newNode)
        }

        content = elementScanner.nextBefore(elementEndPattern)
        if (content) {
          isAttributeReading = true
          parseContent(content)
          isAttributeReading = false
        }

        content = elementScanner.nextAfter(elementEndPattern)
        if (!content) {
          return throwError('标签缺少 >')
        }
      }
    }
console.log(nodeStacks)
    if (nodeStacks.length) {
      return throwError('节点没有正确的结束')
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
