
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
  ATTRIBUTE,
} from '../nodeType'

import * as pattern from '../pattern'

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

const openingDelimiterPattern = /\{\{\s*/
const closingDelimiterPattern = /\s*\}\}/

const elementPattern = /<(?:\/)?[a-z]\w*/i
const elementEndPattern = /(?:\/)?>/

const selfClosingTagPattern = /input|img|br/i

const attributeSuffixPattern = /^([^"']*)["']/
const attributePrefixPattern = /([-:@a-z0-9]+)(?:=["'])?/i

const componentPattern = /[-A-Z]/
const variablePattern = /[_a-z]\w*/i

const parsers = [
  {
    test: function (source) {
       return pattern.IF.test(source)
    },
    create: function (source, currentNode) {
      let code = source.replace(pattern.IF, '')
      if (code) {
        return new If(currentNode, { expr: code.trim() })
      }
    }
  },
  {
    test: function (source) {
      return pattern.ELSE_IF.test(source)
    },
    create: function (source, currentNode, popStack) {
      popStack()
      let code = source.replace(pattern.ELSE_IF, '')
      if (code) {
        return new ElseIf(currentNode, { expr: code.trim() })
      }
    }
  },
  {
    test: function (source) {
      return pattern.ELSE.test(source)
    },
    create: function (source, currentNode, popStack) {
      popStack()
      return new Else(currentNode)
    }
  },
  {
    test: function (source) {
      return variablePattern.test(source)
    },
    create: function (source, currentNode) {
      let safe = false
      if (source.startsWith('{')) {
        safe = true
        source = source.substr(1)
      }
      return new Variable(currentNode, { expr: source.trim(), safe, })
    }
  }
]

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
        nodeStacks.push(currentNode)
      }
      currentNode = node
    }

    let popStack = function () {
      return currentNode = nodeStacks.pop()
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

    // 这个函数涉及分隔符和普通模板的深度解析
    // 是最核心的函数
    let parseContent = function (content) {
console.log('')
console.log('content => ', content)
console.log('')
      helperScanner.reset(content)

      while (helperScanner.hasNext()) {

        // 分隔符之前的内容
        content = helperScanner.nextBefore(openingDelimiterPattern)
        helperScanner.nextAfter(openingDelimiterPattern)

console.log('')
console.log('遍历纯文本 => ', '[' + content + ']', currentNode.type)
console.log('')
        newNode = null

        // 可能是 文本 或 属性
        // 如果是文本，直接 addChild
        // 如果是属性，需要先解析出 name 和 value（可选）
        if (isAttributeParsing) {
          switch (currentNode.type) {

            case ATTRIBUTE:
              // 上一个属性的结束
              match = content.match(attributeSuffixPattern)
              if (match) {
                if (match[1]) {
                  addChild(
                    new Text(currentNode, { content: match[1] })
                  )
                }
                content = content.replace(attributeSuffixPattern, '')
                popStack()
              }
              break

            case ELEMENT:
              // 下一个属性的开始
              match = content.match(attributePrefixPattern)
              if (match) {
                newNode = new Attribute(currentNode, { name: match[1] })
              }
              break

          }
        }

        if (content && !newNode) {
          newNode = new Text(currentNode, { content })
        }
        if (newNode) {
          addChild(newNode)
        }


        // 分隔符之间的内容
        content = helperScanner.nextBefore(closingDelimiterPattern)
        helperScanner.nextAfter(closingDelimiterPattern)

console.log('')
console.log('遍历命令 => ', '[' + content + ']', currentNode.type)
console.log('')
        if (content) {
          if (content.charAt(0) === '/') {
            popStack()
          }
          else {
            if (content.charAt(0) === '{') {
              helperScanner.forward(1)
            }
            each(parsers, function (parser) {
              if (parser.test(content)) {
                newNode = parser.create(content, currentNode, popStack)
                if (newNode) {
                  console.log(newNode)
                  addChild(newNode)
                }
                return false
              }
            })
          }
        }

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
