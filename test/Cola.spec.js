
import Cola from '../src/Cola'

describe('Cola', () => {
  it('constructor', () => {

    let instance = new Cola({
      el: '#app',
      data: {
        name: 'musicode'
      },
      template: '<div>{{name}}</div>'
    })

  })
})
