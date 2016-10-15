
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

const attributePattern = /([-:@a-z0-9]+)(?:=(["']))?/i

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
    let isAttributeParsing

    let match
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

    let addChild = function (node, autoPushStack = true) {
      if (currentNode) {
        if (currentNode.type === ELEMENT && isAttributeParsing) {
          currentNode.addAttr(node)
        }
        else {
          currentNode.addChild(node)
        }
        if (autoPushStack && node.children) {
          pushStack(node)
        }
      }
      else {
        rootNode = currentNode = node
      }
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

    // 元素属性上可能出现的节点类型
    let attributeNodes = [
      Attribute, If, ElseIf, Else, Each, Expression, Variable, Text,
    ]

    let nodeList = [
      If, ElseIf, Else, Each, Partial, Expression, Import, Variable,
    ]

    // 这个函数涉及分隔符和普通模板的深度解析
    // 是最核心的函数
    let parseContent = function (content) {
      helperScanner.reset(content)

      while (helperScanner.hasNext()) {

        // 如果是解析 attribute，随便举几个例子：
        //
        // name="value"
        // name="{{#if xxx}}value{{/if}}"
        // name="{{value1}} {{value2}}"
        // {{#if xxx}}name="value"{{/if}}
        //
        // 情况是比较多的，解析的流程应该和模板一样，先用 {{ 进行切分，
        // 如果是 if，就往 currentNode addAttr 一个 if 节点
        // 如果是 name，就往 currentNode
        //  一个 attribute 节点

        // 分隔符之前的内容
        content = helperScanner.nextBefore(openingDelimiterPattern)

        // 可能是 文本 或 属性
        // 如果是文本，直接 addChild
        // 如果是属性，需要先解析出 name 和 value（可选）
        if (isAttributeParsing) {
          match = content.match(attributePattern)
          // 匹配到属性名称
          if (match) {
            addChild(
              new Attribute(currentNode, { name: match[1] })
            )
          }
          else {
            addChild(
              new Text(currentNode, content)
            )
          }
        }
        else {
          addChild(
            new Text(currentNode, content)
          )
        }

        helperScanner.nextAfter(openingDelimiterPattern)





        // 分隔符之间的内容
        content = helperScanner.nextBefore(closingDelimiterPattern)
        if (content.charAt(0) === '/') {
          popStack()
        }
        else {

        }
        helperScanner.nextAfter(closingDelimiterPattern)



      }
    }

    while (elementScanner.hasNext()) {
      content = elementScanner.nextBefore(elementPattern)

      if (content.trim()) {
        if (!currentNode) {
          return throwError('组件必须有且只有一个根元素')
        }
        // 处理标签之间的内容
        parseContent(content)
      }

      // 接下来必须是 < 开头（标签）
      // 如果不是标签，那就该结束了
      if (elementScanner.charAt(0) !== '<') {
        break
      }

      errorPos = elementScanner.pos

      // 结束标签
      if (elementScanner.charAt(1) === '/') {
        content = elementScanner.nextAfter(elementPattern)
        tagName = content.substr(2)

console.log('')
console.log('tag end: ', tagName)
console.log('')

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

console.log('')
console.log('tag start: ', tagName)
console.log('')

        isComponent = componentPattern.test(tagName)
        isSelfClosingTag = isComponent ? true : selfClosingTagPattern.test(tagName)

        newNode = new Element(currentNode, { name: tagName })
        addChild(newNode, !isSelfClosingTag)

        // 截取 <tagName 和 > 之间的内容
        // 用于提取 attribute
        content = elementScanner.nextBefore(elementEndPattern)
        if (content) {
          isAttributeParsing = true
          parseContent(content)
          isAttributeParsing = false
        }

        content = elementScanner.nextAfter(elementEndPattern)
        if (!content) {
          return throwError('标签缺少 >')
        }
      }
    }
console.log('')
console.log(nodeStacks)
console.log('')
    if (nodeStacks.length) {
      return throwError('节点没有正确的结束')
    }

    return rootNode

  }

}
