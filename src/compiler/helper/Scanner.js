
/**
 * 收集网页中所有图片的例子:
 *
 * let scanner = new Scanner(document.body.innerHTML)
 * let imagePattern = /<img[^>]*?>/
 * let images = []
 * while (scanner.hasNext()) {
 *   scanner.nextBefore(imagePattern)
 *   let match = scanner.nextAfter(imagePattern)
 *   if (match) {
 *     images.push(match)
 *   }
 * }
 * console.log(images)
 */

export default class Scanner {

  constructor(str) {
    this.pos = 0
    this.tail = str
  }

  /**
   * 扫描是否结束
   *
   * @return {boolean}
   */
  hasNext() {
    return this.tail
  }

  /**
   * 从剩下的字符串中尝试匹配 pattern
   * pattern 必须位于字符串的开始位置
   * 匹配成功后，位置修改为匹配结果之后
   * 返回匹配字符串
   *
   * @param {RegExp} pattern
   * @return {string}
   */
  nextAfter(pattern) {
    let { tail } = this
    let matches = tail.match(pattern)
    if (!matches || matches.index) {
      return ''
    }
    let result = matches[0]
    this.pos += result.length
    this.tail = tail.substr(result.length)
    return result
  }

  /**
   * 从剩下的字符串中尝试匹配 pattern
   * pattern 不要求一定要位于字符串的开始位置
   * 匹配成功后，位置修改为匹配结果之前
   * 返回上次位置和当前位置之间的字符串
   *
   * @param {RegExp} pattern
   * @return {string}
   */
  nextBefore(pattern) {
    let { pos, tail } = this
    let matches = tail.match(pattern)
    if (matches) {
      let { index } = matches
      if (!index) {
        return ''
      }
      let result = tail.substr(0, index)
      this.pos += index
      this.tail = tail.substr(index)
      return result
    }
    else {
      this.pos += tail.length
      this.tail = ''
      return tail
    }
  }

}
