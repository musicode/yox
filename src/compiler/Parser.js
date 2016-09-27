
export default class Parser {

  /**
   * @param {string} template
   * @param {Object} options
   * @return {Object}
   */
  constructor(template, options) {
    this.template = template
    this.options = options
  }

  parse(template, partials) {


  }

  compile() {
    extractFragments(this.element)

  }
}
