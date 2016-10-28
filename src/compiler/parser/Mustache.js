
/**
 * 把模板字符串解析成返回 virtual dom 的 function
 *
 * 从前到后扫描模板，提取出需要的节点
 *
 */

import * as syntax from '../../syntax'

import Context from '../helper/Context'
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

import {
  IF,
  ELSE_IF,
  ELSE,
  EACH,
  EXPRESSION,
  IMPORT,
  PARTIAL,
  TEXT,
  ELEMENT,
  ATTRIBUTE,
} from '../nodeType'

import {
  log,
  warn,
} from '../../config/env'

import {
  isArray,
  isFunction,
} from '../../util/is'

import {
  each,
  lastItem,
} from '../../util/array'

import {
  parse,
} from '../../util/expression'

const openingDelimiterPattern = /\{\{\s*/
const closingDelimiterPattern = /\s*\}\}/

const elementPattern = /<(?:\/)?[a-z]\w*/i
const elementEndPattern = /(?:\/)?>/

const selfClosingTagPattern = /input|img|br/i

const attributeSuffixPattern = /^([^"']*)["']/
const attributePattern = /([-:@a-z0-9]+)(?:=(["'])(?:([^'"]+)['"])?)?/i

const componentPattern = /[-A-Z]/

const brealinePrefixPattern = /^[ \t]*\n/
const brealineSuffixPattern = /\n[ \t]*$/

const parsers = [
  {
    test: function (source) {
      return source.startsWith(syntax.EACH)
    },
    create: function (source, currentNode) {
      let terms = source.substr(syntax.EACH.length).trim().split(':')
      let name = terms[0].trim()
      let index
      if (terms[1]) {
        index = terms[1].trim()
      }
      return new Each(currentNode, name, index)
    }
  },
  {
    test: function (source) {
       return source.startsWith(syntax.IMPORT)
    },
    create: function (source, currentNode) {
      let name = source.substr(syntax.IMPORT.length).trim()
      if (name) {
        return new Import(currentNode, name)
      }
    }
  },
  {
    test: function (source) {
       return source.startsWith(syntax.PARTIAL)
    },
    create: function (source, currentNode) {
      let name = source.substr(syntax.PARTIAL.length).trim()
      if (name) {
        return new Partial(currentNode, name)
      }
      throw new Error('模板片段缺少名称')
    }
  },
  {
    test: function (source) {
       return source.startsWith(syntax.IF)
    },
    create: function (source, currentNode) {
      let expr = source.substr(syntax.IF.length).trim()
      if (expr) {
        return new If(currentNode, parse(expr))
      }
      throw new Error('if 缺少条件')
    }
  },
  {
    test: function (source) {
      return source.startsWith(syntax.ELSE_IF)
    },
    create: function (source, currentNode, popStack) {
      let expr = source.substr(syntax.ELSE_IF.length)
      if (expr) {
        return new ElseIf(popStack(), parse(expr))
      }
      throw new Error('else if 缺少条件')
    }
  },
  {
    test: function (source) {
      return source.startsWith(syntax.ELSE)
    },
    create: function (source, currentNode, popStack) {
      return new Else(popStack())
    }
  },
  {
    test: function (source) {
      return true
    },
    create: function (source, currentNode) {
      let safe = false
      if (source.startsWith('{')) {
        safe = true
        source = source.substr(1)
      }
      return new Expression(currentNode, parse(source), safe)
    }
  }
]

const rootName = 'root'

export default class Mustache {

  /**
   * 把抽象语法树渲染成 Virtual DOM
   *
   * @param {Object} ast
   * @param {Object} data
   * @return {Object}
   */
  render(ast, data) {

    let rootElement = new Element(null, rootName)
    let rootContext = new Context(data)
    let keypath = []

    if (ast.name === rootName) {
      each(
        ast.children,
        function (child) {
          child.render(rootElement, rootContext, keypath)
        }
      )
    }
    else {
      ast.render(rootElement, rootContext, keypath)
    }

    let { children } = rootElement
    if (children.length !== 1 || children[0].type !== ELEMENT) {
      throw new Error('组件有且只能有一个根元素')
    }

    return children[0]

  }

  /**
   * 把模板解析为抽象语法树
   *
   * @param {string} template
   * @param {Function} getPartial 当解析到 IMPORT 节点时，需要获取模板片段
   * @param {Function} setPartial 当解析到 PARTIAL 节点时，需要注册模板片段
   * @return {Object}
   */
  parse(template, getPartial, setPartial) {

    let rootNode = new Element(null, rootName)

    let currentNode = rootNode
    let lastNode

    let mainScanner = new Scanner(template)
    let helperScanner = new Scanner()

    let name
    let content

    let isAttributesParsing
    let isAttributeValueParsing

    let match
    let errorPos

    let nodeStack = []

    let pushStack = function (node) {
      nodeStack.push(currentNode)
      if (node.type === ATTRIBUTE) {
        isAttributeValueParsing = true
      }
      currentNode = node
    }

    let popStack = function () {
      if (currentNode.type === ATTRIBUTE) {
        isAttributeValueParsing = false
      }
      currentNode = nodeStack.pop()
      return currentNode
    }

    let isBreakLine = function (content) {
      return content.indexOf('\n') >= 0 && !content.trim()
    }
    let trimBreakline = function (content) {
      return content
      .replace(brealinePrefixPattern, '')
      .replace(brealineSuffixPattern, '')
    }

    let addChild = function (node) {

      lastNode = lastItem(currentNode.children)
      if (lastNode) {
        if (node.type === TEXT) {
          if (isBreakLine(node.content)) {
            return
          }
        }
        else if (lastNode.type === TEXT) {
          if (isBreakLine(lastNode.content)) {
            currentNode.children.pop()
          }
        }
      }

      if (node.type === TEXT
        && !(node.content = trimBreakline(node.content))
      ) {
        return
      }

      if (node.type === IMPORT) {
        node = getPartial(node.name)
        if (node) {
          each(node.children, addChild)
          return
        }
        else {
          return throwError(`找不到模板片段：${node.name}`)
        }
      }
      else if (node.type === PARTIAL) {
        setPartial(node.name, node)
        return
      }

      if (currentNode.type === ELEMENT && isAttributesParsing) {
        currentNode.addAttr(node)
      }
      else {
        currentNode.addChild(node)
      }

      if (node.children) {
        pushStack(node)
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

      helperScanner.reset(content)

      while (helperScanner.hasNext()) {

        // 分隔符之前的内容
        content = helperScanner.nextBefore(openingDelimiterPattern)
        helperScanner.nextAfter(openingDelimiterPattern)

        if (content) {

          // 可能是 文本 或 属性
          if (isAttributesParsing) {

            if (currentNode.type === ATTRIBUTE) {
              // 上一个属性的结束
              match = content.match(attributeSuffixPattern)
              if (match) {
                if (match[1]) {
                  addChild(
                    new Text(currentNode, match[1])
                  )
                }
                content = content.replace(attributeSuffixPattern, '')
                popStack()
              }
            }

            if (!isAttributeValueParsing) {
              // 下一个属性的开始
              while (match = attributePattern.exec(content)) {
                content = content.substr(match.index + match[0].length)
                if (match[1].startsWith(syntax.DIRECTIVE_PREFIX)) {
                  addChild(
                    new Directive(currentNode, match[1].substr(syntax.DIRECTIVE_PREFIX.length))
                  )
                }
                else {
                  addChild(
                    new Attribute(currentNode, match[1])
                  )
                }
                if (match[2]) {
                  if (match[3] != null) {
                    addChild(
                      new Text(currentNode, match[3])
                    )
                    popStack()
                  }
                }
                // 如 checked、disabled
                else {
                  popStack()
                }
              }
              content = ''
            }
          }

          if (content) {
            addChild(
              new Text(currentNode, content)
            )
          }
        }

        // 分隔符之间的内容
        content = helperScanner.nextBefore(closingDelimiterPattern)
        helperScanner.nextAfter(closingDelimiterPattern)

        if (content) {
          if (content.charAt(0) === '/') {
            popStack()
          }
          else {
            if (content.charAt(0) === '{' && helperScanner.charAt(0) === '}') {
              helperScanner.forward(1)
            }
            each(parsers, function (parser) {
              if (parser.test(content)) {
                addChild(
                  parser.create(content, currentNode, popStack)
                )
                return false
              }
            })
          }
        }

      }
    }

    while (mainScanner.hasNext()) {
      content = mainScanner.nextBefore(elementPattern)

      if (content.trim()) {
        // 处理标签之间的内容
        parseContent(content)
      }

      // 接下来必须是 < 开头（标签）
      // 如果不是标签，那就该结束了
      if (mainScanner.charAt(0) !== '<') {
        break
      }

      errorPos = mainScanner.pos


      // 结束标签
      if (mainScanner.charAt(1) === '/') {
        content = mainScanner.nextAfter(elementPattern)
        name = content.substr(2)

        if (mainScanner.charAt(0) !== '>') {
          return throwError('结束标签缺少 >')
        }
        else if (name !== currentNode.name) {
          return throwError('开始标签和结束标签匹配失败')
        }

        popStack()
        mainScanner.forward(1)
      }
      // 开始标签
      else {
        content = mainScanner.nextAfter(elementPattern)
        name = content.substr(1)

        addChild(
          new Element(currentNode, name)
        )

        // 截取 <name 和 > 之间的内容
        // 用于提取 attribute
        content = mainScanner.nextBefore(elementEndPattern)
        if (content) {
          isAttributesParsing = true
          parseContent(content)
          isAttributesParsing = false
        }

        content = mainScanner.nextAfter(elementEndPattern)
        if (!content) {
          return throwError('标签缺少 >')
        }

        if (componentPattern.test(name) || selfClosingTagPattern.test(name)) {
          popStack()
        }
      }
    }

    if (nodeStack.length) {
      return throwError('节点没有正确的结束')
    }

    return rootNode

  }

}
