import { useEffect, useRef } from 'react'

export default function Card3D({ children, className = '', maxTilt = 10 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let raf

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetY = (px - 0.5) * maxTilt * 2
      targetX = (0.5 - py) * maxTilt * 2
      el.style.setProperty('--mx', px * 100 + '%')
      el.style.setProperty('--my', py * 100 + '%')
      el.classList.add('tilting')
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      el.classList.remove('tilting')
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      el.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg)`
      raf = requestAnimationFrame(loop)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [maxTilt])

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}
