
const whitespacePattern = /\s/

export function isWhitespace(char) {
  return whitespacePattern.test(char)
}

export function isBreakLine(char) {
  return char === '\n'
}
