
import Mustache from '../../../src/compiler/parser/Mustache'

let html = `
<div class="{{#if hidden}}hidden{{/if}}">
  <h1>{{title}}</h1>
  <div>{{{body}}}
</div>
{{#if foo}}
  <div>foo</div>
{{/if}}
{{#partial listView}}
  <div>list</div>
{{/partial}}
`
describe('compiler/parser/Mustache', () => {
  it('Mustache', () => {
    let parser = new Mustache()
    let ast = parser.parse(html)
    console.log(JSON.stringify(ast, null, '    '))
  })
})
