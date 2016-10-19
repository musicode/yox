
/**
 * 标识符
 *
 * @type {RegExp}
 */
const identifier = /[_$a-z][$\w]*/

/**
 * 数字
 *
 * @type {RegExp}
 */
const number = /\d+/

/**
 * 取反
 *
 * @type {RegExp}
 */
const negation = /!/

function parse(literal) {

  for (let i = 0, len = literal.length; i < len; i++) {
    switch (literal[i]) {
      case '(':
      case '>':
      case '<':
      case '=':
      case '!':
      
    }
  }
  let scanner = new Scanner(literal)
  while (scanner.hasNext()) {

    scanner.nextBefore()
  }
}
