
import Cola from '../Cola'

import {
  parse as parsePattern,
} from '../util/pattern'

export const IF = parsePattern(Cola.IF)
export const ELSE = parsePattern(Cola.ELSE)
export const ELSE_IF = parsePattern(Cola.ELSE_IF)

export const EACH = parsePattern(Cola.EACH)

export const IMPORT = parsePattern(Cola.IMPORT)
export const PARTIAL = parsePattern(Cola.PARTIAL)
