var params = function (inputs) {
  return inputs.map(function (input) {
    return input.name + '=' + encodeURIComponent(input.value)
  }).join('&')
}

var init = function () {
  var form = document.querySelector('form')
  var button = form.querySelector('button')
  var inputs = [].slice.call(document.querySelectorAll('input'))
  var script

  window.callback = function (data) {
    document.body.removeChild(script)

    if (data.result === 'success') {
      form.setAttribute('data-success', '')
    } else if (data.result === 'error') {
      button.removeAttribute('disabled')

      form.setAttribute('data-error', '')
      form.style.animation = ''

      window.setTimeout(function () {
        form.removeAttribute('data-error')
      }, 800)
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    form.style.animation = 'none'

    button.setAttribute('disabled', '')

    script = document.createElement('script')
    script.src = form.action + '-json?' + params(inputs) + '&c=callback'

    document.body.appendChild(script)
  })
}

document.addEventListener('DOMContentLoaded', init)
