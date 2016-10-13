
/**
 * 把模板字符串解析成返回 virtual dom 的 function
 *
 * 从前到后扫描模板，提取出需要的节点
 *
 */

import Cola from '../../Cola'

import Scanner from '../helper/Scanner'
import print from '../../function/print'

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
  isWhitespace,
  isBreakLine,
} from '../../util/char'

import {
  lastItem,
} from '../../util/array'

import {
  parse as parsePattern,
} from '../../util/pattern'

// 开始定界符
const openingDelimiterPattern = /\{\{\s*/
// 结束定界符
const closingDelimiterPattern = /\s*\}\}/

const openingElementPattern = /<[a-z]\w*/
const closingElementPattern = /<\/[a-z]\w*/

export default class Mustache {

  constructor() {

    super()

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

    let ast = []

    let elementStacks = []
    let blockStacks = []

    let line = 0
    let column
    let content
    let temp

    let scanner = new Scanner(template)

    while (scanner.hasNext()) {

    }

    return ast

  }

  nextBefore(scanner) {
    scanner.nextBefore(openingDelimiterPattern)
  }

  next() {

  }

}
