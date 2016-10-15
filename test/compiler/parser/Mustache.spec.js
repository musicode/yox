
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
{{>listView}}
`

html = `
<div class="{{#if hidden}}aaa{{else if xxx}}bb {{name}} bb {{{ age }} {{else}}a cccc d{{/if}}">

</div>
`


describe('compiler/parser/Mustache', function () {
  it('Mustache', function () {
    let parser = new Mustache()
    let ast = parser.parse(html)
    console.log(JSON.stringify(ast, null, 4))
  })
})
