import { useEffect } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { useConfetti } from '../context/ConfettiContext.jsx'

const konami = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]

export default function KonamiCode() {
  const showToast = useToast()
  const burst = useConfetti()

  useEffect(() => {
    let index = 0
    const onKey = (e) => {
      const key = e.key.toLowerCase()
      if (key === konami[index]) {
        index++
        if (index === konami.length) {
          index = 0
          showToast('彩蛋！Konami Code')
          burst(window.innerWidth / 2, window.innerHeight / 3, 140)
        }
      } else {
        index = key === konami[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showToast, burst])

  return null
}
