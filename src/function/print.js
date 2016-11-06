
import {
  NULL,
} from '../config/env'

module.exports = function (tpl, ...args) {
  let index = -1
  return tpl.replace(
    /%s/g,
    function (origin) {
      index++
      if (args[index] != NULL) {
        return args[index]
      }
      return origin
    }
  )
}
