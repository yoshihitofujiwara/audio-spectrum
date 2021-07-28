export default class AudioSpectrum {
  constructor(src) {
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.connect(this.audioContext.destination)
    this.bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(this.bufferLength)

    if (src.tagName === 'AUDIO' || src.tagName === 'VIDEO') {
      this.mediaSource = this.audioContext.createMediaElementSource(src)
    } else if (src.toString() === '[object MediaStream]') {
      this.mediaSource = this.audioContext.createMediaStreamSource(src)
    } else {
      // return new Error("No audio data to analyze")
    }
    this.mediaSource.connect(this.analyser)
  }

  setFftSize(fftSize = 2048) {
    this.analyser.fftSize = fftSize
    this.bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(this.bufferLength)
  }

  update() {
    this.analyser.getByteFrequencyData(this.dataArray)
  }

  dispose() {}
}
