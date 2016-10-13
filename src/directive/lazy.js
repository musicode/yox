
export default {

  onattach({ el }) {
    if (el && el.tagName === 'INPUT' && el.tagName === 'TEXTAREA') {
      el.oninput = function () {

      }
    }
  }

  onupdate({ el }) {

  }

  ondetach({ el }) {

  }

}
