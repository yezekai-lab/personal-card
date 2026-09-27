import { useRef } from 'react'

export default function Magnetic({ children, strength = 0.2 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength * 1.3}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  )
}
