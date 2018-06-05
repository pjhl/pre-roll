const EventEmitter = require('events')

class PreRoll extends EventEmitter {
  constructor (options) {
    super()
    const {
      selector,
      volume = 0.7,
      iframeSrc = '//kdsk32lfa.xyz/newover2/player.php'
    } = options
    if (!selector) {
      throw new Error('Option "selector" is required')
    }
    this.selector = selector
    this.volume = Number(volume) || 0.7
    this.iframeSrc = iframeSrc
    this.initialize()
  }

  initialize () {
    const obj = document.querySelector(this.selector)
    if (!obj) {
      console.error(`PreRoll#initialize(): elements "${this.selector}" is not found`)
      return
    }
    let iframe = null
    // Events flags
    let hasInitAd = false
    let hasStartAd = false
    let hasStopAd = false

    // Listen events
    window.addEventListener('message', (e) => {
      const data = e.data
      switch (data) {
        case 'initAd':
          if (hasInitAd === false) {
            hasInitAd = true
            this.emit('initAd')
          }
          break
        case 'startAd':
          if (hasStartAd === false) {
            hasStartAd = true
            this.emit('startAd')
          }
          break
        case 'stopAd':
          if (hasStopAd === false) {
            hasStopAd = true
            this.emit('stopAd')
            // Remove iframe
            if (iframe) {
              iframe.remove()
              iframe = null
            }
            // Remove all event listeners
            this.removeAllListeners()
          }
          break
        default:
          console.error(`Unrecognized message: "${data}"`)
      }
    })

    if (obj.dataset && !obj.dataset.PreRollInitialized) {
      obj.style.position = 'relative'
      // Create iframe
      iframe = document.createElement('iframe')
      iframe.style.position = 'absolute'
      iframe.style.border = 'none'
      iframe.style.top = 0
      iframe.style.left = 0
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.zIndex = 999999
      iframe.setAttribute('allowFullScreen', '')
      iframe.setAttribute('allow', 'autoplay; fullscreen')
      iframe.setAttribute('src', this.iframeSrc + `?volume=${this.volume}`)
      // Add to wrapper
      obj.appendChild(iframe)
    } else {
      console.info(`PreRoll#initialize(): player was initialized earlier for "${this.selector}"`)
    }
  }
}

module.exports = PreRoll
