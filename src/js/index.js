import AudioSpectrum from './AudioSpectrum'

window.onload = function () {
  var file = document.getElementById('thefile')
  var audio = document.createElement('audio')

  file.onchange = async function () {
    var files = this.files
    var canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var ctx = canvas.getContext('2d')

    var WIDTH = canvas.width
    var HEIGHT = canvas.height

    audio.src = URL.createObjectURL(files[0])
    var stream
    await navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((_stream) => {
        console.log(_stream)
        stream = _stream
      })
      .catch((err) => {
        console.log(JSON.stringify(err))
      })

    const audioSpectrum = new AudioSpectrum(stream)

    var barWidth = WIDTH / audioSpectrum.bufferLength
    var barHeight
    var x = 0

    function renderFrame() {
      requestAnimationFrame(renderFrame)

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      x = 0

      audioSpectrum.update()

      for (var i = 0; i < audioSpectrum.bufferLength; i++) {
        barHeight = audioSpectrum.dataArray[i]

        var r = barHeight + 25 * (i / audioSpectrum.bufferLength)
        var g = 250 * (i / audioSpectrum.bufferLength)
        var b = 50
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        ctx.fillRect(x, HEIGHT - (HEIGHT / 256) * barHeight, barWidth, HEIGHT)
        x += barWidth + 1
      }
    }

    audio.load()
    await new Promise((resolve, reject) => {
      audio.addEventListener(
        'canplaythrough',
        (e) => {
          resolve(e)
        },
        { once: true }
      )
    })

    audio.play()
    renderFrame()
  }
}
