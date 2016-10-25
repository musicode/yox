
/**
 * 把模板字符串解析成返回 virtual dom 的 function
 *
 * 从前到后扫描模板，提取出需要的节点
 *
 */

import Cola from '../../Cola'

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
  compile,
  execute,
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
      return source.startsWith(Cola.EACH)
    },
    create: function (source, currentNode) {
      let terms = source.substr(Cola.EACH.length).trim().split(':')
      let options = {
        name: terms[0].trim()
      }
      if (terms[1]) {
        options.index = terms[1].trim()
      }
      return new Each(currentNode, options)
    }
  },
  {
    test: function (source) {
       return source.startsWith(Cola.IMPORT)
    },
    create: function (source, currentNode) {
      let name = source.substr(Cola.IMPORT.length).trim()
      if (name) {
        return new Import(currentNode, { name })
      }
    }
  },
  {
    test: function (source) {
       return source.startsWith(Cola.PARTIAL)
    },
    create: function (source, currentNode) {
      let name = source.substr(Cola.PARTIAL.length).trim()
      if (name) {
        return new Partial(currentNode, { name })
      }
      throw new Error('模板片段缺少名称')
    }
  },
  {
    test: function (source) {
       return source.startsWith(Cola.IF)
    },
    create: function (source, currentNode) {
      let expr = source.substr(Cola.IF.length).trim()
      if (expr) {
        return new If(currentNode, { expr: parse(expr) })
      }
      throw new Error('if 缺少条件')
    }
  },
  {
    test: function (source) {
      return source.startsWith(Cola.ELSE_IF)
    },
    create: function (source, currentNode, popStack) {
      let expr = source.substr(Cola.ELSE_IF.length)
      if (expr) {
        return new ElseIf(popStack(), { expr: parse(expr) })
      }
      throw new Error('else if 缺少条件')
    }
  },
  {
    test: function (source) {
      return source.startsWith(Cola.ELSE)
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
      return new Expression(currentNode, { expr: parse(source), safe, })
    }
  }
]

export default class Mustache {

  /**
   * 把抽象语法树构建成 Virtual DOM
   *
   * @param {Object} ast
   * @param {Object} data
   * @return {Object}
   */
  build(ast, data) {

    // 构建的过程只保留语法树中的 Element Attribute Text，其他的节点需要通过 data 进行过滤或替换

    let rootContext = new Context(data)
    let rootNode = new Element(null, { name: 'root' })

    let executeExpression = function (expr, context) {
      return execute(
        compile(expr),
        context,
        function (name) {
          return context.lookup(name)
        }
      )
    }

    let traverseNodes = function (nodes, context, parentNode) {
      let conditionMatched
      each(nodes, function (node, index) {
        if (node.type === IF || node.type === ELSE_IF || node.type === ELSE) {
          if (node.type === IF) {
            conditionMatched = false
          }
          if (!conditionMatched) {
            if (!node.expr || executeExpression(node.expr, context)) {
              conditionMatched = true
              traverseNode(node, context, parentNode)
            }
          }
          else {
            return
          }
        }
        else {
          traverseNode(node, context, parentNode)
        }
      })
    }

    let traverseNode = function (node, context, parentNode) {

      let { type, name, content, expr, attrs, children } = node

      if (type === EACH) {
        context = context.push(context.lookup(name))
      }
      else if (type === ATTRIBUTE) {
        node = new Attribute(parentNode, { name })
        parentNode.addAttr(node)
        parentNode = node
      }
      else if (type === ELEMENT) {
        node = new Element(parentNode, { name })
        parentNode.addChild(node)
        parentNode = node
        traverseNodes(attrs, context, parentNode)
      }
      else if (type === TEXT) {
        parentNode.addChild(
          new Text(parentNode, { content })
        )
      }
      else if (type === EXPRESSION) {
        parentNode.addChild(
          new Text(parentNode, { content: executeExpression(expr, context) })
        )
      }

      if (isArray(children)) {
        traverseNodes(children, context, parentNode)
      }

    }

    traverseNodes(ast.children, rootContext, rootNode)

    return rootNode

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

    // 根元素
    let rootNode = new Element(null, { name: 'root' })

    let currentNode = rootNode
    let lastNode

    let mainScanner = new Scanner(template)
    let helperScanner = new Scanner()

    let name
    let content
    let isSelfClosingTag

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

    let addChild = function (node, autoPushStack = true) {

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

      if (autoPushStack && node.children) {
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
                    new Text(currentNode, { content: match[1] })
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
                addChild(
                  new Attribute(currentNode, { name: match[1] })
                )
                if (match[2]) {
                  if (match[3] != null) {
                    addChild(
                      new Text(currentNode, { content: match[3] })
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
              new Text(currentNode, { content })
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

        isSelfClosingTag = componentPattern.test(name) ? true : selfClosingTagPattern.test(name)

        addChild(
          new Element(currentNode, { name }),
          !isSelfClosingTag
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
      }
    }

    if (nodeStack.length) {
      return throwError('节点没有正确的结束')
    }

    return rootNode

  }

}
