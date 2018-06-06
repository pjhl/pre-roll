function PlayerStub (options) {
  var $this = this
  var videos = options.videos || {}
  var active = options.active || Object.keys(videos)[0]
  var changeButtons = document.querySelectorAll(options.changeSelector)
  var player = document.querySelector(options.playerSelector)
  var onChange = options.onChange || null
  // Lock status
  var locked = false
  // Lock
  this.lock = function () {
    locked = true
  }
  // Unlock
  this.unlock = function () {
    locked = false
  }
  // Change film
  this.change = function (id) {
    var name = videos[id]
    if (!name) {
      throw new Error('Name is empty')
    }
    player.innerHTML = '<div class="video">' + name + '</div>'
    active = id.toString()
    if (typeof onChange === 'function') {
      onChange(id, name)
    }
  }
  // On click change serie
  Array.from(changeButtons).forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (locked) {
        console.log('Locked...')
        return
      }
      var id = e.target.dataset.id
      if (id !== active) {
        $this.change(id)
      }
    })
  })
}

window.PlayerStub = PlayerStub
