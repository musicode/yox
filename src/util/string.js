
import print from '../function/print'
import getLocationByIndex from '../function/getLocationByIndex'

const breaklinePrefixPattern = /^[ \t]*\n/
const breaklineSuffixPattern = /\n[ \t]*$/

export function isBreakLine(str) {
  return str.indexOf('\n') >= 0 && !str.trim()
}

export function trimBreakline(str) {
  return str
    .replace(breaklinePrefixPattern, '')
    .replace(breaklineSuffixPattern, '')
}

export function parseError(str, errorMsg, errorIndex) {
  if (errorIndex == null) {
    errorMsg += '.'
  }
  else {
    errorMsg += ', at line %d, col %d.'
    let { line, col } = getLocationByIndex(str, errorIndex)
    errorMsg = print(errorMsg, line, col)
  }
  throw new Error(errorMsg)
}
