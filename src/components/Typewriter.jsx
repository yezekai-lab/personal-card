import { useEffect, useState } from 'react'

export default function Typewriter({ phrases }) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases.join(' · '))
      return
    }

    const word = phrases[phraseIndex]
    let delay

    if (!deleting) {
      if (charIndex < word.length) {
        delay = setTimeout(() => {
          setText(word.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 80 + Math.random() * 70)
      } else {
        delay = setTimeout(() => setDeleting(true), 1600)
      }
    } else {
      if (charIndex > 0) {
        delay = setTimeout(() => {
          setText(word.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 40)
      } else {
        delay = setTimeout(() => {
          setDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
        }, 360)
      }
    }

    return () => clearTimeout(delay)
  }, [text, deleting, charIndex, phraseIndex, phrases])

  return <span>{text}</span>
}
