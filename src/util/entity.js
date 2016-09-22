
import escapePattern from '../function/escapePattern'
import toString from '../function/toString'

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
}

const entityKeys = Object.keys(entityMap).join('')

export function escape(str) {
  str = toString(str)
  if (!str) {
    return str
  }
  const pattern = new RegExp('[' + escapePattern(entityKeys) + ']', 'g')
  return str.replace(pattern, $0 => entityMap[$0])
}
