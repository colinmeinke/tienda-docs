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
      alert("Thanks! You've been sent a confirmation email.")
    } else if (data.result === 'error') {
      button.removeAttribute('disabled')
      alert("Sorry. " + data.msg)
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    button.setAttribute('disabled', '')

    script = document.createElement('script')
    script.src = form.action + '-json?' + params(inputs) + '&c=callback'

    document.body.appendChild(script)
  })
}

document.addEventListener('DOMContentLoaded', init)
