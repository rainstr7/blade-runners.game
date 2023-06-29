import audioSrc from '../../assets/sounds/start.mp3'

export default function play() {
  const audio = new Audio(audioSrc)
  audio.play().catch()
}
