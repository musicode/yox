
import Mustache from '../../../src/compiler/parser/Mustache'

describe('compiler/parser/Mustache', () => {
  it('Mustache', () => {
    let parser = new Mustache()
    let ast = parser.parse(`
      <div class="{{#if hidden}}hidden{{/if}}">
        <h1>{{title}}</h1>
        <div>{{{body}}}</div>
      </div>
    `)
    console.log(ast)
  })
})
