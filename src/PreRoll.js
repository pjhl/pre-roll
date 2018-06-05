class PreRoll {
  constructor (options) {
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
      console.error(`OverRoll#initialize(): elements "${this.selector}" is not found`)
      return
    }
    // Listen events
    window.addEventListener('message', (...args) => {
      console.log(args)
    })

    if (obj.dataset && !obj.dataset.overRollInitialized) {
      obj.style.position = 'relative'
      // Create iframe
      const iframe = document.createElement('iframe')
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
      console.log('iframe:', iframe)
      // Add to wrapper
      obj.appendChild(iframe)
    } else {
      console.info(`OverRoll#initialize(): player was initialized earlier for "${this.selector}"`)
    }
  }
}

module.exports = PreRoll
